import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from "@/components/header";
import { HeaderTitle } from "@/components/header-title";
import NoDataFound from "@/components/no-data-found";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { api } from "@/convex/_generated/api";
import { calculateProgress, getFormattedFullDate } from "@/utils";
import { usePaginatedQuery } from "convex/react";
import { StatusBar } from "expo-status-bar";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Loader from "@/components/loader";

interface SubTasks {
  _id: Id<"subTasks">;
  taskId: Id<"tasks">;
  title: string;
  description?: string;
  due_date?: string;
  completed: boolean;
  _creationTime: number;
}

export interface TaskCardProps {
  _id: Id<"tasks">;
  title: string;
  description?: string;
  due_date?: string;
  completed: boolean;
  subTasks?: SubTasks[];
  _creationTime: number;
  priority?: string;
}

const TasksPage = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.tasks.getUserTasks,
    {},
    { initialNumItems: 5 }
  );
  const [refreshing, setRefreshing] = useState(false);

  const onLoadMore = () => {
    loadMore(5);
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({ item }: { item: TaskCardProps }) => {
    const progress = calculateProgress({
      completed: item?.completed,
      subTasks: item?.subTasks || [],
    });
    const dueDate = new Date(Number(item?.due_date));

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => router.push(`/(modal)/view-task/${item?._id}`)}
      >
        <View style={styles.topContainer}>
          <View style={styles.priorityContainer}>
            <Text style={styles.priority}>{item?.priority}</Text>
          </View>
          <Text numberOfLines={2} style={[styles.title]}>
            {item?.title}
          </Text>
          <View style={styles.infoTags}>
            <View style={styles.tagsContainer}>
              <Text style={[styles.tagText]}>
                Due {getFormattedFullDate(new Date(dueDate))}
              </Text>
            </View>
            {item?.subTasks && item?.subTasks?.length > 0 && (
              <View style={styles.tagsContainer}>
                <Text style={[styles.tagText]}>
                  {item?.subTasks?.length} Sub-Tasks
                </Text>
              </View>
            )}
          </View>
          <Text numberOfLines={1} style={styles.paragraph}>
            {item?.description}
          </Text>
        </View>
        <View>
          <Text style={[styles.progressText]}>Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${progress}%` }]} />
            </View>
            <Text style={[styles.percent]}>{progress}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        data={results as TaskCardProps[]}
        keyExtractor={(item) => item?._id}
        renderItem={renderItem}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            <Header isHome={false} />
            <View style={styles.header}>
              <HeaderTitle title="My Tasks" />
              <TouchableOpacity
                style={styles.task}
                onPress={() => router.push("/(protected)/(modal)/create-task")}
              >
                <Ionicons name="checkbox" size={24} color="black" />
                <Text style={styles.taskText}>New Task</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        contentContainerStyle={{
          paddingVertical: top,
          padding: 20,
          backgroundColor: Colors.white1,
          gap: 16,
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={isLoading ? <></> : <NoDataFound />}
        ListFooterComponent={isLoading ? <Loader /> : <></>}
      />
      <StatusBar backgroundColor="transparent" style="dark" />
    </>
  );
};

export default TasksPage;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 1,
    height: 260,
    width: "100%",
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    height: "80%",
  },
  priorityContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: Theme.BORDER_RADIUS.full,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  priority: {
    fontSize: Theme.FONT_SIZE.sm,
    fontWeight: "700",
    color: Colors.white,
    textTransform: "capitalize",
  },
  title: {
    fontSize: Theme.FONT_SIZE.xl,
    fontWeight: "normal",
    color: Colors.black,
  },
  progressText: {
    color: Colors.black,
    fontWeight: "bold",
    marginBottom: 6,
  },
  progressContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBar: {
    width: "80%",
    height: 8,
    backgroundColor: Colors.white1,
    borderRadius: Theme.BORDER_RADIUS.full,
  },
  progress: {
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: Theme.BORDER_RADIUS.full,
  },
  percent: {
    color: Colors.black,
    fontSize: Theme.FONT_SIZE.sm,
    alignSelf: "flex-end",
    fontWeight: "bold",
  },
  infoTags: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  // tagsContainer: {
  //   backgroundColor: Colors.secondaryLight,
  //   paddingVertical: 5,
  //   paddingHorizontal: 15,
  //   borderRadius: Theme.BORDER_RADIUS.full,
  //   marginBottom: 10,
  //   alignSelf: "flex-end",
  // },
  tagText: {
    color: Colors.primary,
  },
  tagsContainer: {
    backgroundColor: Colors.bgLight,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: Theme.BORDER_RADIUS.full,
    marginBottom: 10,
    alignSelf: "flex-end",
    color: Colors.primary,
  },
  paragraph: {
    fontSize: Theme.FONT_SIZE.sm,
    fontWeight: "normal",
    color: Colors.paragraph,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
