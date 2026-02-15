import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

interface ComplaintType {
  id: string;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const complaintTypes: ComplaintType[] = [
  { id: 'safety', labelKey: 'safetyIssue', icon: 'shield-outline', color: '#F44336' },
  { id: 'payment', labelKey: 'paymentIssue', icon: 'cash-outline', color: '#FF9800' },
  { id: 'fake', labelKey: 'fakeInfo', icon: 'alert-circle-outline', color: '#9C27B0' },
];

export default function ComplaintScreen() {
  const { t, language } = useLanguage();
  const { mockWorkers } = useApp();
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  
  const [selectedType, setSelectedType] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const worker = mockWorkers.find(w => w.id === workerId) || mockWorkers[0];

  const handleSubmitComplaint = () => {
    if (!selectedType) {
      Alert.alert('Error', language === 'bn' ? 'অভিযোগের ধরন নির্বাচন করুন' : 'Select complaint type');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        t('complaintSubmitted'),
        language === 'bn' 
          ? 'আমরা আপনার অভিযোগ পর্যালোচনা করব' 
          : 'We will review your complaint',
        [{ text: 'OK', onPress: () => router.replace('/employer/dashboard') }]
      );
    }, 1000);
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
        <Text style={styles.title}>{t('complaint')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.content}>
        {/* Worker Info */}
        <View style={styles.workerCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={32} color="#666666" />
          </View>
          <Text style={styles.workerName}>{worker?.name || 'Worker'}</Text>
        </View>

        {/* Complaint Types */}
        <Text style={styles.sectionTitle}>
          {language === 'bn' ? 'অভিযোগের ধরন' : 'Complaint Type'}
        </Text>

        {complaintTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeCard,
              selectedType === type.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedType(type.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.typeIcon, { backgroundColor: `${type.color}20` }]}>
              <Ionicons name={type.icon} size={24} color={type.color} />
            </View>
            <Text style={styles.typeLabel}>{t(type.labelKey as any)}</Text>
            {selectedType === type.id && (
              <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
            )}
          </TouchableOpacity>
        ))}

        {/* Details Input */}
        <Text style={styles.sectionTitle}>
          {language === 'bn' ? 'বিস্তারিত (ঐচ্ছিক)' : 'Details (optional)'}
        </Text>
        <TextInput
          style={styles.detailsInput}
          placeholder={language === 'bn' ? 'বিস্তারিত লিখুন...' : 'Write details...'}
          placeholderTextColor="#9E9E9E"
          value={details}
          onChangeText={setDetails}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Badge Info */}
        <View style={styles.badgeInfo}>
          <Text style={styles.badgeInfoTitle}>
            {language === 'bn' ? 'ব্যাজ সিস্টেম' : 'Badge System'}
          </Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.badgeLabel}>{t('trusted')}</Text>
          </View>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: '#FFC107' }]} />
            <Text style={styles.badgeLabel}>{t('caution')}</Text>
          </View>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: '#F44336' }]} />
            <Text style={styles.badgeLabel}>{t('restricted')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <BigButton
          title={t('submitComplaint')}
          onPress={handleSubmitComplaint}
          loading={loading}
          disabled={!selectedType}
          icon="send-outline"
          variant="primary"
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
  },
  workerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 12,
  },
  detailsInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333333',
    height: 100,
    marginBottom: 16,
  },
  badgeInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
  },
  badgeInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  badgeLabel: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
