import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { InputField } from '@/components/ui/input-field';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { t } = useLanguage();
  const { setWorkerProfile, setHasCompletedOnboarding } = useApp();
  
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phone.length < 11) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setShowOTP(true);
      Alert.alert(t('otpSent'), 'OTP: 1234 (Demo)');
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (otp !== '1234') {
      Alert.alert('Error', 'Invalid OTP. Use 1234 for demo.');
      return;
    }
    
    setLoading(true);
    // Simulate verification and load mock returning user profile
    setTimeout(async () => {
      // Create a mock returning user profile
      const mockProfile = {
        id: Date.now().toString(),
        name: 'Demo User',
        age: '26-35',
        skills: ['electrician', 'plumber'],
        experience: 'oneToThreeYears',
        jobType: 'fullTime',
        location: 'ঢাকা',
        phone: phone,
        verified: true,
        rating: 4.5,
        badge: 'green' as const,
        createdAt: new Date().toISOString(),
      };
      
      await setWorkerProfile(mockProfile);
      await setHasCompletedOnboarding(true);
      setLoading(false);
      Alert.alert(t('otpVerified'));
      router.replace('/worker/dashboard');
    }, 1000);
  };

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
          <Ionicons name="phone-portrait-outline" size={80} color="#2E7D32" />
        </View>
        
        <Text style={styles.title}>{t('phoneNumber')}</Text>

        <View style={styles.form}>
          <InputField
            label={t('phoneNumber')}
            placeholder={t('enterPhoneNumber')}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={11}
            editable={!showOTP}
          />

          {!showOTP ? (
            <BigButton
              title={t('sendOTP')}
              onPress={handleSendOTP}
              loading={loading}
              disabled={phone.length < 11}
              icon="send-outline"
            />
          ) : (
            <>
              <InputField
                label={t('enterOTP')}
                placeholder="1234"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={4}
              />
              
              <BigButton
                title={t('verify')}
                onPress={handleVerifyOTP}
                loading={loading}
                disabled={otp.length < 4}
                icon="checkmark-circle-outline"
              />
            </>
          )}
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
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
});
