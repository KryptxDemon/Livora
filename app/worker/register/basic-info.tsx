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

export default function BasicInfoScreen() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const ageOptions = [
    { value: '18-25', label: t('age18to25') },
    { value: '26-35', label: t('age26to35') },
    { value: '36-45', label: t('age36to45') },
    { value: '46-55', label: t('age46to55') },
    { value: '56+', label: t('age56plus') },
  ];

  const genderOptions = [
    { value: 'male', label: t('male') },
    { value: 'female', label: t('female') },
    { value: 'other', label: t('other') },
    { value: 'prefer_not', label: t('preferNotToSay') },
  ];

  const handleNext = async () => {
    await AsyncStorage.setItem('@livora_reg_name', name);
    await AsyncStorage.setItem('@livora_reg_age', age);
    await AsyncStorage.setItem('@livora_reg_gender', gender);
    router.push('/worker/register/skills');
  };

  const isValid = name.trim().length > 0 && age.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps steps={TOTAL_STEPS} currentStep={2} />
      
      <View style={styles.header}>
        <BigButton
          title={t('back')}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
        <Text style={styles.title}>{t('basicInfo')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <InputField
          label={t('name')}
          placeholder={t('enterName')}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Dropdown
          label={t('age')}
          placeholder={t('selectAge')}
          options={ageOptions}
          value={age}
          onSelect={setAge}
        />

        <Dropdown
          label={t('gender')}
          placeholder={t('gender')}
          options={genderOptions}
          value={gender}
          onSelect={setGender}
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
