import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

export default function NewOrReturningScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#2E7D32" />
        </View>
        
        <Text style={styles.title}>{t('areYouNew')}</Text>

        <View style={styles.buttonContainer}>
          <BigButton
            title={t('firstTime')}
            onPress={() => router.push('/worker/registration-method')}
            icon="add-circle-outline"
            variant="primary"
            style={styles.button}
          />
          
          <BigButton
            title={t('returningUser')}
            onPress={() => router.push('/worker/login')}
            icon="log-in-outline"
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <BigButton
          title={t('back')}
          onPress={() => router.back()}
          variant="outline"
          size="medium"
        />
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
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
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
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
