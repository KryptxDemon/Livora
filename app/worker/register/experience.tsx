import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/context/LanguageContext';
import { BigButton } from '@/components/ui/big-button';
import { ProgressSteps } from '@/components/ui/progress-steps';
import { Ionicons } from '@expo/vector-icons';

const TOTAL_STEPS = 7;

interface ExperienceOption {
  id: string;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const experienceOptions: ExperienceOption[] = [
  { id: 'noExperience', labelKey: 'noExperience', icon: 'school-outline' },
  { id: 'lessThan1Year', labelKey: 'lessThan1Year', icon: 'time-outline' },
  { id: 'oneToThreeYears', labelKey: 'oneToThreeYears', icon: 'trending-up-outline' },
  { id: 'threeYearsPlus', labelKey: 'threeYearsPlus', icon: 'ribbon-outline' },
];

export default function ExperienceScreen() {
  const { t } = useLanguage();
  const [selectedExperience, setSelectedExperience] = useState('');

  const handleNext = async () => {
    await AsyncStorage.setItem('@livora_reg_experience', selectedExperience);
    router.push('/worker/register/work-location');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps steps={TOTAL_STEPS} currentStep={4} />
      
      <View style={styles.header}>
        <BigButton
          title={t('back')}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
        <Text style={styles.title}>{t('experience')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <Text style={styles.subtitle}>{t('selectExperience')}</Text>

      <View style={styles.content}>
        {experienceOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              selectedExperience === option.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedExperience(option.id)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.iconContainer,
              selectedExperience === option.id && styles.selectedIconContainer,
            ]}>
              <Ionicons
                name={option.icon}
                size={32}
                color={selectedExperience === option.id ? '#FFFFFF' : '#2E7D32'}
              />
            </View>
            <Text style={[
              styles.optionText,
              selectedExperience === option.id && styles.selectedText,
            ]}>
              {t(option.labelKey as any)}
            </Text>
            {selectedExperience === option.id && (
              <Ionicons name="checkmark-circle" size={28} color="#2E7D32" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <BigButton
          title={t('next')}
          onPress={handleNext}
          disabled={!selectedExperience}
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
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  selectedIconContainer: {
    backgroundColor: '#2E7D32',
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  selectedText: {
    color: '#2E7D32',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
