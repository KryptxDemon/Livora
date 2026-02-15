import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

export default function RegistrationMethodScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BigButton
          title={t('back')}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="create-outline" size={80} color="#2E7D32" />
        </View>
        
        <Text style={styles.title}>{t('chooseMethod')}</Text>

        <View style={styles.buttonContainer}>
          <BigButton
            title={t('voiceForm')}
            onPress={() => router.push('/worker/voice-form')}
            icon="mic-outline"
            variant="primary"
            style={styles.button}
          />
          
          <BigButton
            title={t('writtenForm')}
            onPress={() => router.push('/worker/register/face-capture')}
            icon="document-text-outline"
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
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
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
