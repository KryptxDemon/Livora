import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

interface PaymentMethod {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'bkash', name: 'bKash', icon: 'wallet-outline', color: '#E2136E' },
  { id: 'nagad', name: 'Nagad', icon: 'card-outline', color: '#F6921E' },
  { id: 'mobile', name: 'Mobile Balance', icon: 'phone-portrait-outline', color: '#2196F3' },
];

export default function PaymentScreen() {
  const { t, language } = useLanguage();
  const { employerProfile, setEmployerProfile } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);

  const getPackagePrice = () => {
    switch (employerProfile?.package) {
      case 'oneTime': return '৳50';
      case 'monthly': return '৳500';
      case 'emergency': return '৳100';
      default: return '৳0';
    }
  };

  const getSmsCredits = () => {
    switch (employerProfile?.package) {
      case 'oneTime': return 5;
      case 'monthly': return 50;
      case 'emergency': return 10;
      default: return 0;
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      if (employerProfile) {
        await setEmployerProfile({
          ...employerProfile,
          smsCredits: (employerProfile.smsCredits || 0) + getSmsCredits(),
        });
      }
      
      setLoading(false);
      Alert.alert(
        language === 'bn' ? 'পেমেন্ট সফল!' : 'Payment Successful!',
        language === 'bn' ? 'আপনার প্যাকেজ সক্রিয় হয়েছে' : 'Your package is now active',
        [{ text: 'OK', onPress: () => router.replace('/employer/dashboard') }]
      );
    }, 1500);
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
        <Text style={styles.title}>{t('payment')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.content}>
        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            {language === 'bn' ? 'অর্ডার সারাংশ' : 'Order Summary'}
          </Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {t(employerProfile?.package === 'oneTime' ? 'oneTimePost' : 
                employerProfile?.package === 'monthly' ? 'monthlySubscription' : 'emergencyPost' as any)}
            </Text>
            <Text style={styles.summaryPrice}>{getPackagePrice()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>
              {language === 'bn' ? 'মোট' : 'Total'}
            </Text>
            <Text style={styles.totalPrice}>{getPackagePrice()}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>{t('selectPaymentMethod')}</Text>
        
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.selectedMethod,
            ]}
            onPress={() => setSelectedMethod(method.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.methodIcon, { backgroundColor: `${method.color}20` }]}>
              <Ionicons name={method.icon} size={28} color={method.color} />
            </View>
            <Text style={styles.methodName}>
              {method.id === 'bkash' ? t('bkash') : 
               method.id === 'nagad' ? t('nagad') : t('mobileBalance')}
            </Text>
            {selectedMethod === method.id && (
              <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <BigButton
          title={`${t('pay')} ${getPackagePrice()}`}
          onPress={handlePayment}
          disabled={!selectedMethod}
          loading={loading}
          icon="card-outline"
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
  summaryCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333333',
  },
  summaryPrice: {
    fontSize: 16,
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedMethod: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 12,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
