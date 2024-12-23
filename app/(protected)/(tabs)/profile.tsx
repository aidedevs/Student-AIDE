import images from "@/assets";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { formatDateTime } from "@/utils";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Href, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfilePage = () => {
  const { userProfile } = useUserProfile();
  const router = useRouter();
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const generateUploadUrl = useMutation(api.users.generateUploadURL);
  const updateUser = useMutation(api.users.updateProfile);
  const { signOut } = useAuth();

  const user = userProfile;
  const grade = 2;
  const joined = user?._creationTime
    ? formatDateTime(new Date(user?._creationTime!)).toString()
    : "N/A";

  const links = [
    { label: "Resource Center", link: "/(modal)/resource" },
    { label: "Notification", link: "/(modal)/notification" },
    {
      label: "Edit Account",
      link: `(modal)/edit-profile?name=${user?.name ? encodeURIComponent(user?.name) : ""}&gender=${user?.gender ? encodeURIComponent(user?.gender) : ""}&mobile=${user?.phone_number ? encodeURIComponent(user?.phone_number) : ""}&email=${user?.email ? encodeURIComponent(user?.email) : ""}&year=${user?.year ? encodeURIComponent(user?.year) : ""}&course=${user?.course ? encodeURIComponent(user?.course) : ""}&userId=${user?.userId ? encodeURIComponent(user?._id) : ""}`,
    },
    { label: "Article & Poems", link: "/writers" },
    // user?.isApproved ? { label: "Article & Poems", link: "#" } : null,
    { label: "Saved Posts", link: "#" },
    { label: "Settings and Privacy", link: "/(modal)/setting-privacy" },
    { label: "Help", link: "/(modal)/help" },
    { label: "Feedback", link: "/(modal)/feedback" },
  ].filter(Boolean);

  const updateProfilePicture = async () => {
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

    await updateUser({
      _id: user?._id as Id<"users">,
      img: storageId as Id<"_storage">,
    });

    setSelectedImage(null);
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

  const handleLogout = async () => {
    await signOut();
    router.replace("/(public)/sign-in");
  };

  return (
    <View style={{ backgroundColor: "#d6cea2", flex: 1 }}>
      <LinearGradient
        colors={["#d6cea2", "#fff", "#fff", "#fff", "#fff"]}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingTop: "20%" }]}
        >
          <View style={styles.profileContainer}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={user?.img ? { uri: user?.img } : images.user}
                style={styles.profileImage}
              />
            )}
            {selectedImage ? (
              <TouchableOpacity
                style={styles.uploadIcon}
                onPress={updateProfilePicture}
              >
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.uploadIcon} onPress={selectImage}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "NO Name"}</Text>
            <Text style={styles.userDepartment}>{user?.course || "N/A"}</Text>
            <Text>Joined on {joined}</Text>
          </View>

          {/* Grade and Year Section */}
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{grade || "N/A"}</Text>
              <Text style={styles.infoLabel}>Grade</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{user?.year || "N/A"}</Text>
              <Text style={styles.infoLabel}>Year</Text>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.menuContainer}>
            {links.map((el) => (
              <TouchableOpacity
                onPress={() => router.push(el?.link as Href<string>)}
                key={el?.label}
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>{el?.label}</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={18}
                  color="grey"
                />
              </TouchableOpacity>
            ))}

            <View>
              <TouchableOpacity
                onPress={() => signOut()}
                activeOpacity={0.5}
                style={styles.logoutButton}
              >
                <Ionicons name="log-out-outline" color={"#FF0000"} size={28} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <StatusBar translucent backgroundColor="#d6cea2" />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: Theme.SPACING.sm,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: Theme.BORDER_RADIUS.full,
    borderWidth: 4,
    borderColor: Colors.primary, //"#6200ea"
  },
  uploadIcon: {
    position: "absolute",
    right: 100,
    bottom: 10,
    backgroundColor: Colors.white,
    borderRadius: Theme.BORDER_RADIUS.full,
    padding: Theme.SPACING.xs + 1,
  },
  uploadText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "700",
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: Theme.FONT_SIZE.xl - 4,
    fontWeight: "bold",
    marginTop: Theme.SPACING.sm + 2,
  },
  userDepartment: {
    fontSize: Theme.FONT_SIZE.md,
    color: Colors.paragraph,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Theme.SPACING.lg + 4,
  },
  infoBox: {
    alignItems: "center",
    backgroundColor: "white",
    padding: Theme.SPACING.lg - 1,
    borderRadius: Theme.SPACING.sm + 2,
    width: "40%",
    elevation: 2,
  },
  infoText: {
    fontSize: Theme.FONT_SIZE.lg,
    fontWeight: "bold",
  },
  infoLabel: {
    fontSize: 14,
    color: "grey",
  },
  menuContainer: {
    backgroundColor: Colors.white,
    paddingVertical: Theme.SPACING.md - 2,
    borderRadius: Theme.BORDER_RADIUS.md + 2,
    gap: Theme.SPACING.sm,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: Theme.SPACING.md + 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuText: {
    fontSize: 16,
  },
  logoutButton: {
    padding: Theme.SPACING.md,
    borderRadius: Theme.BORDER_RADIUS.full,
    backgroundColor: "#FF000020",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
