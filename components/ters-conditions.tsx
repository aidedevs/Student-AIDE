import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const termsContent = `Terms and Conditions

Welcome to [Student AIDE App]. By using our application, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully. If you do not agree to these terms, please do not use our services.

1. Acceptance of Terms
By accessing and using [Student AIDE App], you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, along with our Privacy Policy.

2. User Responsibilities
Users are responsible for maintaining the confidentiality of their account details and for all activities conducted under their account. Any misuse of the app, including unauthorized access or sharing of information, is strictly prohibited.

3. Privacy and Data Usage
We prioritize user privacy and ensure that personal data collected is securely stored and used in compliance with our Privacy Policy. We will not share your data without consent except as required by law.

4. Intellectual Property
All content, features, and functionalities available on [Student AIDE App] are the intellectual property of [Your Company Name]. Unauthorized use, reproduction, or distribution of any content is prohibited.

5. Limitation of Liability
[Student AIDE App] shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.

6. Amendments
We reserve the right to amend these terms at any time. Continued use of the app after changes are made constitutes acceptance of the new terms.

7. Contact Us
If you have any questions or concerns about these terms, please contact us at [support email].`;

interface TermsProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TermsAndConditions({
  isVisible,
  setVisible,
}: TermsProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalContainer}>
          <View style={styles.itemContainer}>
            <Text style={styles.modalTitle}>Terms and Conditions</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Ionicons name="close" size={24} color={"grey"} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalContent}>{termsContent}</Text>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
});
