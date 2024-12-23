import ViewDetailPage from "@/components/view-detail";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatDateTime, getFormattedFullDate } from "@/utils";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NewsView = ({ id }: { id: string }) => {
  const router = useRouter();
  const data = useQuery(api.news.getNewsById, {
    id: id as Id<"news">,
  });
  if (!data) return null;

  const { _id, title, content, _creationTime } = data;
  const createdAt = new Date(_creationTime).toString();

  return (
    <ViewDetailPage
      title={data?.title}
      image={data?.images[0]!}
      onPress={() => router.dismiss()}
    >
      <View>
        <Text style={styles.metadata}>
          Posted on {formatDateTime(new Date(createdAt)).toString()}
        </Text>
        <Text style={styles.paragraph}>{content}</Text>
      </View>
    </ViewDetailPage>
  );
};

const EventView = ({ id }: { id: string }) => {
  const router = useRouter();
  const data = useQuery(api.events.getEventById, {
    eventId: id as Id<"activities">,
  });

  if (!data) return null;

  const { _id, description, activity_date, location, organized_by, category } =
    data;

  return (
    <ViewDetailPage
      title={data?.title!}
      image={data?.image!}
      onPress={() => router.dismiss()}
    >
      <View>
        <View style={styles.topContainer}>
          <View style={styles.dateContainer}>
            <Feather name="calendar" size={20} color="#3C096C" />
            <Text style={styles.date}>
              {getFormattedFullDate(new Date(activity_date!))}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <AntDesign name="rightcircleo" size={16} color="#3C096C" />
            <Text style={styles.date}>{category}</Text>
          </View>
          <View style={styles.dateContainer}>
            <FontAwesome6 name="location-dot" size={20} color="#3C096C" />
            <Text style={styles.date}>{location}</Text>
          </View>
          <View style={styles.dateContainer}>
            <FontAwesome6 name="users" size={20} color="#3C096C" />
            <Text style={styles.date}>{organized_by}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>{description}</Text>
        </View>
      </View>
    </ViewDetailPage>
  );
};

export default function Page() {
  const { id, cat } = useLocalSearchParams();

  return (
    <>
      {cat === "news" && <NewsView id={id as string} />}

      {cat === "event" && <EventView id={id as string} />}
    </>
  );
}

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
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  dateContainer: {
    width: "auto",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#3C096C20",
    borderRadius: 8,
    fontSize: Theme.FONT_SIZE.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#3C096C20",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3C096C",
  },
  contentContainer: {
    marginTop: Theme.SPACING.md,
  },
});
