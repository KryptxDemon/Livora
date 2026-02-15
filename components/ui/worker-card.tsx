import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WorkerProfile } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';

interface WorkerCardProps {
  worker: WorkerProfile;
  onPress?: () => void;
  onSendSMS?: () => void;
  showActions?: boolean;
}

export function WorkerCard({ worker, onPress, onSendSMS, showActions = true }: WorkerCardProps) {
  const { t, language } = useLanguage();

  const getBadgeColor = (badge: 'green' | 'yellow' | 'red') => {
    switch (badge) {
      case 'green':
        return '#4CAF50';
      case 'yellow':
        return '#FFC107';
      case 'red':
        return '#F44336';
    }
  };

  const getBadgeText = (badge: 'green' | 'yellow' | 'red') => {
    switch (badge) {
      case 'green':
        return t('trusted');
      case 'yellow':
        return t('caution');
      case 'red':
        return t('restricted');
    }
  };

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

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <View style={styles.photoContainer}>
          {worker.photo ? (
            <Image source={{ uri: worker.photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="person" size={32} color="#9E9E9E" />
            </View>
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{worker.name}</Text>
          <View style={styles.skillsRow}>
            {worker.skills.slice(0, 2).map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{getSkillLabel(skill)}</Text>
              </View>
            ))}
            {worker.skills.length > 2 && (
              <Text style={styles.moreSkills}>+{worker.skills.length - 2}</Text>
            )}
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={16} color="#666666" />
            <Text style={styles.location}>{worker.location}</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <View style={[styles.badge, { backgroundColor: getBadgeColor(worker.badge) }]}>
            <Text style={styles.badgeText}>{getBadgeText(worker.badge)}</Text>
          </View>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.rating}>{worker.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
      
      {showActions && onSendSMS && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.smsButton} onPress={onSendSMS}>
            <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
            <Text style={styles.smsButtonText}>{t('sendSMS')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  photoContainer: {
    marginRight: 12,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  photoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  skillTag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  moreSkills: {
    fontSize: 12,
    color: '#666666',
    alignSelf: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 4,
  },
  actions: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  smsButton: {
    backgroundColor: '#1565C0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  smsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
