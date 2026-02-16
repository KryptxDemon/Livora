// Updated job-matching.tsx - for selecting workers after posting a job

import { BigButton } from "@/components/ui/big-button";
import { WorkerCard } from "@/components/ui/worker-card";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function JobMatchingScreen() {
  const {t, language} = useLanguage();
  const {mockWorkers, employerProfile, jobs} = useApp();
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

  // Get the most recent job (the one just posted)
  const recentJob = jobs[jobs.length - 1];

  const handleSelectWorker = (workerId: string) => {
    setSelectedWorkers((prev) => {
      if (prev.includes(workerId)) {
        return prev.filter((id) => id !== workerId);
      } else {
        return [...prev, workerId];
      }
    });
  };

  const handleConfirmSelection = () => {
    if (selectedWorkers.length === 0) {
      Alert.alert(
        language === "bn" ? "ত্রুটি" : "Error",
        language === "bn"
          ? "কমপক্ষে একজন কর্মী নির্বাচন করুন"
          : "Please select at least one worker",
      );
      return;
    }

    // Show confirmation with SMS cost
    const smsCost = selectedWorkers.length * 0.5;
    Alert.alert(
      language === "bn" ? "নিশ্চিত করুন" : "Confirm",
      language === "bn"
        ? `${selectedWorkers.length} জন কর্মীকে SMS পাঠাবেন? (খরচ: ৳${smsCost.toFixed(2)})`
        : `Send SMS to ${selectedWorkers.length} workers? (Cost: ৳${smsCost.toFixed(2)})`,
      [
        {
          text: language === "bn" ? "বাতিল" : "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: language === "bn" ? "পাঠান" : "Send",
          onPress: () => {
            // SMS will be sent automatically when job was posted
            Alert.alert(
              t("smsSent"),
              language === "bn"
                ? "সকল নির্বাচিত কর্মীদের SMS পাঠানো হয়েছে"
                : "SMS sent to all selected workers",
            );
            router.push("/employer/dashboard");
          },
        },
      ],
    );
  };

  const selectedCount = selectedWorkers.length;

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
        <Text style={styles.title}>{t("nearbyWorkers")}</Text>
        <View style={{width: 80}} />
      </View>

      {/* Job Details Card */}
      {recentJob && (
        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>{recentJob.jobType}</Text>
            <Text style={styles.jobLocation}>{recentJob.location}</Text>
          </View>
          <View style={styles.jobDetails}>
            <View style={styles.jobDetail}>
              <Text style={styles.jobLabel}>
                {language === "bn" ? "অর্থ" : "Payment"}:
              </Text>
              <Text style={styles.jobValue}>৳{recentJob.paymentAmount}</Text>
            </View>
            <View style={styles.jobDetail}>
              <Text style={styles.jobLabel}>
                {language === "bn" ? "কর্মী" : "Workers"}:
              </Text>
              <Text style={styles.jobValue}>{recentJob.numberOfWorkers}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Selection Info */}
      <View style={styles.selectionBar}>
        <Ionicons name="checkmark-done-outline" size={20} color="#2E7D32" />
        <Text style={styles.selectionText}>
          {language === "bn"
            ? `${selectedCount} কর্মী নির্বাচিত`
            : `${selectedCount} workers selected`}
        </Text>
        {selectedCount > 0 && (
          <Text style={styles.smsCostText}>
            ৳{(selectedCount * 0.5).toFixed(2)} SMS
          </Text>
        )}
      </View>

      <FlatList
        data={mockWorkers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <View style={styles.workerSelectContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                selectedWorkers.includes(item.id) && styles.checkboxChecked,
              ]}
              onPress={() => handleSelectWorker(item.id)}>
              {selectedWorkers.includes(item.id) && (
                <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <WorkerCard
                worker={item}
                onPress={() => handleSelectWorker(item.id)}
                showActions={false}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={60} color="#9E9E9E" />
            <Text style={styles.emptyText}>
              {language === "bn"
                ? "কোনো কর্মী পাওয়া যায়নি"
                : "No workers found"}
            </Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <BigButton
          title={
            language === "bn" ? "নির্বাচন নিশ্চিত করুন" : "Confirm Selection"
          }
          onPress={handleConfirmSelection}
          disabled={selectedCount === 0}
          icon="checkmark-circle-outline"
        />
      </View>
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
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
  },
  jobCard: {
    backgroundColor: "#E8F5E9",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#2E7D32",
  },
  jobHeader: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
    textTransform: "capitalize",
  },
  jobLocation: {
    fontSize: 14,
    color: "#2E7D32",
    marginTop: 4,
  },
  jobDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  jobDetail: {
    alignItems: "center",
  },
  jobLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  jobValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
  },
  selectionBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  selectionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
    marginLeft: 8,
    flex: 1,
  },
  smsCostText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F57C00",
  },
  listContent: {
    padding: 16,
  },
  workerSelectContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
    marginTop: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});
