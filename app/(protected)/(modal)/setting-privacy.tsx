import BackButton from "@/components/back-button";
import PrivacyPolicy from "@/components/privacy-policy";
import TermsAndConditions from "@/components/ters-conditions";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useMutation } from "convex/react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsPrivacy = () => {
  const { userProfile: user } = useUserProfile();
  const router = useRouter();
  const [isDataSharingEnabled, setDataSharingEnabled] = useState(
    user?.isDataSharing || false
  );
  const [contentPreferences, setContentPreferences] = useState("All Content");
  const [isPrivacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);
  const [isTermsVisible, setTermsVisible] = useState(false);
  const { top } = useSafeAreaInsets();
  const updateUser = useMutation(api.users.updateProfile);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => console.log("Account Deleted") },
      ]
    );
  };

  const handleChanges = async (value: boolean) => {
    setDataSharingEnabled(value);
    await updateUser({ _id: user?._id as Id<"users">, isDataSharing: value });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Privacy Settings",
          headerLeft: () => <BackButton onPress={() => router.back()} />,
        }}
      />
      <ScrollView style={[styles.container, { paddingTop: top }]}>
        <View style={styles.sectionContainer}>
          <View>
            <View style={[styles.itemContainer, { marginBottom: 0 }]}>
              <Text style={styles.itemLabel}>Data Sharing</Text>
              <Switch
                trackColor={{ false: "#767577", true: Colors.primaryDark }}
                thumbColor={
                  isDataSharingEnabled ? Colors.primary : Colors.white1
                }
                ios_backgroundColor="#3e3e3e"
                value={isDataSharingEnabled}
                onValueChange={(value) => handleChanges(value)}
                style={styles.switch}
              />
            </View>
            <Text style={styles.paragraph}>
              Toggle options for sharing data with third-party services or
              university partners. This may include personal information.
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => setPrivacyPolicyVisible(true)}
          >
            <Text style={styles.itemLabel}>Privacy Policy</Text>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>
        </View>

        {/* Content Management */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Content Management</Text>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => console.log("Content Preferences Clicked")}
          >
            <Text style={styles.itemLabel}>Content Preferences</Text>
            <Text style={styles.itemValue}>{contentPreferences}</Text>
          </TouchableOpacity>
        </View>

        {/* Grading Privacy */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Grading Privacy</Text>
          <Text style={styles.itemLabel}>
            Grades can only be seen by you (student).
          </Text>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => setTermsVisible(true)}
          >
            <Text style={styles.itemLabel}>Terms and Conditions</Text>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>
        </View>

        {/* Delete Account */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Policy Modal */}
        <PrivacyPolicy
          isVisible={isPrivacyPolicyVisible}
          setVisible={setPrivacyPolicyVisible}
        />

        {/* Terms and Conditions Modal */}
        <TermsAndConditions
          isVisible={isTermsVisible}
          setVisible={setTermsVisible}
        />
      </ScrollView>

      <StatusBar backgroundColor="white" style="dark" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemLabel: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 14,
    color: "#666",
  },
  readMore: {
    fontSize: 12,
    color: "#007BFF",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 14,
    color: Colors.paragraph,
    lineHeight: 20,
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
});

export default SettingsPrivacy;
