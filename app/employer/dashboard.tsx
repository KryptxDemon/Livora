import { BigButton } from "@/components/ui/big-button";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmployerDashboardScreen() {
  const {t, language, setLanguage} = useLanguage();
  const {employerProfile, jobs, clearAllData} = useApp();

  const handleLogout = async () => {
    await clearAllData();
    router.replace("/language-select");
  };

  const toggleLanguage = async () => {
    await setLanguage(language === "bn" ? "en" : "bn");
  };

  const activeJobs = jobs.filter((j) => j.status === "confirmed").length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("home")}</Text>
        <TouchableOpacity
          style={styles.languageToggle}
          onPress={toggleLanguage}>
          <Ionicons name="globe-outline" size={20} color="#1565C0" />
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
              <Ionicons name="business" size={32} color="#1565C0" />
            </View>
            <View style={styles.welcomeInfo}>
              <Text style={styles.welcomeText}>
                {language === "bn" ? "স্বাগতম" : "Welcome"},
              </Text>
              <Text style={styles.welcomeName}>
                {employerProfile?.name || "Employer"}
              </Text>
            </View>
          </View>

          {/* Wallet Balance */}
          <View style={styles.walletRow}>
            <Ionicons name="wallet-outline" size={20} color="#2E7D32" />
            <Text style={styles.walletLabel}>
              {language === "bn" ? "মানিব্যাগ ব্যালেন্স" : "Wallet Balance"}:
            </Text>
            <Text style={styles.walletValue}>
              ৳{employerProfile?.wallet || 0}
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{activeJobs}</Text>
            <Text style={styles.statLabel}>
              {language === "bn" ? "সক্রিয় পোস্ট" : "Active Posts"}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>
              {language === "bn" ? "নিয়োগকৃত" : "Hired"}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          {language === "bn" ? "দ্রুত কার্যক্রম" : "Quick Actions"}
        </Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/employer/post-job")}>
            <View style={[styles.actionIcon, {backgroundColor: "#E8F5E9"}]}>
              <Ionicons name="add-circle-outline" size={28} color="#2E7D32" />
            </View>
            <Text style={styles.actionText}>{t("postJob")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/employer/job-matching")}>
            <View style={[styles.actionIcon, {backgroundColor: "#E3F2FD"}]}>
              <Ionicons name="search-outline" size={28} color="#1565C0" />
            </View>
            <Text style={styles.actionText}>{t("nearbyWorkers")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, {backgroundColor: "#F3E5F5"}]}>
              <Ionicons name="settings-outline" size={28} color="#7B1FA2" />
            </View>
            <Text style={styles.actionText}>{t("settings")}</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Jobs */}
        {jobs.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {language === "bn" ? "সাম্প্রতিক পোস্ট" : "Recent Posts"}
            </Text>
            {jobs.slice(0, 3).map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobType}>{t(job.jobType as any)}</Text>
                  <Text style={styles.jobLocation}>{job.location}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        job.status === "confirmed" ? "#E8F5E9" : "#FFEBEE",
                    },
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          job.status === "confirmed" ? "#2E7D32" : "#C62828",
                      },
                    ]}>
                    {job.status === "confirmed"
                      ? language === "bn"
                        ? "বন্ধ"
                        : "Closed"
                      : language === "bn"
                        ? "সক্রিয়"
                        : "Active"}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

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
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1565C0",
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
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    marginTop: 12,
    paddingTop: 12,
  },
  walletLabel: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
    flex: 1,
  },
  walletValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E3F2FD",
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
  creditsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 12,
  },
  creditsLabel: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  creditsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1565C0",
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
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
    textAlign: "center",
  },
  jobCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  jobInfo: {
    flex: 1,
  },
  jobType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  jobLocation: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  logoutContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
});
