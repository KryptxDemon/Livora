import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { InputField } from '@/components/ui/input-field';
import { ProgressSteps } from '@/components/ui/progress-steps';
import { Ionicons } from '@expo/vector-icons';

const TOTAL_STEPS = 7;

export default function OTPVerifyScreen() {
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
    
    // Collect all registration data
    const [photo, name, age, gender, skillsJson, customSkill, experience, jobType, location, idDocument] = await Promise.all([
      AsyncStorage.getItem('@livora_reg_photo'),
      AsyncStorage.getItem('@livora_reg_name'),
      AsyncStorage.getItem('@livora_reg_age'),
      AsyncStorage.getItem('@livora_reg_gender'),
      AsyncStorage.getItem('@livora_reg_skills'),
      AsyncStorage.getItem('@livora_reg_customSkill'),
      AsyncStorage.getItem('@livora_reg_experience'),
      AsyncStorage.getItem('@livora_reg_jobType'),
      AsyncStorage.getItem('@livora_reg_location'),
      AsyncStorage.getItem('@livora_reg_idDocument'),
    ]);

    const skills = skillsJson ? JSON.parse(skillsJson) : [];

    // Create worker profile
    const profile = {
      id: Date.now().toString(),
      photo: photo || undefined,
      name: name || '',
      age: age || '',
      gender: gender || undefined,
      skills: skills,
      customSkill: customSkill || undefined,
      experience: experience || '',
      jobType: jobType || '',
      location: location || '',
      idDocument: idDocument || undefined,
      phone: phone,
      verified: true,
      rating: 0,
      badge: 'green' as const,
      createdAt: new Date().toISOString(),
    };

    await setWorkerProfile(profile);
    await setHasCompletedOnboarding(true);

    // Clean up registration data
    await AsyncStorage.multiRemove([
      '@livora_reg_photo',
      '@livora_reg_name',
      '@livora_reg_age',
      '@livora_reg_gender',
      '@livora_reg_skills',
      '@livora_reg_customSkill',
      '@livora_reg_experience',
      '@livora_reg_jobType',
      '@livora_reg_location',
      '@livora_reg_idDocument',
    ]);

    setLoading(false);
    Alert.alert(t('otpVerified'));
    router.replace('/worker/profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps steps={TOTAL_STEPS} currentStep={7} />
      
      <View style={styles.header}>
        <BigButton
          title={t('back')}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
        <Text style={styles.title}>{t('verify')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark-outline" size={80} color="#2E7D32" />
        </View>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 32,
  },
});
