import CustomerCareModal from "@/components/customer-care-modal";
import { BigButton } from "@/components/ui/big-button";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WorkerDashboardScreen() {
  const {t, language, setLanguage} = useLanguage();
  const {workerProfile, clearAllData} = useApp();
  const [customerCareVisible, setCustomerCareVisible] = useState(false);
  const [earnings, setEarnings] = useState<null | {
    weeklyIncome: number;
    weeklyCommission: number;
    weeklyNetIncome: number;
    monthlyIncome: number;
    jobsCompleted: number;
    milestoneTarget: number;
    bonusEarned: number;
  }>(null);
  const [loadingEarnings, setLoadingEarnings] = useState(false);

  const handleLogout = async () => {
    await clearAllData();
    router.replace("/language-select");
  };

  const toggleLanguage = async () => {
    await setLanguage(language === "bn" ? "en" : "bn");
  };

  // Helper to format numbers as currency (simple, app-wide formatting can be replaced)
  const formatCurrency = (value: number) => {
    return `৳${value.toFixed(2)}`;
  };

  // Fetch earnings summary from backend API on mount
  useEffect(() => {
    const fetchEarnings = async () => {
      setLoadingEarnings(true);
      try {
        // Example endpoint - replace with your real backend endpoint
        const res = await fetch("/api/worker/earnings");
        if (!res.ok) throw new Error("Failed to fetch earnings");
        const data = await res.json();

        // Data fields expected from API (example):
        // { weeklyIncome, weeklyCommission, weeklyNetIncome, monthlyIncome, jobsCompleted, milestoneTarget, bonusEarned }

        // Ensure numeric values and compute fallbacks if API doesn't provide calculated fields
        const weeklyIncome = Number(data.weeklyIncome) || 0;
        const weeklyCommission =
          data.weeklyCommission !== undefined
            ? Number(data.weeklyCommission)
            : +(weeklyIncome * 0.05);
        const weeklyNetIncome =
          data.weeklyNetIncome !== undefined
            ? Number(data.weeklyNetIncome)
            : +(weeklyIncome - weeklyCommission);

        const monthlyIncome = Number(data.monthlyIncome) || 0;
        const jobsCompleted = Number(data.jobsCompleted) || 0;
        const milestoneTarget = Number(data.milestoneTarget) || 0;

        // Bonus rules: if API returns bonusEarned use it; otherwise compute:
        // If jobsCompleted >= milestoneTarget then bonus = 3% of monthlyIncome
        const bonusEarned =
          data.bonusEarned !== undefined
            ? Number(data.bonusEarned)
            : jobsCompleted >= milestoneTarget
              ? +(monthlyIncome * 0.03)
              : 0;

        setEarnings({
          weeklyIncome,
          weeklyCommission,
          weeklyNetIncome,
          monthlyIncome,
          jobsCompleted,
          milestoneTarget,
          bonusEarned,
        });
      } catch (err) {
        // If fetch fails (no backend during local development), use dummy data
        // so the UI shows a proper summary. Replace/remove this when backend is available.
        console.error('Error fetching earnings, using dummy data:', err);
        const dummy = {
          // weekly example: total earnings for the week
          weeklyIncome: 1500,
          // commission: 5% of weeklyIncome
          weeklyCommission: +(1500 * 0.05),
          // net weekly income after commission
          weeklyNetIncome: +(1500 - 1500 * 0.05),
          // monthly example: total earnings in the month
          monthlyIncome: 7000,
          // number of jobs completed this month
          jobsCompleted: 22,
          // milestone target for bonus
          milestoneTarget: 20,
          // bonus earned: 3% of monthlyIncome if milestone met
          bonusEarned: +(7000 * 0.03),
        };
        setEarnings(dummy);
      } finally {
        setLoadingEarnings(false);
      }
    };
    fetchEarnings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("home")}</Text>
        <TouchableOpacity
          style={styles.languageToggle}
          onPress={toggleLanguage}>
          <Ionicons name="globe-outline" size={20} color="#2E7D32" />
          <Text style={styles.languageText}>
            {language === "bn" ? "EN" : "বাং"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeRow}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={32} color="#2E7D32" />
            </View>
            <View style={styles.welcomeInfo}>
              <Text style={styles.welcomeText}>
                {language === "bn" ? "স্বাগতম" : "Welcome"},
              </Text>
              <Text style={styles.welcomeName}>
                {workerProfile?.name || "User"}
              </Text>
            </View>
          </View>
        </View>

        {/* Earnings Summary - Weekly Commission and Monthly Incentive Bonus */}
        <Text style={styles.sectionTitle}>
          {language === "bn" ? "উপার্জনের সারসংক্ষেপ" : "Earnings Summary"}
        </Text>

        {loadingEarnings ? (
          <View style={[styles.welcomeCard, {alignItems: "center"}]}>
            <ActivityIndicator size="small" color="#2E7D32" />
            <Text style={{marginTop: 8}}>
              {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
            </Text>
          </View>
        ) : (
          earnings && (
            <>
              {/* Weekly Commission Card */}
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>
                  {language === "bn" ? "সাপ্তাহিক কমিশন" : "Weekly Commission"}
                </Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    {language === "bn"
                      ? "মোট সাপ্তাহিক উপার্জন"
                      : "Total Weekly Earnings"}
                  </Text>
                  <Text style={styles.infoValue}>
                    {formatCurrency(earnings.weeklyIncome)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    {language === "bn"
                      ? "কমিশন (৫%)"
                      : "5% Commission Deducted"}
                  </Text>
                  <Text style={styles.infoValue}>
                    {formatCurrency(earnings.weeklyCommission)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    {language === "bn"
                      ? "নিট সাপ্তাহিক উপার্জন"
                      : "Net Weekly Earnings"}
                  </Text>
                  <Text style={[styles.infoValue, {fontWeight: "700"}]}>
                    {formatCurrency(earnings.weeklyNetIncome)}
                  </Text>
                </View>
                {/*
                  Calculation notes:
                  - weeklyCommission defaults to 5% of weeklyIncome when API doesn't provide it.
                  - weeklyNetIncome defaults to weeklyIncome - weeklyCommission when API doesn't provide it.
                */}
              </View>

              {/* Monthly Incentive Bonus Card */}
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>
                  {language === "bn"
                    ? "মাসিক ইনসেনটিভ"
                    : "Monthly Incentive Bonus"}
                </Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    {language === "bn"
                      ? "মোট মাসিক উপার্জন"
                      : "Total Monthly Earnings"}
                  </Text>
                  <Text style={styles.infoValue}>
                    {formatCurrency(earnings.monthlyIncome)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    {language === "bn"
                      ? "এই মাসে সম্পন্ন কাজ"
                      : "Jobs Completed This Month"}
                  </Text>
                  <Text style={styles.infoValue}>{earnings.jobsCompleted}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    {language === "bn"
                      ? "লক্ষ্য (মাইলস্টোন)"
                      : "Milestone Target"}
                  </Text>
                  <Text style={styles.infoValue}>
                    {earnings.milestoneTarget}
                  </Text>
                </View>

                {/* Show bonus section only if bonus exists */}
                {earnings.bonusEarned > 0 ? (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      {language === "bn" ? "পাওয়া বোনাস" : "Bonus Earned"}
                    </Text>
                    <Text
                      style={[
                        styles.infoValue,
                        {color: "#2E7D32", fontWeight: "700"},
                      ]}>
                      {formatCurrency(earnings.bonusEarned)}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      {language === "bn" ? "বোনাস" : "Bonus Earned"}
                    </Text>
                    <Text style={styles.infoValue}>
                      {language === "bn" ? "প্রযোজ্য নয়" : "Not applicable"}
                    </Text>
                  </View>
                )}

                {/*
                  Bonus calculation notes:
                  - If API provides `bonusEarned`, we display it directly.
                  - Otherwise, if jobsCompleted >= milestoneTarget we award 3% of monthlyIncome.
                */}
              </View>
            </>
          )
        )}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          {language === "bn" ? "দ্রুত কার্যক্রম" : "Quick Actions"}
        </Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/worker/profile")}>
            <View style={[styles.actionIcon, {backgroundColor: "#E8F5E9"}]}>
              <Ionicons name="person-outline" size={28} color="#2E7D32" />
            </View>
            <Text style={styles.actionText}>{t("profile")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, {backgroundColor: "#E3F2FD"}]}>
              <Ionicons name="briefcase-outline" size={28} color="#1565C0" />
            </View>
            <Text style={styles.actionText}>{t("jobs")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, {backgroundColor: "#FFF3E0"}]}>
              <Ionicons name="chatbubbles-outline" size={28} color="#EF6C00" />
            </View>
            <Text style={styles.actionText}>{t("messages")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => setCustomerCareVisible(true)}>
            <View style={[styles.actionIcon, {backgroundColor: "#FCE4EC"}]}>
              <Ionicons name="headset-outline" size={28} color="#C2185B" />
            </View>
            <Text style={styles.actionText}>{t("contactCustomerCare")}</Text>
          </TouchableOpacity>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>
            {language === "bn" ? "আপনার স্ট্যাটাস" : "Your Status"}
          </Text>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.statusLabel}>
                {language === "bn" ? "প্রোফাইল সম্পূর্ণ" : "Profile Complete"}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
              <Text style={styles.statusLabel}>
                {language === "bn" ? "যাচাইকৃত" : "Verified"}
              </Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Ionicons name="bulb-outline" size={24} color="#FFC107" />
          <Text style={styles.tipsText}>
            {language === "bn"
              ? "প্রতিদিন অ্যাপ চেক করুন নতুন কাজের জন্য!"
              : "Check the app daily for new job opportunities!"}
          </Text>
        </View>

        <View style={styles.logoutContainer}>
          <BigButton
            title={t("logout")}
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
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  languageToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeInfo: {
    marginLeft: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: "#666666",
  },
  welcomeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666666",
  },
  infoValue: {
    fontSize: 14,
    color: "#333333",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  tipsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFDE7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  tipsText: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    marginLeft: 12,
  },
  logoutContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
});
