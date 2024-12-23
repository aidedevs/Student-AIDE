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

const privacyPolicyContent = `At [Student AIDE App], we take your privacy seriously. This policy outlines the types of information we collect, how we use and protect it, and your rights as a user.

1. Information We Collect
We may collect the following types of information when you use our app:
- Personal Information: Name, email address, student ID, academic data (grades, courses, etc.).
- Usage Data: Information about how you interact with the app, including pages visited and features used.
- Device Information: Data about your device, such as device type, operating system, and unique device identifiers.

2. How We Use Your Information
We use the collected information to:
- Provide and improve our services.
- Personalize your experience and recommend content or resources.
- Maintain the security and integrity of our app.
- Communicate with you regarding updates, support, and promotions.

3. Data Sharing and Disclosure
We do not share your personal information with third parties except:
- When required by law.
- With trusted partners who help us provide the app’s services, under strict confidentiality agreements.

4. Data Security
We implement industry-standard security measures to protect your data. However, no method of transmission or storage is completely secure. While we strive to protect your personal information, we cannot guarantee absolute security.

5. Your Rights
You have the right to:
- Access and review the data we hold about you.
- Request corrections or updates to your personal information.
- Request deletion of your data, subject to legal or contractual obligations.

6. Changes to This Policy
We may update this Privacy Policy periodically. When we do, we will revise the “last updated” date at the top of the policy. Your continued use of the app after such changes indicates your acceptance of the revised policy.

7. Contact Us
If you have questions about our Privacy Policy or wish to exercise your data rights, please contact us at [support email].`;

interface PrivacyProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PrivacyPolicy({ isVisible, setVisible }: PrivacyProps) {
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
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Ionicons name="close" size={24} color={"grey"} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalContent}>{privacyPolicyContent}</Text>
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
