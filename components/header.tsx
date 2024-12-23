import images from "@/assets";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getFormattedDate } from "@/utils";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Avatar = ({
  url,
  isHome,
  size,
  isUri = true,
}: {
  url: string;
  isHome?: boolean;
  size?: number;
  isUri?: boolean;
}) => {
  return (
    <View
      style={[
        styles.profileContainer,
        !isHome && { borderColor: Colors.primary },
        size ? { width: size, height: size, borderWidth: 2 } : {},
      ]}
    >
      <Image
        source={isUri ? { uri: url } : images.user}
        style={styles.profile}
      />
    </View>
  );
};

export default function Header({ isHome = true }: { isHome?: boolean }) {
  const { userProfile } = useUserProfile();
  const user = userProfile;
  const today = getFormattedDate(new Date());
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={[
            styles.userCard,
            !isHome && { backgroundColor: Colors.bgSecondary },
          ]}
        >
          <Avatar
            url={user?.img ? user.img : images.user}
            isUri={!!user?.img}
            isHome={isHome}
          />
          <View>
            <Text
              numberOfLines={1}
              style={[styles.userName, !isHome && { color: Colors.black }]}
            >
              {user?.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.course, !isHome && { color: Colors.black }]}
            >
              {user?.course || "N/A"}
            </Text>
          </View>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={20}
            color={isHome ? "white" : Colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          {isHome && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => router.push("/(protected)/search")}
            >
              <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.icon}
            onPress={() => router.push("/(modal)/notification")}
          >
            <Ionicons name="notifications" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {isHome && (
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.todayText}>Today</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.todayDate}>{today}</Text>
              <Ionicons name="briefcase" size={24} color="black" />
            </View>
          </View>
          <View>
            <Link href={"/(protected)/(modal)/create-task"} asChild>
              <TouchableOpacity style={styles.task}>
                <Ionicons name="checkbox" size={24} color="black" />
                <Text style={styles.taskText}>New Task</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 20 },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.SPACING.md - 4,
    backgroundColor: Colors.primaryDark,
    borderRadius: Theme.BORDER_RADIUS.md + 2,
    paddingVertical: Theme.SPACING.md - 4,
    gap: Theme.SPACING.sm,
    flex: 1,
  },
  profileContainer: {
    width: 44,
    height: 44,
    display: "flex",
    flexDirection: "row",
    borderRadius: Theme.BORDER_RADIUS.full,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  profile: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: Theme.BORDER_RADIUS.full,
  },
  userName: {
    fontSize: Theme.FONT_SIZE.md,
    fontWeight: "bold",
    color: Colors.white,
  },
  course: {
    fontSize: Theme.FONT_SIZE.sm,
    color: Colors.white,
    marginTop: 4,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 8,
    gap: 6,
  },
  icon: {
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: Theme.BORDER_RADIUS.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightGray1,
    width: 40,
    height: 40,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    gap: 16,
    marginTop: Theme.SPACING.lg,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  todayText: {
    fontSize: Theme.FONT_SIZE.xxl,
    fontWeight: "bold",
    color: Colors.black,
  },
  todayDate: {
    fontSize: Theme.FONT_SIZE.lg + 2,
    color: Colors.black,
  },
  task: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: Theme.BORDER_RADIUS.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray1,
    justifyContent: "center",
    gap: 4,
  },
  taskText: {
    fontSize: Theme.FONT_SIZE.md,
    fontWeight: "bold",
    color: Colors.black,
    marginLeft: 8,
  },
});
