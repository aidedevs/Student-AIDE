import CustomButton from "@/components/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
  name?: string;
  mobile?: string;
  level?: string;
  course?: string;
  email?: string;
  gender?: string;
}

interface ProfileForm {
  name: string;
  mobile: string;
  level: string;
  course: string;
  email: string;
  gender: string;
}

const EditProfile = () => {
  const { name, email, gender, mobile, year, course, userId } =
    useLocalSearchParams<{
      name: "";
      mobile: "";
      email: "";
      gender: "";
      year: "";
      course: "";
      userId: "";
    }>();
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [form, setForm] = useState<ProfileForm>({
    name: name,
    mobile: mobile,
    email: email,
    gender: gender,
    level: year,
    course: course,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const updateUser = useMutation(api.users.updateProfile);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Your name is required";
      isValid = false;
    } else if (form.name.length < 3) {
      newErrors.name = "Your tile must be at least 3 characters";
      isValid = false;
    }

    if (!form.mobile) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    }

    if (!form.gender.trim()) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }
    if (!form.level.trim()) {
      newErrors.level = "Current academic level is required";
      isValid = false;
    }
    if (form.course.length < 10) {
      newErrors.course = "Course of study is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await updateUser({
        _id: userId as Id<"users">,
        name: form.name,
        phone_number: form.mobile,
        gender: form.gender,
        year: Number(form.level),
        course: form.course,
      });

      router.dismiss();
    } else {
      Alert.alert("Error", "Please all required fields.");
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB");
  };

  return (
    <View style={[styles.container, { paddingTop: "15%" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Profile</Text>
          <TouchableOpacity onPress={() => router.dismiss()}>
            <Ionicons name="close" size={26} color="#374151" />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : {}]}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            placeholder="Enter your name"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.gender}
              onValueChange={(value) => setForm({ ...form, gender: value })}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>

          <TextInput
            readOnly={true}
            style={[styles.input, errors.email ? styles.inputError : {}]}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            placeholder="example@ppsu.ac.in"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : {}]}
            value={form.mobile}
            onChangeText={(text) => setForm({ ...form, mobile: text })}
            placeholder="Enter mobile number"
            maxLength={10}
          />
          {errors.mobile && (
            <Text style={styles.errorText}>{errors.mobile}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Academic Kevel</Text>
          <TextInput
            maxLength={1}
            keyboardType="number-pad"
            style={[styles.input, errors.level ? styles.inputError : {}]}
            value={form.level}
            onChangeText={(text) => setForm({ ...form, level: text })}
            placeholder="eg. 2"
          />
          {errors.level && <Text style={styles.errorText}>{errors.level}</Text>}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Programme of Study</Text>
          <TextInput
            style={[styles.input, errors.course ? styles.inputError : {}]}
            value={form.course}
            onChangeText={(text) => setForm({ ...form, course: text })}
            placeholder="eg. Computer Science"
          />
          {errors.course && (
            <Text style={styles.errorText}>{errors.course}</Text>
          )}
        </View>

        <CustomButton label="Update" onPress={handleSubmit} />

        <StatusBar backgroundColor="white" style="dark" />
      </ScrollView>
    </View>
  );
};

export default EditProfile;

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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 16,
  },

  fieldContainer: {
    marginBottom: 16,
  },
});
