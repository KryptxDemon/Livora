import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelectScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { setUserRole } = useApp();

  const handleRoleSelect = async (role: 'worker' | 'employer') => {
    await setUserRole(role);
    if (role === 'worker') {
      router.push('/worker/new-or-returning');
    } else {
      router.push('/employer/registration');
    }
  };

  const toggleLanguage = async () => {
    await setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.languageToggle} onPress={toggleLanguage}>
        <Ionicons name="globe-outline" size={24} color="#2E7D32" />
        <Text style={styles.languageText}>{language === 'bn' ? 'EN' : 'বাং'}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>{t('appName')}</Text>
        </View>
        
        <Text style={styles.title}>{t('whatDoYouWantToDo')}</Text>

        <View style={styles.buttonContainer}>
          <BigButton
            title={t('lookingForWork')}
            onPress={() => handleRoleSelect('worker')}
            icon="briefcase-outline"
            variant="primary"
            style={styles.button}
          />
          
          <BigButton
            title={t('lookingToHire')}
            onPress={() => handleRoleSelect('employer')}
            icon="people-outline"
            variant="secondary"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  languageToggle: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginLeft: 6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 48,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    width: '100%',
  },
});
