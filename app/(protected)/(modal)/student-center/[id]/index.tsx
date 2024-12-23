import { useQuery } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Avatar } from "@/components/header";
import ViewDetailPage from "@/components/view-detail";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatDateTime } from "@/utils";
import Loader from "@/components/loader";

const Page = () => {
  const { id } = useLocalSearchParams();
  const data = useQuery(api.studentCenter.getPostById, {
    postId: id as Id<"studentCenters">,
  });
  const router = useRouter();

  const createdAt = new Date(data?._creationTime!).toString();

  if (!data) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }
  return (
    <ViewDetailPage
      image={data?.image!}
      title={data?.title!}
      onPress={() => router.back()}
    >
      <Text style={styles.metadata}>
        Posted on {data?._creationTime && formatDateTime(new Date(createdAt))}
      </Text>

      <Text style={styles.paragraph}>{data?.content}</Text>

      {data?.category !== "Achievement" && (
        <View style={styles.writer}>
          {data?.creator?.img && (
            <Avatar url={data?.creator?.img} isHome={false} size={44} />
          )}

          <View>
            <Text style={styles.username}>
              {data?.creator?.name}
              <Text
                style={{ fontSize: 12, fontWeight: "light", marginLeft: 2 }}
              >
                {"  (Writer)"}
              </Text>
            </Text>
            <Text style={styles.course}>{data?.creator?.course}</Text>
          </View>
        </View>
      )}
    </ViewDetailPage>
  );
};

const styles = StyleSheet.create({
  metadata: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: Theme.FONT_SIZE.md,
    lineHeight: Theme.SPACING.lg,
    color: Colors.paragraph,
    marginBottom: 16,
  },
  writer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Theme.SPACING.lg - 4,
  },
  username: {
    fontSize: Theme.FONT_SIZE.md,
    fontWeight: "bold",
    color: Colors.black,
    marginLeft: 4,
  },
  course: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
