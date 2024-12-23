import BackButton from "@/components/back-button";
import CustomButton from "@/components/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedbackForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", feedback: "" });
  const sendFeedback = useMutation(api.feedbacks.sendFeedback);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    let valid = true;
    let newErrors = { name: "", email: "", feedback: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!feedback.trim()) {
      newErrors.feedback = "Feedback is required";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsLoading(true);
      await sendFeedback({
        name,
        email,
        feedback,
      });
      setIsLoading(false);
      Alert.alert(
        "Thank you for your feedback!",
        "Your feedback has been submitted successfully."
      );
      setName("");
      setEmail("");
      setFeedback("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <BackButton onPress={() => router.back()} />
            <Text style={styles.title}>Send us your feedback</Text>
          </View>

          <TextInput
            style={[styles.input, errors.name ? styles.errorBorder : null]}
            placeholder="Your Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}

          <TextInput
            style={[styles.input, errors.email ? styles.errorBorder : null]}
            placeholder="Your Email"
            value={email}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <TextInput
            style={[
              styles.textArea,
              errors.feedback ? styles.errorBorder : null,
            ]}
            placeholder="Your Feedback"
            value={feedback}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setFeedback(text)}
          />
          {errors.feedback ? (
            <Text style={styles.errorText}>{errors.feedback}</Text>
          ) : null}

          <CustomButton
            label="Submit"
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </ScrollView>
      </View>

      <StatusBar style="dark" backgroundColor="white" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorBorder: {
    borderColor: "red",
  },
});

export default FeedbackForm;
