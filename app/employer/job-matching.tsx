import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { WorkerCard } from '@/components/ui/worker-card';
import { Ionicons } from '@expo/vector-icons';

export default function JobMatchingScreen() {
  const { t, language } = useLanguage();
  const { mockWorkers, employerProfile, setEmployerProfile } = useApp();
  const [smsSentTo, setSmsSentTo] = useState<string[]>([]);

  const handleSendSMS = async (workerId: string) => {
    if (!employerProfile || employerProfile.smsCredits <= 0) {
      Alert.alert(
        language === 'bn' ? 'ক্রেডিট নেই' : 'No Credits',
        language === 'bn' ? 'আপনার SMS ক্রেডিট শেষ' : 'You have no SMS credits left'
      );
      return;
    }

    // Deduct SMS credit
    await setEmployerProfile({
      ...employerProfile,
      smsCredits: employerProfile.smsCredits - 1,
    });

    setSmsSentTo(prev => [...prev, workerId]);
    
    Alert.alert(
      t('smsSent'),
      language === 'bn' ? 'কর্মীকে বার্তা পাঠানো হয়েছে' : 'Message sent to worker'
    );
  };

  const handleSelectWorker = (workerId: string) => {
    router.push({
      pathname: '/employer/hiring-options',
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
        <Text style={styles.title}>{t('nearbyWorkers')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.creditsBar}>
        <Ionicons name="chatbubble-outline" size={20} color="#2E7D32" />
        <Text style={styles.creditsText}>
          {t('smsCredits')}: {employerProfile?.smsCredits || 0}
        </Text>
      </View>

      <FlatList
        data={mockWorkers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <WorkerCard
            worker={item}
            onPress={() => handleSelectWorker(item.id)}
            onSendSMS={() => handleSendSMS(item.id)}
            showActions={!smsSentTo.includes(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={60} color="#9E9E9E" />
            <Text style={styles.emptyText}>
              {language === 'bn' ? 'কোনো কর্মী পাওয়া যায়নি' : 'No workers found'}
            </Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <BigButton
          title={language === 'bn' ? 'ড্যাশবোর্ডে যান' : 'Go to Dashboard'}
          onPress={() => router.replace('/employer/dashboard')}
          variant="outline"
          icon="home-outline"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  creditsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 12,
    marginBottom: 8,
  },
  creditsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
});
