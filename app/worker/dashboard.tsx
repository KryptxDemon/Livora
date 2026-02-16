import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import CustomerCareModal from '@/components/customer-care-modal';
import { Ionicons } from '@expo/vector-icons';

export default function WorkerDashboardScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { workerProfile, clearAllData } = useApp();
  const [customerCareVisible, setCustomerCareVisible] = useState(false);

  const handleLogout = async () => {
    await clearAllData();
    router.replace('/language-select');
  };

  const toggleLanguage = async () => {
    await setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home')}</Text>
        <TouchableOpacity style={styles.languageToggle} onPress={toggleLanguage}>
          <Ionicons name="globe-outline" size={20} color="#2E7D32" />
          <Text style={styles.languageText}>{language === 'bn' ? 'EN' : 'বাং'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeRow}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={32} color="#2E7D32" />
            </View>
            <View style={styles.welcomeInfo}>
              <Text style={styles.welcomeText}>
                {language === 'bn' ? 'স্বাগতম' : 'Welcome'},
              </Text>
              <Text style={styles.welcomeName}>{workerProfile?.name || 'User'}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          {language === 'bn' ? 'দ্রুত কার্যক্রম' : 'Quick Actions'}
        </Text>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/worker/profile')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="person-outline" size={28} color="#2E7D32" />
            </View>
            <Text style={styles.actionText}>{t('profile')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="briefcase-outline" size={28} color="#1565C0" />
            </View>
            <Text style={styles.actionText}>{t('jobs')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="chatbubbles-outline" size={28} color="#EF6C00" />
            </View>
            <Text style={styles.actionText}>{t('messages')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => setCustomerCareVisible(true)}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="headset-outline" size={28} color="#C2185B" />
            </View>
            <Text style={styles.actionText}>{t('contactCustomerCare')}</Text>
          </TouchableOpacity>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>
            {language === 'bn' ? 'আপনার স্ট্যাটাস' : 'Your Status'}
          </Text>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.statusLabel}>
                {language === 'bn' ? 'প্রোফাইল সম্পূর্ণ' : 'Profile Complete'}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
              <Text style={styles.statusLabel}>
                {language === 'bn' ? 'যাচাইকৃত' : 'Verified'}
              </Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Ionicons name="bulb-outline" size={24} color="#FFC107" />
          <Text style={styles.tipsText}>
            {language === 'bn' 
              ? 'প্রতিদিন অ্যাপ চেক করুন নতুন কাজের জন্য!'
              : 'Check the app daily for new job opportunities!'}
          </Text>
        </View>

        <View style={styles.logoutContainer}>
          <BigButton
            title={t('logout')}
            onPress={handleLogout}
            variant="outline"
            icon="log-out-outline"
            size="medium"
          />
        </View>
      </ScrollView>

      <CustomerCareModal
        visible={customerCareVisible}
        onClose={() => setCustomerCareVisible(false)}
        userRole="worker"
      />
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeInfo: {
    marginLeft: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666666',
  },
  welcomeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  tipsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDE7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  tipsText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    marginLeft: 12,
  },
  logoutContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
});
