import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

export default function RatingScreen() {
  const { t, language } = useLanguage();
  const { mockWorkers } = useApp();
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const worker = mockWorkers.find(w => w.id === workerId) || mockWorkers[0];

  const handleSubmitRating = () => {
    if (rating === 0) {
      Alert.alert('Error', language === 'bn' ? 'রেটিং দিন' : 'Please give a rating');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        language === 'bn' ? 'ধন্যবাদ!' : 'Thank you!',
        language === 'bn' ? 'আপনার রেটিং জমা হয়েছে' : 'Your rating has been submitted',
        [{ text: 'OK', onPress: () => router.replace('/employer/dashboard') }]
      );
    }, 1000);
  };

  const handleFileComplaint = () => {
    router.push({
      pathname: '/employer/complaint',
      params: { workerId },
    });
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
        <Text style={styles.title}>{t('rateWorker')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.content}>
        {/* Worker Info */}
        <View style={styles.workerCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#2E7D32" />
          </View>
          <Text style={styles.workerName}>{worker?.name || 'Worker'}</Text>
        </View>

        {/* Star Rating */}
        <Text style={styles.ratingLabel}>
          {language === 'bn' ? 'কাজের মান কেমন ছিল?' : 'How was the work quality?'}
        </Text>
        
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={48}
                color={star <= rating ? '#FFC107' : '#BDBDBD'}
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.ratingText}>
          {rating === 0 ? '' :
           rating === 1 ? (language === 'bn' ? 'খারাপ' : 'Poor') :
           rating === 2 ? (language === 'bn' ? 'মোটামুটি' : 'Fair') :
           rating === 3 ? (language === 'bn' ? 'ভালো' : 'Good') :
           rating === 4 ? (language === 'bn' ? 'খুব ভালো' : 'Very Good') :
           (language === 'bn' ? 'চমৎকার' : 'Excellent')}
        </Text>

        {/* Bulk Rating Option */}
        <TouchableOpacity style={styles.bulkOption}>
          <Ionicons name="people-outline" size={24} color="#2E7D32" />
          <Text style={styles.bulkText}>{t('bulkRating')}</Text>
          <Ionicons name="chevron-forward" size={24} color="#666666" />
        </TouchableOpacity>

        {/* Complaint Link */}
        <TouchableOpacity style={styles.complaintLink} onPress={handleFileComplaint}>
          <Ionicons name="warning-outline" size={20} color="#F44336" />
          <Text style={styles.complaintText}>{t('fileComplaint')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <BigButton
          title={t('submitRating')}
          onPress={handleSubmitRating}
          loading={loading}
          disabled={rating === 0}
          icon="checkmark-outline"
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
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  workerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  ratingLabel: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  star: {
    marginHorizontal: 4,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    height: 28,
    marginBottom: 32,
  },
  bulkOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  bulkText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  complaintLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  complaintText: {
    fontSize: 16,
    color: '#F44336',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
