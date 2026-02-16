import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { BigButton } from '@/components/ui/big-button';

interface CustomerCareModalProps {
  visible: boolean;
  onClose: () => void;
  userRole?: 'worker' | 'employer';
}

interface InquiryType {
  id: string;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface ContactChannel {
  id: string;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  action: () => void;
}

const inquiryTypes: InquiryType[] = [
  {
    id: 'technical',
    labelKey: 'technicalIssue',
    icon: 'bug-outline',
    color: '#F44336',
  },
  {
    id: 'general',
    labelKey: 'generalInquiry',
    icon: 'help-circle-outline',
    color: '#2196F3',
  },
  {
    id: 'feedback',
    labelKey: 'feedback',
    icon: 'star-outline',
    color: '#4CAF50',
  },
];

const contactChannels: ContactChannel[] = [
  {
    id: 'call',
    labelKey: 'callUs',
    icon: 'call-outline',
    color: '#FF9800',
    action: () => {
      // Placeholder for call functionality
      Alert.alert(
        'Call Support',
        'Calling customer support: +880-XX-XXXXXXXXX'
      );
    },
  },
  {
    id: 'whatsapp',
    labelKey: 'whatsapp',
    icon: 'logo-whatsapp',
    color: '#25D366',
    action: () => {
      // Placeholder for WhatsApp functionality
      Alert.alert('WhatsApp', 'Opening WhatsApp conversation...');
    },
  },
  {
    id: 'email',
    labelKey: 'email',
    icon: 'mail-outline',
    color: '#EA4335',
    action: () => {
      // Placeholder for email functionality
      Alert.alert('Email', 'Opening email client...');
    },
  },
];

export default function CustomerCareModal({
  visible,
  onClose,
  userRole = 'worker',
}: CustomerCareModalProps) {
  const { t, language } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContactChannels, setShowContactChannels] = useState(false);

  const handleSendMessage = () => {
    if (!selectedType || !message.trim()) {
      Alert.alert(
        'Required',
        language === 'bn'
          ? 'ধরন এবং বার্তা উভয়ই নির্বাচন করুন'
          : 'Please select a type and write a message'
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        t('messageSent'),
        language === 'bn'
          ? 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব'
          : 'We will contact you soon',
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedType('');
              setMessage('');
              onClose();
            },
          },
        ]
      );
    }, 1000);
  };

  const primaryColor = userRole === 'employer' ? '#1565C0' : '#2E7D32';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: primaryColor }]}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('customerCare')}</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Quick Contact Channels */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('contactUs')}</Text>
            <View style={styles.channelsGrid}>
              {contactChannels.map((channel) => (
                <TouchableOpacity
                  key={channel.id}
                  style={styles.channelCard}
                  onPress={channel.action}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.channelIcon,
                      { backgroundColor: `${channel.color}20` },
                    ]}
                  >
                    <Ionicons
                      name={channel.icon}
                      size={24}
                      color={channel.color}
                    />
                  </View>
                  <Text style={styles.channelLabel}>{t(channel.labelKey as any)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Message Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'bn'
                ? 'বার্তা পাঠান'
                : 'Send us a message'}
            </Text>

            {/* Inquiry Type */}
            <Text style={styles.label}>{t('inquiryType')}</Text>
            <View style={styles.typeList}>
              {inquiryTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeCard,
                    selectedType === type.id && [
                      styles.selectedCard,
                      { borderColor: primaryColor, backgroundColor: `${primaryColor}10` },
                    ],
                  ]}
                  onPress={() => setSelectedType(type.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.typeIcon,
                      { backgroundColor: `${type.color}20` },
                    ]}
                  >
                    <Ionicons name={type.icon} size={20} color={type.color} />
                  </View>
                  <Text style={styles.typeLabel}>{t(type.labelKey as any)}</Text>
                  {selectedType === type.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={primaryColor}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Message Input */}
            <Text style={styles.label}>{language === 'bn' ? 'বার্তা' : 'Message'}</Text>
            <TextInput
              style={styles.messageInput}
              placeholder={t('enterYourMessage')}
              placeholderTextColor="#BDBDBD"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* Help Text */}
            <View style={styles.helpBox}>
              <Ionicons name="information-circle-outline" size={20} color={primaryColor} />
              <Text style={styles.helpText}>
                {language === 'bn'
                  ? 'আমাদের দল ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে'
                  : 'Our team will respond within 24 hours'}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <BigButton
            title={language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}
            onPress={handleSendMessage}
            loading={loading}
            disabled={!selectedType || !message.trim() || loading}
            icon="send-outline"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  channelsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  channelCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  channelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  channelLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 10,
  },
  typeList: {
    marginBottom: 20,
    gap: 10,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
  },
  selectedCard: {
    borderWidth: 2,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  typeLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  messageInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    fontSize: 14,
    color: '#333333',
    height: 120,
    marginBottom: 16,
  },
  helpBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBF5FB',
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  helpText: {
    flex: 1,
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
