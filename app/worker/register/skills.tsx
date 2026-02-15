import { BigButton } from "@/components/ui/big-button";
import { InputField } from "@/components/ui/input-field";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { SkillCard } from "@/components/ui/skill-card";
import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const TOTAL_STEPS = 7;

interface SkillOption {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  labelKey: string;
}

const skillOptions: SkillOption[] = [
  {id: "cleaner", icon: "sparkles-outline", labelKey: "cleaner"},
  {id: "mason", icon: "construct-outline", labelKey: "mason"},
  {id: "electrician", icon: "flash-outline", labelKey: "electrician"},
  {id: "driver", icon: "car-outline", labelKey: "driver"},
  {id: "cook", icon: "restaurant-outline", labelKey: "cook"},
  {id: "plumber", icon: "water-outline", labelKey: "plumber"},
  {id: "carpenter", icon: "hammer-outline", labelKey: "carpenter"},
  {id: "painter", icon: "color-palette-outline", labelKey: "painter"},
  {id: "gardener", icon: "leaf-outline", labelKey: "gardener"},
  {id: "security", icon: "shield-outline", labelKey: "security"},
  {id: "other", icon: "add-circle-outline", labelKey: "otherSkill"},
];

export default function SkillsScreen() {
  const {t} = useLanguage();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [skillDescription, setSkillDescription] = useState("");

  const toggleSkill = (skillId: string) => {
    if (skillId === "other") {
      setShowCustomInput(!showCustomInput);
      if (selectedSkills.includes("other")) {
        setSelectedSkills((prev) => prev.filter((s) => s !== "other"));
        setCustomSkill("");
      } else {
        setSelectedSkills((prev) => [...prev, "other"]);
      }
      return;
    }

    setSelectedSkills((prev) => {
      if (prev.includes(skillId)) {
        return prev.filter((s) => s !== skillId);
      }
      return [...prev, skillId];
    });
  };

  const showSkillDescriptionDialog =
    selectedSkills.length > 0 && !selectedSkills.includes("other");
  const handleNext = async () => {
    await AsyncStorage.setItem(
      "@livora_reg_skills",
      JSON.stringify(selectedSkills),
    );
    if (customSkill) {
      await AsyncStorage.setItem("@livora_reg_customSkill", customSkill);
      await AsyncStorage.setItem("@livora_reg_skill_info", customSkill);
    } else {
      await AsyncStorage.setItem("@livora_reg_skill_info", skillDescription);
    }
    router.push("/worker/register/experience");
  };

  const isValid =
    selectedSkills.length > 0 &&
    (!selectedSkills.includes("other") || customSkill.trim().length > 0);

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps steps={TOTAL_STEPS} currentStep={3} />

      <View style={styles.header}>
        <BigButton
          title={t("back")}
          onPress={() => router.back()}
          variant="outline"
          size="small"
          icon="arrow-back"
        />
        <Text style={styles.title}>{t("selectSkills")}</Text>
        <View style={{width: 80}} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.skillsGrid}>
          {skillOptions.map((skill) => (
            <SkillCard
              key={skill.id}
              icon={skill.icon}
              label={t(skill.labelKey as any)}
              selected={selectedSkills.includes(skill.id)}
              onPress={() => toggleSkill(skill.id)}
            />
          ))}
        </View>

        {showCustomInput && (
          <View style={styles.customInputContainer}>
            <Text style={styles.customInputLabel}>{t("enterOtherSkill")}</Text>
            <TextInput
              style={styles.customInput}
              value={customSkill}
              onChangeText={setCustomSkill}
              placeholder={t("enterOtherSkill")}
              placeholderTextColor="#9E9E9E"
            />
          </View>
        )}
        {showSkillDescriptionDialog && (
          <View style={styles.customInputContainer}>
            <InputField
              label={t("skillDescription")}
              placeholder={t("skillDescription")}
              value={skillDescription}
              onChangeText={setSkillDescription}
              multiline
              numberOfLines={4}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <BigButton
          title={t("next")}
          onPress={handleNext}
          disabled={!isValid}
          icon="arrow-forward-outline"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
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
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  customInputContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  customInputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  customInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333333",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
