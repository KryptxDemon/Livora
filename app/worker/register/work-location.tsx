import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/context/LanguageContext';
import { BigButton } from '@/components/ui/big-button';
import { InputField } from '@/components/ui/input-field';
import { Dropdown } from '@/components/ui/dropdown';
import { ProgressSteps } from '@/components/ui/progress-steps';

const TOTAL_STEPS = 7;

export default function WorkLocationScreen() {
  const { t } = useLanguage();
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');

  const jobTypeOptions = [
    { value: 'fullTime', label: t('fullTime') },
    { value: 'partTime', label: t('partTime') },
    { value: 'daily', label: t('daily') },
    { value: 'contract', label: t('contract') },
  ];

  const handleNext = async () => {
    await AsyncStorage.setItem('@livora_reg_jobType', jobType);
    await AsyncStorage.setItem('@livora_reg_location', location);
    router.push('/worker/register/id-upload');
  };

  const isValid = jobType.length > 0 && location.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps steps={TOTAL_STEPS} currentStep={5} />
      
      <View style={styles.header}>
        <BigButton
          title={t('back')}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
        <Text style={styles.title}>{t('workAndLocation')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Dropdown
          label={t('jobType')}
          placeholder={t('selectJobType')}
          options={jobTypeOptions}
          value={jobType}
          onSelect={setJobType}
        />

        <InputField
          label={t('location')}
          placeholder={t('enterLocation')}
          value={location}
          onChangeText={setLocation}
        />
      </ScrollView>

      <View style={styles.footer}>
        <BigButton
          title={t('next')}
          onPress={handleNext}
          disabled={!isValid}
          icon="arrow-forward-outline"
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
  },
  scrollContent: {
    padding: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
