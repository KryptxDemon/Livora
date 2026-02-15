import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SkillCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export function SkillCard({ icon, label, selected = false, onPress }: SkillCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, selected && styles.selectedIconContainer]}>
        <Ionicons
          name={icon}
          size={36}
          color={selected ? '#FFFFFF' : '#2E7D32'}
        />
      </View>
      <Text style={[styles.label, selected && styles.selectedLabel]} numberOfLines={2}>
        {label}
      </Text>
      {selected && (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectedIconContainer: {
    backgroundColor: '#2E7D32',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  selectedLabel: {
    color: '#2E7D32',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
