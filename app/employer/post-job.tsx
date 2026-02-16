import { BigButton } from "@/components/ui/big-button";
import { Dropdown } from "@/components/ui/dropdown";
import { InputField } from "@/components/ui/input-field";
import { Job, useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostJobScreen() {
  const {t, language} = useLanguage();
  const {employerProfile, createContractedJob, mockWorkers} = useApp();

  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfWorkers, setNumberOfWorkers] = useState("1");
  const [urgency, setUrgency] = useState("normal");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const jobTypeOptions = [
    {value: "cleaner", label: t("cleaner")},
    {value: "mason", label: t("mason")},
    {value: "electrician", label: t("electrician")},
    {value: "driver", label: t("driver")},
    {value: "cook", label: t("cook")},
    {value: "plumber", label: t("plumber")},
    {value: "carpenter", label: t("carpenter")},
    {value: "painter", label: t("painter")},
    {value: "other", label: t("otherSkill")},
  ];

  const workerOptions = [
    {value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"},
    {value: "5", label: "5"},
    {value: "5+", label: "5+"},
  ];

  const urgencyOptions = [
    {value: "normal", label: t("normal")},
    {value: "urgent", label: t("urgent")},
  ];

  const payment = parseFloat(paymentAmount) || 0;
  const platformFee = Math.round(payment * 0.05 * 100) / 100;
  const numWorkers = parseInt(numberOfWorkers) || 1;
  const smsCost = numWorkers * 0.5; // ৳0.50 per SMS
  const totalDeduction = platformFee + smsCost;

  const handlePostJobClick = () => {
    if (!jobType || !location || !paymentAmount) {
      Alert.alert(
        language === "bn" ? "ত্রুটি" : "Error",
        language === "bn"
          ? "সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন"
          : "Please fill in all required fields",
      );
      return;
    }

    const payment = parseFloat(paymentAmount);
    if (isNaN(payment) || payment <= 0) {
      Alert.alert(
        language === "bn" ? "ত্রুটি" : "Error",
        language === "bn"
          ? "কাজের পরিমাণ বৈধ হতে হবে"
          : "Payment amount must be a valid positive number",
      );
      return;
    }

    if (totalDeduction > (employerProfile?.wallet || 0)) {
      Alert.alert(
        language === "bn" ? "ত্রুটি" : "Error",
        language === "bn"
          ? "আপনার ওয়ালেটে যথেষ্ট ভারসাম্য নেই"
          : "Insufficient wallet balance for platform fee and SMS costs",
      );
      return;
    }

    // Show confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmJob = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    try {
      // Select workers for SMS notification
      const selectedWorkers = mockWorkers.slice(
        0,
        Math.min(numWorkers, mockWorkers.length),
      );

      const job: Job = {
        id: Date.now().toString(),
        employerId: employerProfile?.id || "",
        jobType: jobType,
        location: location,
        numberOfWorkers: numWorkers,
        urgency: urgency as "normal" | "urgent",
        paymentAmount: payment,
        platformFee: platformFee,
        smsCost: smsCost,
        selectedCandidates: selectedWorkers.map((w) => w.id),
        status: "pending_confirmation",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      };

      const success = await createContractedJob(job);

      setLoading(false);

      if (success) {
        Alert.alert(
          t("jobPosted"),
          language === "bn"
            ? "আপনার কাজ সফলভাবে পোস্ট করা হয়েছে"
            : "Your job has been posted successfully",
          [{text: "OK", onPress: () => router.push("/employer/dashboard")}],
        );
      } else {
        Alert.alert(
          language === "bn" ? "ত্রুটি" : "Error",
          language === "bn"
            ? "কাজ পোস্ট করতে ব্যর্থ"
            : "Failed to post job. Please check your balance.",
        );
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(language === "bn" ? "ত্রুটি" : "Error", "An error occurred");
    }
  };

  const handleCancelJob = () => {
    setShowConfirmModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BigButton
          title={t("back")}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
        <Text style={styles.title}>{t("postJob")}</Text>
        <View style={{width: 80}} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="megaphone-outline" size={60} color="#2E7D32" />
        </View>

        <Dropdown
          label={t("jobType")}
          placeholder={t("selectJobType")}
          options={jobTypeOptions}
          value={jobType}
          onSelect={setJobType}
        />

        <InputField
          label={t("location")}
          placeholder={t("enterLocation")}
          value={location}
          onChangeText={setLocation}
        />

        <Dropdown
          label={t("numberOfWorkers")}
          placeholder="1"
          options={workerOptions}
          value={numberOfWorkers}
          onSelect={setNumberOfWorkers}
        />

        <Dropdown
          label={t("urgency")}
          placeholder={t("normal")}
          options={urgencyOptions}
          value={urgency}
          onSelect={setUrgency}
        />

        <InputField
          label={t("paymentAmount")}
          placeholder={t("enterPaymentAmount")}
          value={paymentAmount}
          onChangeText={setPaymentAmount}
          keyboardType="decimal-pad"
        />

        {paymentAmount && (
          <View style={styles.feesCard}>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>
                {language === "bn" ? "কাজের পরিমাণ" : "Payment"}
              </Text>
              <Text style={styles.feeValue}>৳{payment.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>
                {language === "bn"
                  ? "প্ল্যাটফর্ম ফি (৫%)"
                  : "Platform Fee (5%)"}
              </Text>
              <Text style={styles.feeValue}>৳{platformFee.toFixed(2)}</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>
                {language === "bn" ? "SMS খরচ" : "SMS Cost"}
              </Text>
              <Text style={styles.feeValue}>৳{smsCost.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.feeRow}>
              <Text style={styles.feeLabelTotal}>
                {language === "bn" ? "মোট খরচ" : "Total Deduction"}
              </Text>
              <Text style={styles.feeValueTotal}>
                ৳{totalDeduction.toFixed(2)}
              </Text>
            </View>
          </View>
        )}

        {/* Wallet Balance Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Ionicons name="wallet-outline" size={24} color="#2E7D32" />
            <Text style={styles.walletLabel}>
              {language === "bn" ? "ওয়ালেট ব্যালেন্স" : "Wallet Balance"}
            </Text>
          </View>
          <Text style={styles.walletBalance}>
            ৳{employerProfile?.wallet || 0}
          </Text>
        </View>

        {paymentAmount && totalDeduction > (employerProfile?.wallet || 0) && (
          <View style={styles.errorBanner}>
            <Ionicons name="warning-outline" size={20} color="#C62828" />
            <Text style={styles.errorText}>
              {language === "bn"
                ? "ওয়ালেটে অপর্যাপ্ত ব্যালেন্স"
                : "Insufficient wallet balance"}
            </Text>
          </View>
        )}

        {urgency === "urgent" && (
          <View style={styles.urgentBadge}>
            <Ionicons name="flash" size={20} color="#FFFFFF" />
            <Text style={styles.urgentText}>
              {language === "bn"
                ? "জরুরি পোস্ট - দ্রুত দেখা যাবে"
                : "Urgent Post - Higher visibility"}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <BigButton
          title={t("postJobButton")}
          onPress={handlePostJobClick}
          loading={loading}
          disabled={
            !jobType ||
            !location ||
            !paymentAmount ||
            totalDeduction > (employerProfile?.wallet || 0)
          }
        />
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelJob}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language === "bn" ? "নিশ্চিত করুন" : "Confirm Job Post"}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelJob}>
                <Ionicons name="close-circle" size={80} color="#C62828" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmJob}>
                <Ionicons name="checkmark-circle" size={80} color="#2E7D32" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  iconContainer: {
    alignSelf: "center",
    marginBottom: 24,
  },
  feesCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#2E7D32",
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  feeLabel: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  feeValue: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "600",
  },
  feeLabelTotal: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "700",
  },
  feeValueTotal: {
    fontSize: 16,
    color: "#2E7D32",
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  walletCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  walletLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
    marginLeft: 8,
  },
  walletBalance: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1B5E20",
  },
  errorBanner: {
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  errorText: {
    color: "#C62828",
    marginLeft: 8,
    fontWeight: "600",
    flex: 1,
  },
  urgentBadge: {
    backgroundColor: "#FF6600",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  urgentText: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 32,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 40,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});
