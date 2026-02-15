import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Animated } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

const voiceQuestions = [
  { field: 'name', questionBn: 'আপনার নাম কী?', questionEn: 'What is your name?' },
  { field: 'age', questionBn: 'আপনার বয়স কত?', questionEn: 'What is your age?' },
  { field: 'skills', questionBn: 'আপনি কী কাজ করতে পারেন?', questionEn: 'What work can you do?' },
  { field: 'experience', questionBn: 'আপনার কত বছরের অভিজ্ঞতা আছে?', questionEn: 'How many years of experience do you have?' },
  { field: 'location', questionBn: 'আপনি কোথায় থাকেন?', questionEn: 'Where do you live?' },
  { field: 'phone', questionBn: 'আপনার ফোন নম্বর কী?', questionEn: 'What is your phone number?' },
];

// Mock responses for demo
const mockResponses = [
  'রহিম মিয়া',
  '26-35',
  ['electrician', 'plumber'],
  'oneToThreeYears',
  'ঢাকা, মিরপুর',
  '01712345678',
];

export default function VoiceFormScreen() {
  const { t, language } = useLanguage();
  const { setWorkerProfile, setHasCompletedOnboarding } = useApp();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isListening) {
      startPulseAnimation();
    }
  }, [isListening]);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startListening = () => {
    setIsListening(true);
    
    // Simulate listening for 2 seconds
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        const response = mockResponses[currentQuestion];
        setResponses(prev => [...prev, response]);
        
        if (currentQuestion < voiceQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          handleComplete();
        }
      }, 1000);
    }, 2000);
  };

  const handleComplete = async () => {
    const profile = {
      id: Date.now().toString(),
      name: mockResponses[0] as string,
      age: mockResponses[1] as string,
      skills: mockResponses[2] as string[],
      experience: mockResponses[3] as string,
      jobType: 'fullTime',
      location: mockResponses[4] as string,
      phone: mockResponses[5] as string,
      verified: true,
      rating: 0,
      badge: 'green' as const,
      createdAt: new Date().toISOString(),
    };

    await setWorkerProfile(profile);
    await setHasCompletedOnboarding(true);
    
    Alert.alert(t('done'), '', [
      { text: 'OK', onPress: () => router.replace('/worker/profile') }
    ]);
  };

  const currentQ = voiceQuestions[currentQuestion];

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
        <Text style={styles.title}>{t('voiceFormTitle')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentQuestion + 1} / {voiceQuestions.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / voiceQuestions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.questionContainer}>
          <Ionicons name="volume-high-outline" size={32} color="#2E7D32" style={styles.speakerIcon} />
          <Text style={styles.question}>
            {language === 'bn' ? currentQ.questionBn : currentQ.questionEn}
          </Text>
        </View>

        <View style={styles.micContainer}>
          <TouchableOpacity
            onPress={startListening}
            disabled={isListening || isProcessing}
            activeOpacity={0.7}
          >
            <Animated.View 
              style={[
                styles.micButton,
                isListening && styles.micButtonActive,
                { transform: [{ scale: isListening ? pulseAnim : 1 }] }
              ]}
            >
              <Ionicons 
                name={isListening ? 'mic' : 'mic-outline'} 
                size={60} 
                color="#FFFFFF" 
              />
            </Animated.View>
          </TouchableOpacity>
          
          <Text style={styles.micLabel}>
            {isListening ? t('listening') : isProcessing ? t('processing') : t('tapToSpeak')}
          </Text>
        </View>

        {responses.length > 0 && (
          <View style={styles.responsesContainer}>
            <Text style={styles.responsesTitle}>Recorded:</Text>
            {responses.map((response, index) => (
              <View key={index} style={styles.responseItem}>
                <Text style={styles.responseField}>
                  {voiceQuestions[index].field}:
                </Text>
                <Text style={styles.responseValue}>
                  {Array.isArray(response) ? response.join(', ') : response}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <BigButton
          title={t('skip')}
          onPress={() => router.push('/worker/register/face-capture')}
          variant="outline"
          icon="create-outline"
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
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  progressText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  questionContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 24,
    marginTop: 32,
    alignItems: 'center',
    width: '100%',
  },
  speakerIcon: {
    marginBottom: 12,
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  micContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonActive: {
    backgroundColor: '#D32F2F',
  },
  micLabel: {
    fontSize: 18,
    color: '#666666',
    marginTop: 16,
  },
  responsesContainer: {
    marginTop: 32,
    width: '100%',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  responsesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  responseItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  responseField: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  responseValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
