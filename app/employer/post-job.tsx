import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp, Job } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { InputField } from '@/components/ui/input-field';
import { Dropdown } from '@/components/ui/dropdown';
import { Ionicons } from '@expo/vector-icons';

export default function PostJobScreen() {
  const { t, language } = useLanguage();
  const { employerProfile, addJob } = useApp();
  
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfWorkers, setNumberOfWorkers] = useState('1');
  const [urgency, setUrgency] = useState('normal');
  const [payRange, setPayRange] = useState('');
  const [loading, setLoading] = useState(false);

  const jobTypeOptions = [
    { value: 'cleaner', label: t('cleaner') },
    { value: 'mason', label: t('mason') },
    { value: 'electrician', label: t('electrician') },
    { value: 'driver', label: t('driver') },
    { value: 'cook', label: t('cook') },
    { value: 'plumber', label: t('plumber') },
    { value: 'carpenter', label: t('carpenter') },
    { value: 'painter', label: t('painter') },
    { value: 'other', label: t('otherSkill') },
  ];

  const workerOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '5+', label: '5+' },
  ];

  const urgencyOptions = [
    { value: 'normal', label: t('normal') },
    { value: 'urgent', label: t('urgent') },
  ];

  const handlePostJob = async () => {
    if (!jobType || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);

    const job: Job = {
      id: Date.now().toString(),
      employerId: employerProfile?.id || '',
      jobType: jobType,
      location: location,
      numberOfWorkers: parseInt(numberOfWorkers) || 1,
      urgency: urgency as 'normal' | 'urgent',
      payRange: payRange || undefined,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    await addJob(job);

    setLoading(false);
    Alert.alert(
      t('jobPosted'),
      '',
      [{ text: 'OK', onPress: () => router.push('/employer/job-matching') }]
    );
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
        <Text style={styles.title}>{t('postJob')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="megaphone-outline" size={60} color="#2E7D32" />
        </View>

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

        <Dropdown
          label={t('numberOfWorkers')}
          placeholder="1"
          options={workerOptions}
          value={numberOfWorkers}
          onSelect={setNumberOfWorkers}
        />

        <Dropdown
          label={t('urgency')}
          placeholder={t('normal')}
          options={urgencyOptions}
          value={urgency}
          onSelect={setUrgency}
        />

        <InputField
          label={t('payRange')}
          placeholder="৳500 - ৳1000"
          value={payRange}
          onChangeText={setPayRange}
          keyboardType="default"
        />

        {urgency === 'urgent' && (
          <View style={styles.urgentBadge}>
            <Ionicons name="flash" size={20} color="#FFFFFF" />
            <Text style={styles.urgentText}>
              {language === 'bn' ? 'জরুরি পোস্ট - দ্রুত দেখা যাবে' : 'Urgent Post - Higher visibility'}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <BigButton
          title={t('postJobButton')}
          onPress={handlePostJob}
          loading={loading}
          disabled={!jobType || !location}
          icon="send-outline"
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
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  urgentText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
