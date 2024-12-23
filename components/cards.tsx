import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/assets";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { formatDateTime } from "@/utils";
import { useMutation } from "convex/react";
import { useState } from "react";
import DeleteDialog from "./delete-dialog";
import { Avatar } from "./header";

type EventProps = {
  item: Doc<"activities">;
};
export const EventCard = ({ item }: EventProps) => (
  <Link href={`(modal)/news-event/${item?._id}?cat=event` as Href} asChild>
    <TouchableOpacity style={styles.card}>
      <View style={styles.titleDateRow}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {new Date(item.activity_date!).toLocaleDateString()}
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

type NewsProps = {
  item: Doc<"news">;
};
export const NewsCard = ({ item }: NewsProps) => {
  return (
    <Link href={`/(modal)/news-event/${item?._id}?cat=news` as Href} asChild>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {item.content}
          </Text>
          <View style={[styles.dateContainer, { marginTop: Theme.SPACING.sm }]}>
            <Text style={styles.date}>
              {new Date(item?._creationTime).toLocaleDateString()}
            </Text>
          </View>
        </View>
        {item?.images && item?.images.length > 0 && (
          <Image source={{ uri: item?.images[0] }} style={styles.image} />
        )}
      </TouchableOpacity>
    </Link>
  );
};

export const StudentCenterItem = () => {
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

type PostCard = {
  post: Doc<"studentCenters"> & { creator: Doc<"users"> };
};

export const PostCard = ({ post }: PostCard) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { userProfile: user } = useUserProfile();
  const likePost = useMutation(api.studentCenter.likePost);
  const savePost = useMutation(api.studentCenter.savePost);
  const deletePost = useMutation(api.studentCenter.deletePostById);

  const createdAt = new Date(post?._creationTime!)?.toString();

  const isLiked = post?.likes?.includes(user?._id!);
  const isSaved = user?.savedPost?.includes(post?._id);

  const handleDelete = async (id: Id<"studentCenters">) => {
    await deletePost({ postId: id });
    setIsDialogVisible(false);
  };

  const handleCancel = () => {
    setIsDialogVisible(false);
  };

  return (
    <>
      <Link
        key={post?._id}
        href={`/(modal)/student-center/${post?._id}`}
        asChild
      >
        <TouchableOpacity style={styles.articleContainer}>
          <View style={styles.headContainer}>
            <View style={styles.userInfo}>
              <Avatar url={post?.creator?.img!} isHome={false} size={38} />
              <View>
                <Text style={styles.userName}>{post?.creator?.name}</Text>
                <Text style={styles.articleDate}>
                  {formatDateTime(new Date(createdAt))}
                </Text>
              </View>
            </View>
            {post?.creator?._id === user?._id && (
              <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>
          {post?.image && (
            <View>
              <Image
                source={{ uri: post?.image }}
                style={styles.articleImage}
              />
            </View>
          )}
          <View>
            <Text style={styles.title}>{post?.title}</Text>
            <Text numberOfLines={4} style={styles.description}>
              {post?.content}
            </Text>
            <View style={styles.actionButton}>
              <TouchableOpacity
                onPress={() => likePost({ postId: post?._id })}
                style={styles.btnIcon}
              >
                <FontAwesome
                  name={isLiked ? "heart" : "heart-o"}
                  size={24}
                  color={Colors.primary}
                />
                <Text>{post?.likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => savePost({ postId: post?._id })}
                style={styles.btnIcon}
              >
                <FontAwesome
                  name={isSaved ? "bookmark" : "bookmark-o"}
                  size={24}
                  color={Colors.paragraph}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Link>

      <DeleteDialog
        visible={isDialogVisible}
        message="Are you sure you want to delete this post?"
        onDelete={() => handleDelete(post?._id)}
        onCancel={handleCancel}
      />
    </>
  );
};

export const AchievementCard = ({ post }: PostCard) => {
  const likePost = useMutation(api.studentCenter.likePost);
  const createdAt = new Date(post?._creationTime!).toString();
  const { userProfile: user } = useUserProfile();

  const isLiked = post?.likes?.includes(user?._id!);

  return (
    <Link href={`/(modal)/student-center/${post?._id}`} asChild>
      <TouchableOpacity style={styles.articleContainer}>
        {post?.image && (
          <Image source={{ uri: post?.image! }} style={styles.articleImage} />
        )}

        <View>
          <Text style={styles.title}>{post?.title}</Text>
          <Text style={styles.articleDate}>
            Posted on {formatDateTime(new Date(createdAt))}
          </Text>
          <Text numberOfLines={4} style={styles.description}>
            {post?.content}
          </Text>
          <View style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => likePost({ postId: post?._id })}
              style={styles.btnIcon}
            >
              <FontAwesome
                name={isLiked ? "heart" : "heart-o"}
                size={24}
                color={Colors.primary}
              />
              <Text>{post?.likeCount}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

// const renderCalendarItem = ({ item }: { item: Doc<"academicCalendar"> }) => {
//   return (
//     // <TouchableOpacity
//     //   style={styles.eventContainer}
//     //   onPress={() => console.log("Event pressed:", item?.event)}
//     // >
//     //   <View style={styles.dateContainer}>
//     //     <Text style={styles.dateText}>
//     //       {formatDate(new Date(item?.date!))}
//     //     </Text>
//     //   </View>
//     //   <View style={styles.eventContent}>
//     //     <View
//     //       style={[
//     //         styles.eventType,
//     //         { backgroundColor: getEventColor(item?.type!) },
//     //       ]}
//     //     />
//     //     <View style={styles.eventDetails}>
//     //       <Text style={styles.eventTitle}>{item.event}</Text>
//     //       {item.description && (
//     //         <Text style={styles.eventDescription}>{item.description}</Text>
//     //       )}
//     //     </View>
//     //   </View>
//     // </TouchableOpacity>
//   );
// };

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
    width: 95,
    // maxWidth: 95,
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
    justifyContent: "space-between",
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
  headContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
