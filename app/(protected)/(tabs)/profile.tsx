import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/assets";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Theme from "@/constants/Theme";
import { Colors } from "@/constants/Colors";

type ProfileScreenProps = {
  name: string;
  department: string;
  grade: number;
  year: number;
};

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const user = {
    name: "Kwame Amankwah",
    department: "Business Administration",
    grade: 3.02,
    year: 2,
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#d6cea2", "#fff", "#fff", "#fff", "#fff"]}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={[styles.container, { paddingTop: "20%" }]}
          >
            <View style={styles.profileContainer}>
              <Image source={images.user} style={styles.profileImage} />
              <TouchableOpacity style={styles.uploadIcon}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userDepartment}>{user.department}</Text>
            </View>

            {/* Grade and Year Section */}
            <View style={styles.infoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>{user.grade}</Text>
                <Text style={styles.infoLabel}>Grade</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>{user.year}</Text>
                <Text style={styles.infoLabel}>Year</Text>
              </View>
            </View>

            {/* Menu Options */}
            <View style={styles.menuContainer}>
              {[
                "Student Center",
                "Complaints",
                "Notification",
                "Edit Account",
                "Settings and Privacy",
                "Help",
              ].map((menuItem) => (
                <TouchableOpacity key={menuItem} style={styles.menuItem}>
                  <Text style={styles.menuText}>{menuItem}</Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color="grey"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </LinearGradient>
      </View>

      <StatusBar backgroundColor="#d6cea2" style="dark" />
    </>
  );
};

export default ProfileScreen;

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
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: Theme.FONT_SIZE.xl - 4,
    fontWeight: "bold",
    marginTop: Theme.SPACING.sm + 2,
  },
  userDepartment: {
    fontSize: Theme.FONT_SIZE.md - 2,
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
});
