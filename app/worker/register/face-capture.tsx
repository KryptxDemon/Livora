import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLanguage } from '@/context/LanguageContext';
import { BigButton } from '@/components/ui/big-button';
import { ProgressSteps } from '@/components/ui/progress-steps';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOTAL_STEPS = 7;

export default function FaceCaptureScreen() {
  const { t } = useLanguage();
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const result = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: false,
        });
        if (result) {
          setPhoto(result.uri);
          await AsyncStorage.setItem('@livora_reg_photo', result.uri);
        }
      } catch (error) {
        console.error('Error taking photo:', error);
        // For demo, use a placeholder
        setPhoto('placeholder');
        await AsyncStorage.setItem('@livora_reg_photo', 'placeholder');
      }
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const useCurrentPhoto = async () => {
    router.push('/worker/register/basic-info');
  };

  const skipPhoto = async () => {
    await AsyncStorage.setItem('@livora_reg_photo', '');
    router.push('/worker/register/basic-info');
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={80} color="#9E9E9E" />
          <Text style={styles.permissionText}>Loading camera...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <ProgressSteps steps={TOTAL_STEPS} currentStep={1} />
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={80} color="#2E7D32" />
          <Text style={styles.permissionText}>{t('faceCaptureInstruction')}</Text>
          <View style={styles.permissionButtons}>
            <BigButton
              title="Allow Camera"
              onPress={requestPermission}
              icon="camera-outline"
              variant="primary"
            />
            <BigButton
              title={t('skip')}
              onPress={skipPhoto}
              variant="outline"
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps steps={TOTAL_STEPS} currentStep={1} />
      
      <View style={styles.header}>
        <BigButton
          title={t('back')}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
        <Text style={styles.title}>{t('faceCapture')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <Text style={styles.instruction}>{t('faceCaptureInstruction')}</Text>

      <View style={styles.cameraContainer}>
        {photo ? (
          <Image source={{ uri: photo === 'placeholder' ? 'https://via.placeholder.com/300' : photo }} style={styles.preview} />
        ) : (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="front"
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.faceGuide} />
            </View>
          </CameraView>
        )}
      </View>

      <View style={styles.footer}>
        {photo ? (
          <View style={styles.buttonRow}>
            <BigButton
              title={t('retake')}
              onPress={retakePhoto}
              variant="outline"
              icon="refresh-outline"
              style={styles.halfButton}
            />
            <BigButton
              title={t('usePhoto')}
              onPress={useCurrentPhoto}
              variant="primary"
              icon="checkmark-outline"
              style={styles.halfButton}
            />
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <View style={styles.captureButtonInner}>
                <Ionicons name="camera" size={40} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <BigButton
              title={t('skip')}
              onPress={skipPhoto}
              variant="outline"
              size="medium"
              style={{ marginTop: 16 }}
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
  instruction: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  cameraContainer: {
    flex: 1,
    margin: 24,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceGuide: {
    width: 200,
    height: 260,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
  },
  preview: {
    flex: 1,
    resizeMode: 'cover',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  captureButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  halfButton: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  permissionText: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  permissionButtons: {
    width: '100%',
  },
});
