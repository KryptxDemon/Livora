import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

interface Package {
  id: string;
  nameKey: string;
  price: string;
  icon: keyof typeof Ionicons.glyphMap;
  features: string[];
}

const packages: Package[] = [
  {
    id: 'oneTime',
    nameKey: 'oneTimePost',
    price: '৳50',
    icon: 'document-text-outline',
    features: ['1 job post', '5 SMS credits'],
  },
  {
    id: 'monthly',
    nameKey: 'monthlySubscription',
    price: '৳500',
    icon: 'calendar-outline',
    features: ['Unlimited posts', '50 SMS credits', 'Priority support'],
  },
  {
    id: 'emergency',
    nameKey: 'emergencyPost',
    price: '৳100',
    icon: 'flash-outline',
    features: ['Instant visibility', '10 SMS credits', 'Urgent badge'],
  },
];

export default function PackageSelectScreen() {
  const { t, language } = useLanguage();
  const { employerProfile, setEmployerProfile } = useApp();
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleContinue = async () => {
    if (employerProfile && selectedPackage) {
      await setEmployerProfile({
        ...employerProfile,
        package: selectedPackage,
      });
    }
    router.push('/employer/payment');
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
        <Text style={styles.title}>{t('selectPackage')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.content}>
        {packages.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            style={[
              styles.packageCard,
              selectedPackage === pkg.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedPackage(pkg.id)}
            activeOpacity={0.7}
          >
            <View style={styles.packageHeader}>
              <View style={[
                styles.iconContainer,
                selectedPackage === pkg.id && styles.selectedIcon,
              ]}>
                <Ionicons 
                  name={pkg.icon} 
                  size={28} 
                  color={selectedPackage === pkg.id ? '#FFFFFF' : '#2E7D32'} 
                />
              </View>
              <View style={styles.packageInfo}>
                <Text style={[
                  styles.packageName,
                  selectedPackage === pkg.id && styles.selectedText,
                ]}>
                  {t(pkg.nameKey as any)}
                </Text>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
              </View>
              {selectedPackage === pkg.id && (
                <Ionicons name="checkmark-circle" size={28} color="#2E7D32" />
              )}
            </View>
            <View style={styles.featuresContainer}>
              {pkg.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Ionicons name="checkmark" size={16} color="#4CAF50" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <BigButton
          title={t('next')}
          onPress={handleContinue}
          disabled={!selectedPackage}
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
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    backgroundColor: '#2E7D32',
  },
  packageInfo: {
    flex: 1,
    marginLeft: 12,
  },
  packageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  selectedText: {
    color: '#2E7D32',
  },
  packagePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 2,
  },
  featuresContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
