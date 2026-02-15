import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

export default function HiringOptionsScreen() {
  const { t, language } = useLanguage();
  const { mockWorkers } = useApp();
  const { workerId } = useLocalSearchParams<{ workerId: string }>();

  const worker = mockWorkers.find(w => w.id === workerId);

  const handleInstantHire = () => {
    Alert.alert(
      language === 'bn' ? 'নিয়োগ সম্পন্ন!' : 'Hired!',
      language === 'bn' 
        ? `${worker?.name || 'কর্মী'} কে নিয়োগ করা হয়েছে` 
        : `${worker?.name || 'Worker'} has been hired`,
      [
        { 
          text: 'OK', 
          onPress: () => router.push({
            pathname: '/employer/rating',
            params: { workerId },
          })
        }
      ]
    );
  };

  const handleReviewSelect = () => {
    Alert.alert(
      language === 'bn' ? 'পর্যালোচনা' : 'Review',
      language === 'bn' 
        ? 'কর্মীর প্রোফাইল দেখুন এবং সিদ্ধান্ত নিন' 
        : 'Review worker profile and decide',
      [
        { text: language === 'bn' ? 'বাতিল' : 'Cancel', style: 'cancel' },
        { 
          text: language === 'bn' ? 'নিয়োগ করুন' : 'Hire', 
          onPress: handleInstantHire 
        },
      ]
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
        <Text style={styles.title}>{t('hiringOptions')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.content}>
        {/* Worker Info Card */}
        {worker && (
          <View style={styles.workerCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={40} color="#2E7D32" />
            </View>
            <Text style={styles.workerName}>{worker.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={20} color="#FFC107" />
              <Text style={styles.rating}>{worker.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.location}>{worker.location}</Text>
          </View>
        )}

        {/* Hiring Options */}
        <View style={styles.optionsContainer}>
          <BigButton
            title={t('instantHire')}
            onPress={handleInstantHire}
            icon="flash-outline"
            variant="primary"
            style={styles.optionButton}
          />

          <BigButton
            title={t('reviewAndSelect')}
            onPress={handleReviewSelect}
            icon="eye-outline"
            variant="outline"
            style={styles.optionButton}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <BigButton
          title={t('cancel')}
          onPress={() => router.back()}
          variant="outline"
          size="medium"
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
    padding: 24,
    alignItems: 'center',
  },
  workerCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  workerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 4,
  },
  location: {
    fontSize: 16,
    color: '#666666',
  },
  optionsContainer: {
    width: '100%',
    gap: 16,
  },
  optionButton: {
    width: '100%',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
