import { eventsData, newsData } from "@/assets/dummyData";
import ViewDetailPage from "@/components/view-detail";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import {
  formatDateTime,
  getFormattedDate,
  getFormattedFullDate,
} from "@/utils";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface NewsProps {
  id?: string | number;
  created_at: Date;
  content: string;
}
const NewsView = ({ id, content, created_at }: NewsProps) => {
  return (
    <View>
      <Text style={styles.metadata}>
        Posted on {formatDateTime(created_at)}
      </Text>
      <Text style={styles.paragraph}>{content}</Text>
      <Text style={styles.paragraph}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    </View>
  );
};

interface EventProps {
  id?: string | number;
  activity_date: Date;
  content: string;
  category: string;
  location: string;
  organize_by: string;
}
const EventView = ({
  id,
  content,
  activity_date,
  location,
  organize_by,
  category,
}: EventProps) => {
  return (
    <View>
      <View style={styles.topContainer}>
        <View style={styles.dateContainer}>
          <Feather name="calendar" size={20} color="#3C096C" />
          <Text style={styles.date}>{getFormattedFullDate(activity_date)}</Text>
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
          <Text style={styles.date}>{organize_by}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>{content}</Text>
      </View>
    </View>
  );
};

export default function Page() {
  const { id, cat } = useLocalSearchParams();

  const data: any =
    cat === "news"
      ? newsData.find((el) => el.id === id)
      : eventsData.find((el) => el.id === id);
  const router = useRouter();

  return (
    <ViewDetailPage
      image={data?.image}
      title={data?.title!}
      onPress={() => router.back()}
    >
      {cat === "news" && (
        <NewsView
          id={data?.id}
          content={data?.description!}
          created_at={new Date(data?.created_at!)}
        />
      )}

      {cat === "event" && (
        <EventView
          id={data?.id}
          content={data?.description!}
          activity_date={new Date(data?.activity_date!)}
          location={data?.location!}
          organize_by={data?.organize_by!}
          category={data?.category}
        />
      )}
    </ViewDetailPage>
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
