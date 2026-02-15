import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { BigButton } from '@/components/ui/big-button';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t, language } = useLanguage();
  const { workerProfile } = useApp();

  if (!workerProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text>No profile found</Text>
          <BigButton
            title={t('back')}
            onPress={() => router.replace('/role-select')}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  const getSkillLabel = (skill: string) => {
    const skillMap: Record<string, string> = {
      cleaner: t('cleaner'),
      mason: t('mason'),
      electrician: t('electrician'),
      driver: t('driver'),
      cook: t('cook'),
      plumber: t('plumber'),
      carpenter: t('carpenter'),
      painter: t('painter'),
      gardener: t('gardener'),
      security: t('security'),
    };
    return skillMap[skill] || skill;
  };

  const getExperienceLabel = (exp: string) => {
    const expMap: Record<string, string> = {
      noExperience: t('noExperience'),
      lessThan1Year: t('lessThan1Year'),
      oneToThreeYears: t('oneToThreeYears'),
      threeYearsPlus: t('threeYearsPlus'),
    };
    return expMap[exp] || exp;
  };

  const handleDownloadPDF = () => {
    Alert.alert(
      t('downloadProfilePDF'),
      'Demo: PDF would be generated here',
      [{ text: 'OK' }]
    );
  };

  const getBadgeColor = (badge: 'green' | 'yellow' | 'red') => {
    switch (badge) {
      case 'green': return '#4CAF50';
      case 'yellow': return '#FFC107';
      case 'red': return '#F44336';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('yourProfile')}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <View style={styles.photoContainer}>
            {workerProfile.photo && workerProfile.photo !== 'placeholder' ? (
              <Image source={{ uri: workerProfile.photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person" size={48} color="#9E9E9E" />
              </View>
            )}
            <View style={[styles.badge, { backgroundColor: getBadgeColor(workerProfile.badge) }]}>
              <Text style={styles.badgeText}>{t(workerProfile.badge === 'green' ? 'trusted' : workerProfile.badge === 'yellow' ? 'caution' : 'restricted')}</Text>
            </View>
          </View>

          <Text style={styles.name}>{workerProfile.name}</Text>
          
          {workerProfile.rating > 0 && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#FFC107" />
              <Text style={styles.rating}>{workerProfile.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('selectSkills')}</Text>
          <View style={styles.skillsContainer}>
            {workerProfile.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{getSkillLabel(skill)}</Text>
              </View>
            ))}
            {workerProfile.customSkill && (
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>{workerProfile.customSkill}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={24} color="#2E7D32" />
            <Text style={styles.infoLabel}>{t('experience')}:</Text>
            <Text style={styles.infoValue}>{getExperienceLabel(workerProfile.experience)}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={24} color="#2E7D32" />
            <Text style={styles.infoLabel}>{t('location')}:</Text>
            <Text style={styles.infoValue}>{workerProfile.location}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={24} color="#2E7D32" />
            <Text style={styles.infoLabel}>{t('phoneNumber')}:</Text>
            <Text style={styles.infoValue}>{workerProfile.phone}</Text>
          </View>
        </View>

        <View style={styles.warningBox}>
          <Ionicons name="warning-outline" size={24} color="#F57C00" />
          <Text style={styles.warningText}>{t('profileWarning')}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <BigButton
            title={t('downloadProfilePDF')}
            onPress={handleDownloadPDF}
            icon="download-outline"
            variant="primary"
          />
          
          <BigButton
            title={t('home')}
            onPress={() => router.replace('/worker/dashboard')}
            icon="home-outline"
            variant="outline"
            style={{ marginTop: 12 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 4,
  },
  section: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
    flex: 1,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#E65100',
    marginLeft: 12,
  },
  buttonGroup: {
    marginBottom: 24,
  },
});
