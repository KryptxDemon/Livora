import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { InputField } from '@/components/ui/input-field';
import { Ionicons } from '@expo/vector-icons';

export default function EmployerRegistrationScreen() {
  const { t, language } = useLanguage();
  const { setEmployerProfile, setHasCompletedOnboarding } = useApp();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nidImage, setNidImage] = useState<string | null>(null);
  const [licenseImage, setLicenseImage] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async (type: 'nid' | 'license') => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Please allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      if (type === 'nid') {
        setNidImage(result.assets[0].uri);
      } else {
        setLicenseImage(result.assets[0].uri);
      }
    }
  };

  const handleSendOTP = () => {
    if (phone.length < 11) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOTP(true);
      Alert.alert(t('otpSent'), 'OTP: 1234 (Demo)');
    }, 1000);
  };

  const handleVerifyAndRegister = async () => {
    if (otp !== '1234') {
      Alert.alert('Error', 'Invalid OTP. Use 1234 for demo.');
      return;
    }
    
    setLoading(true);
    
    const profile = {
      id: Date.now().toString(),
      name: name,
      phone: phone,
      nidDocument: nidImage || undefined,
      tradeLicense: licenseImage || undefined,
      verified: true,
      smsCredits: 10, // Demo credits
      createdAt: new Date().toISOString(),
    };

    await setEmployerProfile(profile);
    await setHasCompletedOnboarding(true);
    
    setLoading(false);
    Alert.alert(t('otpVerified'));
    router.replace('/employer/package-select');
  };

  const isFormValid = name.trim().length > 0 && phone.length >= 11;

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
        <Text style={styles.title}>{t('employerRegistration')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="business-outline" size={60} color="#2E7D32" />
        </View>

        <InputField
          label={t('name')}
          placeholder={t('enterName')}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <InputField
          label={t('phoneNumber')}
          placeholder={t('enterPhoneNumber')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={11}
          editable={!showOTP}
        />

        {/* NID Upload */}
        <View style={styles.uploadSection}>
          <Text style={styles.uploadLabel}>{t('uploadNID')}</Text>
          {nidImage ? (
            <View style={styles.uploadedContainer}>
              <Image source={{ uri: nidImage }} style={styles.uploadedImage} />
              <BigButton
                title={t('retake')}
                onPress={() => pickImage('nid')}
                variant="outline"
                size="small"
                icon="refresh-outline"
              />
            </View>
          ) : (
            <BigButton
              title={t('chooseFromGallery')}
              onPress={() => pickImage('nid')}
              variant="outline"
              icon="image-outline"
            />
          )}
        </View>

        {/* Trade License Upload (Optional) */}
        <View style={styles.uploadSection}>
          <Text style={styles.uploadLabel}>{t('tradeLicense')}</Text>
          {licenseImage ? (
            <View style={styles.uploadedContainer}>
              <Image source={{ uri: licenseImage }} style={styles.uploadedImage} />
              <BigButton
                title={t('retake')}
                onPress={() => pickImage('license')}
                variant="outline"
                size="small"
                icon="refresh-outline"
              />
            </View>
          ) : (
            <BigButton
              title={t('chooseFromGallery')}
              onPress={() => pickImage('license')}
              variant="outline"
              icon="image-outline"
            />
          )}
        </View>

        {!showOTP ? (
          <BigButton
            title={t('sendOTP')}
            onPress={handleSendOTP}
            loading={loading}
            disabled={!isFormValid}
            icon="send-outline"
            style={{ marginTop: 16 }}
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
              onPress={handleVerifyAndRegister}
              loading={loading}
              disabled={otp.length < 4}
              icon="checkmark-circle-outline"
            />
          </>
        )}
      </ScrollView>
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
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  uploadedContainer: {
    alignItems: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'cover',
  },
});
