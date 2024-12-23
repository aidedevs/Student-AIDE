import { sampleNotifications } from "@/assets/dummyData";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Notification {
  id: string;
  message: string;
  noti_type: "info" | "warning" | "success" | "error";
  isRead: boolean;
  created_at: Date;
}

const getNotificationIcon = (type: Notification["noti_type"]) => {
  switch (type) {
    case "info":
      return "information-circle";
    case "warning":
      return "warning";
    case "success":
      return "checkmark-circle";
    case "error":
      return "alert-circle";
    default:
      return "notifications";
  }
};

const getNotificationColor = (type: Notification["noti_type"]) => {
  switch (type) {
    case "info":
      return "#2196F3";
    case "warning":
      return "#FF9800";
    case "success":
      return "#4CAF50";
    case "error":
      return "#F44336";
    default:
      return "#757575";
  }
};

const formatDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

const NotificationPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const unreadCount = sampleNotifications.filter((n) => !n.isRead)?.length;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={() => {}}>
            <Text style={styles.markAllButtonText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notification Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Notifications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {sampleNotifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.isRead && styles.unreadNotification,
            ]}
            onPress={() => {}}
          >
            <View style={styles.notificationContent}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={getNotificationIcon(
                    notification.noti_type as
                      | "success"
                      | "warning"
                      | "info"
                      | "error"
                  )}
                  size={24}
                  color={getNotificationColor(
                    notification.noti_type as
                      | "success"
                      | "warning"
                      | "info"
                      | "error"
                  )}
                />
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{notification.message}</Text>
                <Text style={styles.timestamp}>
                  {formatDate(notification.created_at)}
                </Text>
              </View>
              {!notification.isRead && (
                <TouchableOpacity
                  style={styles.readButton}
                  onPress={() => "onMarkAsRead?.(notification.id)"}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  markAllButton: {
    padding: 8,
  },
  markAllButtonText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "600",
  },
  countContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  countText: {
    fontSize: 14,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 0.6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  unreadNotification: {
    backgroundColor: "#f8f8ff",
  },
  notificationContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 16,
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  readButton: {
    padding: 8,
  },
});
