import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import CustomButton from "@/components/button";

interface FormErrors {
  title?: string;
  priority?: string;
  due_date?: string;
  description?: string;
}

interface TaskForm {
  title: string;
  priority: string;
  due_date: Date;
  description: string;
}

const NewTaskScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [form, setForm] = useState<TaskForm>({
    title: "",
    priority: "Medium",
    due_date: new Date(),
    description: "",
  });
  const createTask = useMutation(api.tasks.addNewTask);

  const [errors, setErrors] = useState<FormErrors>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!form.title.trim()) {
      newErrors.title = "Task title is required";
      isValid = false;
    } else if (form.title.length < 3) {
      newErrors.title = "Task tile must be at least 3 characters";
      isValid = false;
    }

    if (!form.priority) {
      newErrors.priority = "Priority is required";
      isValid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      isValid = false;
    }

    const today = new Date();
    if (form.due_date < today) {
      newErrors.due_date = "Date cannot be in the past";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        setIsLoading(true);
        await createTask({
          title: form.title,
          priority: form.priority,
          due_date: new Date(form?.due_date).getTime().toString(),
          description: form.description,
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

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB");
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: "15%" }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>New Task</Text>
        <TouchableOpacity onPress={() => router.dismiss()}>
          <Ionicons name="close" size={26} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={[styles.input, errors.title ? styles.inputError : {}]}
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
          placeholder="Enter task title"
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>priority</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.priority}
            onValueChange={(value) => setForm({ ...form, priority: value })}
          >
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>
        </View>
        {errors.priority && (
          <Text style={styles.errorText}>{errors.priority}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Select Due Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(form.due_date)}</Text>
          <Ionicons
            name="calendar-outline"
            size={24}
            color={Colors.lightGray2}
          />
        </TouchableOpacity>
        {errors.due_date && (
          <Text style={styles.errorText}>{errors.due_date}</Text>
        )}
        {showDatePicker && (
          <DateTimePicker
            value={form.due_date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setForm({ ...form, due_date: selectedDate });
              }
            }}
          />
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Task Description</Text>
        <TextInput
          style={[
            styles.input,
            { height: 100, textAlignVertical: "top" },
            errors.description ? styles.inputError : {},
          ]}
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          placeholder="Enter task description"
          multiline
          numberOfLines={4}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}
      </View>

      <CustomButton
        label="Create Task"
        onPress={handleSubmit}
        isLoading={isLoading}
      />
    </ScrollView>
  );
};

export default NewTaskScreen;

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
  dateButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    color: "#374151",
  },
  submitButton: {
    backgroundColor: "#4C1D95",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  fieldContainer: {
    marginBottom: 16,
  },
});
