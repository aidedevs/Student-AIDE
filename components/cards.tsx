import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

import { icons } from "@/assets";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { formatDateTime, getFormattedDateByMDY } from "@/utils";
import { Avatar } from "./header";

export const renderItem = ({ item }: { item: any }) => (
  <Link href={`(modal)/news-event/${item?.id}?cat=event`} asChild>
    <TouchableOpacity style={styles.card}>
      <View style={styles.titleDateRow}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {getFormattedDateByMDY(item.activity_date)}
          </Text>
        </View>
      </View>
      <Text numberOfLines={3} style={styles.description}>
        {item.description}
      </Text>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <AntDesign name="rightcircleo" size={16} color="#3C096C" />
          <Text style={styles.footerText}>{item?.category}</Text>
        </View>
        <View style={styles.footerItem}>
          <Ionicons name="location" size={18} color="#3C096C" />
          <Text style={styles.footerText}>{item?.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </Link>
);

export const renderNewsItem = ({ item }: { item: any }) => (
  <Link href={`(modal)/news-event/${item?.id}?cat=news`} asChild>
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <View style={[styles.dateContainer, { marginTop: Theme.SPACING.sm }]}>
          <Text style={styles.date}>
            {getFormattedDateByMDY(item.created_at)}
          </Text>
        </View>
      </View>
      <Image source={item?.image} style={styles.image} />
    </TouchableOpacity>
  </Link>
);

export const renderStudentCenterItem = () => {
  return (
    <View>
      <View style={styles.rowContainer}>
        <Link
          href={"/(protected)/(tabs)/feed/student-center?cat=Article"}
          asChild
        >
          <TouchableOpacity style={styles.studentButton}>
            <Image source={icons.article} style={styles.icon} />
            <Text style={styles.btnText}>Articles</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/(protected)/(tabs)/feed/student-center?cat=Poem"} asChild>
          <TouchableOpacity style={styles.studentButton}>
            <Image source={icons.poem} style={styles.icon} />
            <Text style={styles.btnText}>Poems</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.rowContainer}>
        <Link
          href={"/(protected)/(tabs)/feed/student-center?cat=Achievement"}
          asChild
        >
          <TouchableOpacity style={styles.studentButton}>
            <Image source={icons.achievement} style={styles.icon} />
            <Text style={styles.btnText}>Achievements</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};
export const renderArticleCard = ({ item }: { item: any }) => {
  return (
    <Link href={`(modal)/${item?.id}`} asChild>
      <TouchableOpacity style={styles.articleContainer}>
        <View style={styles.userInfo}>
          <Avatar url={item?.user?.img} isHome={false} size={38} />
          <View>
            <Text style={styles.userName}>{item?.user?.name}</Text>
            <Text style={styles.articleDate}>
              {formatDateTime(item?.created_at)}
            </Text>
          </View>
        </View>
        {item?.image && (
          <View>
            <Image source={item?.image} style={styles.articleImage} />
          </View>
        )}
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text numberOfLines={4} style={styles.description}>
            {item?.content}
          </Text>
          <View style={styles.actionButton}>
            <TouchableOpacity style={styles.btnIcon}>
              <FontAwesome name="heart" size={24} color={Colors.primary} />
              <Text>5K</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnIcon}>
              <FontAwesome5 name="comment" size={24} color="black" />
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export const renderAchievementCard = ({ item }: { item: any }) => {
  return (
    <Link href={`(modal)/${item?.id}`} asChild>
      <TouchableOpacity style={styles.articleContainer}>
        <Image source={item?.image} style={styles.articleImage} />

        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.articleDate}>
            Posted on {formatDateTime(item?.created_at)}
          </Text>
          <Text numberOfLines={4} style={styles.description}>
            {item?.content}
          </Text>
          <View style={styles.actionButton}>
            <TouchableOpacity style={styles.btnIcon}>
              <FontAwesome name="heart" size={24} color={Colors.primary} />
              <Text>5K</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    gap: 6,
  },
  titleDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: Theme.FONT_SIZE.lg,
    fontWeight: "bold",
    color: Colors.black,
    flex: 1,
    marginRight: 8,
  },
  textContainer: {
    width: "70%",
  },
  dateContainer: {
    minWidth: 90,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    fontSize: Theme.FONT_SIZE.md,
  },
  date: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Theme.SPACING.md,
    gap: Theme.SPACING.md,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#3C096C20",
    borderRadius: Theme.BORDER_RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  footerText: {
    fontSize: Theme.FONT_SIZE.sm,
    color: Colors.primary,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  image: {
    width: "30%",
    height: 80,
    borderRadius: Theme.BORDER_RADIUS.md,
    objectFit: "cover",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  studentButton: {
    width: "48%",
    height: 120,
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 64,
    height: 64,
    resizeMode: "cover",
  },
  btnText: {
    fontSize: Theme.FONT_SIZE.md,
    fontWeight: "bold",
    color: Colors.primary,
  },
  articleContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 8,
    gap: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userName: {
    fontSize: Theme.FONT_SIZE.md,
    fontWeight: "bold",
    color: Colors.black,
  },
  articleDate: {
    fontSize: Theme.FONT_SIZE.sm,
    color: Colors.lightGray2,
    marginTop: 2,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: Theme.BORDER_RADIUS.md,
    objectFit: "cover",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  btnIcon: {
    width: 32,
    height: 32,
    borderRadius: Theme.BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
});
