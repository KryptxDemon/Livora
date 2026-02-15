import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

export default function LanguageSelectScreen() {
  const { setLanguage } = useLanguage();
  const { setIsFirstLaunch } = useApp();

  const handleLanguageSelect = async (lang: 'bn' | 'en') => {
    await setLanguage(lang);
    await setIsFirstLaunch(false);
    router.replace('/role-select');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="globe-outline" size={80} color="#2E7D32" />
        </View>
        
        <Text style={styles.title}>Select Language</Text>
        <Text style={styles.subtitle}>ভাষা নির্বাচন করুন</Text>

        <View style={styles.buttonContainer}>
          <BigButton
            title="বাংলা"
            onPress={() => handleLanguageSelect('bn')}
            icon="language-outline"
            variant="primary"
            style={styles.button}
          />
          
          <BigButton
            title="English"
            onPress={() => handleLanguageSelect('en')}
            icon="language-outline"
            variant="outline"
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#666666',
    marginBottom: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    width: '100%',
  },
});
