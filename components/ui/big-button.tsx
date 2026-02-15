import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BigButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function BigButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: BigButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#2E7D32' : '#FFFFFF'}
          size="small"
        />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={size === 'large' ? 28 : size === 'medium' ? 24 : 20}
              color={variant === 'outline' ? '#2E7D32' : '#FFFFFF'}
              style={styles.icon}
            />
          )}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Variants
  primaryButton: {
    backgroundColor: '#2E7D32',
  },
  secondaryButton: {
    backgroundColor: '#1565C0',
  },
  outlineButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  
  // Sizes
  largeButton: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    minHeight: 72,
  },
  mediumButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
  },
  smallButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  
  // Disabled
  disabledButton: {
    backgroundColor: '#BDBDBD',
    borderColor: '#BDBDBD',
  },
  
  // Text
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#2E7D32',
  },
  largeText: {
    fontSize: 20,
  },
  mediumText: {
    fontSize: 18,
  },
  smallText: {
    fontSize: 16,
  },
  disabledText: {
    color: '#757575',
  },
  
  icon: {
    marginRight: 12,
  },
});
