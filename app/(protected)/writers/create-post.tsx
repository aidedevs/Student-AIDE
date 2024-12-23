import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import CustomButton from "@/components/button";
import * as ImagePicker from "expo-image-picker";
import { Id } from "@/convex/_generated/dataModel";

interface FormErrors {
  title?: string;
  content?: string;
  image?: string;
  category?: string;
}

interface PostForm {
  title: string;
  content: string;
  image: string;
  category: string;
}

const CreatePost = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [form, setForm] = useState<PostForm>({
    title: "",
    content: "",
    image: "",
    category: "",
  });
  const createPost = useMutation(api.studentCenter.createNewPost);
  const generateUploadUrl = useMutation(api.users.generateUploadURL);

  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!form.title.trim()) {
      newErrors.title = "Post title is required";
      isValid = false;
    } else if (form.title.length < 3) {
      newErrors.title = "Post tile must be at least 3 characters";
      isValid = false;
    }

    if (!form.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (!form.content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    } else if (form.content.length < 10) {
      newErrors.content =
        "Post content must be at least 10 characters and meaningful";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      let imgURL;

      if (validateForm()) {
        setIsLoading(true);
        imgURL = selectedImage && (await uploadImage());

        const data = imgURL
          ? {
              title: form.title,
              category: form.category,
              image: imgURL as Id<"_storage">,
              content: form.content,
            }
          : {
              title: form.title,
              category: form.category,
              content: form.content,
            };
        await createPost(data);
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

  const uploadImage = async () => {
    if (!selectedImage) return;

    const uploadUrl = await generateUploadUrl();

    const response = await fetch(selectedImage!.uri);
    const blob = await response.blob();

    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.mimeType! },
      body: blob,
    });
    const { storageId } = await result.json();

    return storageId;
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: "15%" }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingBottom: 70 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create New Post</Text>
          <TouchableOpacity onPress={() => router.dismiss()}>
            <Ionicons name="close" size={26} color="#374151" />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <TouchableOpacity onPress={selectImage}>
            <View style={styles.imageContainer}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.image}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="camera" size={40} color={"grey"} />
                  <Text style={styles.imageText}>Add Post Image</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Post Title</Text>
          <TextInput
            style={[
              styles.input,
              { fontWeight: "bold", fontSize: 24 },
              errors.title ? styles.inputError : {},
            ]}
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
            placeholder="Add Heading"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.category}
              onValueChange={(value) => setForm({ ...form, category: value })}
            >
              <Picker.Item label="Article" value="Article" />
              <Picker.Item label="Poem" value="Poem" />
            </Picker>
          </View>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[
              styles.input,
              { minHeight: 300, textAlignVertical: "top" },
              errors.content ? styles.inputError : {},
            ]}
            value={form.content}
            onChangeText={(text) => setForm({ ...form, content: text })}
            placeholder="Enter post content"
            multiline
            //   numberOfLines={10}
          />
          {errors.content && (
            <Text style={styles.errorText}>{errors.content}</Text>
          )}
        </View>

        <CustomButton
          label="Create Post"
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

export default CreatePost;

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
  imageContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageText: {
    color: "#374151",
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#374151",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  imagePlaceholder: {
    height: "100%",
    backgroundColor: "#F8F9FC",
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
