import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

export default function SplashScreen() {
  const { isLoading: languageLoading } = useLanguage();
  const { isLoading: appLoading, hasCompletedOnboarding, userRole, workerProfile, employerProfile } = useApp();

  useEffect(() => {
    if (!languageLoading && !appLoading) {
      checkNavigationPath();
    }
  }, [languageLoading, appLoading]);

  const checkNavigationPath = async () => {
    try {
      const hasSelectedLanguage = await AsyncStorage.getItem('@livora_language');
      
      // If no language selected, go to language selection
      if (!hasSelectedLanguage) {
        router.replace('/language-select');
        return;
      }

      // If has completed onboarding and has profile, go to main app
      if (hasCompletedOnboarding) {
        if (userRole === 'worker' && workerProfile) {
          router.replace('/worker/dashboard');
          return;
        }
        if (userRole === 'employer' && employerProfile) {
          router.replace('/employer/dashboard');
          return;
        }
      }

      // Otherwise, go to role selection
      router.replace('/role-select');
    } catch (error) {
      console.error('Navigation error:', error);
      router.replace('/language-select');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <ActivityIndicator size="large" color="#2E7D32" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  loader: {
    marginTop: 20,
  },
});
