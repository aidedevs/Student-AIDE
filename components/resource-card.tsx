import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Resource } from "@/app/(protected)/(modal)/resource";
import { Ionicons } from "@expo/vector-icons";
import { Doc } from "@/convex/_generated/dataModel";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

const getCategoryColor = (category: Resource["category"]) => {
  switch (category) {
    case "assignment":
      return "#4CAF50";
    case "lecture":
      return "#2196F3";
    case "lab":
      return "#FF9800";
    case "exam":
      return "#F44336";
    default:
      return "#757575";
  }
};
const getFileTypeIcon = (fileType: Resource["file_type"]) => {
  switch (fileType) {
    case "pdf":
      return "document-text";
    case "docx":
      return "document";
    case "pptx":
      return "easel";
    case "xlsx":
      return "grid";
    case "txt":
      return "text";
    case "zip":
      return "archive";
    default:
      return "document";
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const ResourceCard = ({ item }: { item: Doc<"resources"> }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");

  const downloadFile = async (url: string) => {
    try {
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      setIsDownloading(true);
      setDownloadStatus("");

      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        item?.title!,
        `application/${item?.file_type}`
      )
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });

      // const fileUri =
      //   FileSystem?.documentDirectory + `${item?.title}.${item.file_type}`;
      // const { uri } = await FileSystem?.downloadAsync(url, fileUri);

      // setDownloadStatus(`File downloaded to: ${uri}`);
      // console.log(downloadStatus);
    } catch (error) {
      setDownloadStatus("Failed to download file. Please try again.");
      console.error("Error downloading file:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <TouchableOpacity
      key={item._id}
      style={styles.resourceItem}
      onPress={() => "onResourcePress?.(resource)"}
    >
      <View style={styles.resourceContent}>
        <View
          style={[
            styles.resourceIconContainer,
            {
              backgroundColor: getCategoryColor(
                item.category as Resource["category"]
              ),
            },
          ]}
        >
          <Ionicons
            name={getFileTypeIcon(item.file_type as Resource["file_type"])}
            size={20}
            color="#fff"
            style={styles.resourceTypeIcon}
          />
        </View>
        <View style={styles.resourceInfo}>
          <Text style={styles.resourceTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.resourceDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.resourceMeta}>
            <Text style={styles.resourceType}>
              {item?.file_type?.toUpperCase()} •{" "}
              {formatDate(new Date(item?._creationTime))}
            </Text>
          </View>
        </View>
        {isDownloading ? (
          <ActivityIndicator size={18} color="grey" />
        ) : (
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => downloadFile(item?.file!)}
          >
            <Ionicons name="download-outline" size={24} color="#2196F3" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resourceItem: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  resourceContent: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  resourceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  resourceTypeIcon: {
    opacity: 0.9,
  },
  resourceInfo: {
    flex: 1,
    marginRight: 8,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    lineHeight: 18,
  },
  resourceMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  resourceType: {
    fontSize: 12,
    color: "#999",
  },
  downloadButton: {
    padding: 8,
    justifyContent: "center",
  },
});
