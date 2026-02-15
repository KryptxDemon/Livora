import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/context/LanguageContext';
import { BigButton } from '@/components/ui/big-button';
import { ProgressSteps } from '@/components/ui/progress-steps';
import { Ionicons } from '@expo/vector-icons';

const TOTAL_STEPS = 7;

export default function IDUploadScreen() {
  const { t } = useLanguage();
  const [idImage, setIdImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
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
      setIdImage(result.assets[0].uri);
    }
  };

  const handleNext = async () => {
    setUploading(true);
    // Simulate upload
    setTimeout(async () => {
      if (idImage) {
        await AsyncStorage.setItem('@livora_reg_idDocument', idImage);
      }
      setUploading(false);
      Alert.alert(t('uploadSuccess'));
      router.push('/worker/register/otp-verify');
    }, 1000);
  };

  const handleSkip = async () => {
    router.push('/worker/register/otp-verify');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps steps={TOTAL_STEPS} currentStep={6} />
      
      <View style={styles.header}>
        <BigButton
          title={t('back')}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
        <Text style={styles.title}>{t('idUpload')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          {t('uploadNID')} / {t('uploadBirthCert')}
        </Text>

        {idImage ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: idImage }} style={styles.preview} />
            <BigButton
              title={t('retake')}
              onPress={pickImage}
              variant="outline"
              size="medium"
              icon="refresh-outline"
              style={{ marginTop: 16 }}
            />
          </View>
        ) : (
          <View style={styles.uploadContainer}>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={60} color="#2E7D32" />
              <Text style={styles.uploadText}>{t('chooseFromGallery')}</Text>
            </View>
            
            <View style={styles.buttonGroup}>
              <BigButton
                title={t('uploadNID')}
                onPress={pickImage}
                icon="card-outline"
                variant="primary"
                style={styles.uploadButton}
              />
              
              <BigButton
                title={t('uploadBirthCert')}
                onPress={pickImage}
                icon="document-outline"
                variant="outline"
                style={styles.uploadButton}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <BigButton
          title={idImage ? t('next') : t('skip')}
          onPress={idImage ? handleNext : handleSkip}
          loading={uploading}
          icon={idImage ? 'arrow-forward-outline' : 'play-skip-forward-outline'}
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
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  uploadContainer: {
    flex: 1,
    alignItems: 'center',
  },
  uploadBox: {
    width: '100%',
    aspectRatio: 1.5,
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#2E7D32',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  uploadText: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: '600',
    marginTop: 16,
  },
  buttonGroup: {
    width: '100%',
    gap: 16,
  },
  uploadButton: {
    width: '100%',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
