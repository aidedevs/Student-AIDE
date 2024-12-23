import CustomButton from "@/components/button";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FormErrors {
  semester?: string;
  address?: string;
  note?: string;
  cgpa?: string;
}

interface JoinForm {
  semester: string;
  address: string;
  note: string;
  cgpa: string;
}

const Page = () => {
  const { top } = useSafeAreaInsets();
  const { userProfile: user } = useUserProfile();
  const router = useRouter();
  const [form, setForm] = useState<JoinForm>({
    semester: "",
    address: "",
    note: "",
    cgpa: "",
  });
  const joinWriters = useMutation(api.writers.joinWriters);
  const data = useQuery(api.writers.getApplicationById, {
    userId: user?._id as Id<"users">,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!form.semester.trim()) {
      newErrors.semester = "Current semester is required";
      isValid = false;
    }

    if (!form.address) {
      newErrors.address = "Current address is required";
      isValid = false;
    }
    if (!form.cgpa) {
      newErrors.cgpa = "Current CGPA is required";
      isValid = false;
    }

    if (!form.note.trim()) {
      newErrors.note = "This field is required";
      isValid = false;
    } else if (form.note.length > 500) {
      newErrors.note = "Field must be at most 500 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        setIsLoading(true);
        await joinWriters({
          semester: form.semester,
          address: form.address,
          cgpa: form.cgpa,
          note: form.note,
          userId: user?._id as Id<"users">,
        });
        setIsLoading(false);
        router.dismiss();
      } else {
        Alert.alert("Error", "Please all required fields.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (data && data?.status === "Pending") {
    return (
      <View style={styles.reviewContainer}>
        <Fontisto name="preview" size={45} color="grey" />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Your application is under review.
        </Text>
        <Text style={{ fontSize: 16 }}>
          Please wait for the admin's approval.
        </Text>
        <CustomButton label="Go Back" onPress={() => router.dismiss()} />
      </View>
    );
  }
  return (
    <ScrollView style={[styles.container]}>
      <View style={{ flex: 1, paddingVertical: top + 6 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Become a Writer</Text>
          <TouchableOpacity onPress={() => router.dismiss()}>
            <Ionicons name="close" size={26} color="#374151" />
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name & Course</Text>
          <TextInput
            style={[
              styles.input,
              { color: Colors.paragraph, textTransform: "uppercase" },
            ]}
            value={user?.name}
            readOnly={true}
          />
          <TextInput
            style={[
              styles.input,
              { color: Colors.paragraph, textTransform: "uppercase" },
            ]}
            value={user?.course}
            readOnly={true}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Current Address</Text>

          <TextInput
            style={[styles.input, errors.address ? styles.inputError : {}]}
            value={form.address}
            onChangeText={(text) => setForm({ ...form, address: text })}
            placeholder="Enter your current address"
          />

          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Current Semester</Text>
          <TextInput
            style={[styles.input, errors.semester ? styles.inputError : {}]}
            value={form.semester}
            maxLength={1}
            onChangeText={(text) => setForm({ ...form, semester: text })}
            placeholder="Current semester"
          />
          {errors.semester && (
            <Text style={styles.errorText}>{errors.semester}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Current CGPA</Text>
          <TextInput
            style={[styles.input, errors.cgpa ? styles.inputError : {}]}
            value={form.cgpa}
            onChangeText={(text) => setForm({ ...form, cgpa: text })}
            placeholder="Enter current CGPA"
            maxLength={4}
          />
          {errors.cgpa && <Text style={styles.errorText}>{errors.cgpa}</Text>}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Why do you want to join? </Text>
          <TextInput
            style={[styles.input, errors.cgpa ? styles.inputError : {}]}
            value={form.note}
            onChangeText={(text) => setForm({ ...form, note: text })}
            placeholder="Your reasons should not be more than 500 characters"
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={Colors.lightGray1}
          />
          {errors.note && <Text style={styles.errorText}>{errors.note}</Text>}
        </View>

        <CustomButton
          label="Submit"
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#374151",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginBottom: 8,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  reviewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
});
