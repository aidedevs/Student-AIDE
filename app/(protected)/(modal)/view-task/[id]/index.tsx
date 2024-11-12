import {
  calculateProgress,
  checkDueTaskDate,
  getFormattedFullDate,
} from "@/utils";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { taskData } from "@/assets/dummyData";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";

const Page = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState(taskData.find((el) => el.id === id));
  const taskProgress = calculateProgress({ ...data! });
  const dueDate = checkDueTaskDate(data?.due_date!);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({ item }: { item: any }) => {
    const dueDate = checkDueTaskDate(item?.due_date);

    return (
      <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8}>
        <View>
          <Text numberOfLines={2} style={[styles.title]}>
            {item?.title}
          </Text>
          <Text style={styles.paragraph}>{item?.description}</Text>
          <View style={styles.infoTags}>
            <View
              style={[
                styles.tagsContainer,
                dueDate < 0 &&
                  !item?.completed && { backgroundColor: "#FF000020" },
                item?.completed && { backgroundColor: "#00800020" },
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  dueDate < 0 &&
                    !item?.completed && {
                      color: "#FF0000",
                      fontWeight: "bold",
                    },
                  item?.completed && { color: "#008000" },
                ]}
              >
                Due {getFormattedFullDate(item?.due_date)}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.tagsContainer, { backgroundColor: "#0000FF20" }]}
            >
              <Text style={[styles.tagText, { color: "#0000FF" }]}>
                {item?.completed ? "Mark Undone" : "Mark Completed"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Task Detail",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#faf6ff",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.backButtonContainer]}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Text>Mark Completed</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        data={data?.subTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <View style={styles.headerContainer}>
              <View
                style={[
                  styles.taskColor,
                  {
                    backgroundColor:
                      taskProgress === 100
                        ? "green"
                        : taskProgress > 60
                        ? "blue"
                        : taskProgress > 0
                        ? "orange"
                        : "red",
                  },
                ]}
              />
              <Text style={styles.bigTitle}>{data?.title}</Text>

              <View
                style={[
                  styles.percentageContainer,
                  {
                    borderColor:
                      taskProgress === 100
                        ? "green"
                        : taskProgress > 60
                        ? "blue"
                        : taskProgress > 0
                        ? "orange"
                        : "red",
                  },
                ]}
              >
                <Text style={[styles.percentageText]}>{taskProgress}%</Text>
                <Text
                  style={[
                    styles.completedText,
                    {
                      color:
                        taskProgress === 100
                          ? "green"
                          : taskProgress > 60
                          ? "blue"
                          : taskProgress > 0
                          ? "orange"
                          : "red",
                    },
                  ]}
                >
                  Completed
                </Text>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <View style={styles.info}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Due Date:</Text>
                  <Text
                    style={[
                      styles.infoValue,
                      dueDate < 0 &&
                        !data?.completed && {
                          color: "#FF0000",
                          fontWeight: "bold",
                        },
                    ]}
                  >
                    {getFormattedFullDate(data?.due_date!)}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Created On</Text>
                  <Text style={styles.infoValue}>
                    {getFormattedFullDate(data?.created_at!)}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Priority</Text>
                  <Text style={[styles.infoValue, styles.priority]}>
                    {data?.priority}
                  </Text>
                </View>
              </View>

              <View style={styles.info}>
                <Text style={styles.paragraph}>{data?.description}</Text>
              </View>
            </View>

            <View style={styles.subContainer}>
              <Text style={styles.subTitle}>Sub-Tasks</Text>
              <Text style={styles.subCount}>{data?.subTasks?.length}</Text>
            </View>
          </>
        }
        ListFooterComponent={
          <View>
            <TouchableOpacity
              onPress={() =>
                router.push(`(modal)/view-task/${data?.id}/add-subtask`)
              }
              style={styles.addSubTask}
            >
              <AntDesign name="plus" size={24} color={Colors.paragraph} />
              <Text style={styles.addText}>Add Sub-Task</Text>
            </TouchableOpacity>
          </View>
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.lightGray,
            }}
          />
        )}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: "#faf6ff",
          gap: 16,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  backButtonContainer: {
    padding: 4,
    borderRadius: Theme.BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    marginBottom: 20,
  },
  bigTitle: {
    fontSize: Theme.FONT_SIZE.xl,
    fontWeight: "bold",
    color: Colors.black,
    flex: 1,
  },
  percentageContainer: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    width: 80,
    height: 80,
    borderRadius: Theme.BORDER_RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  percentageText: {
    fontSize: Theme.FONT_SIZE.xl,
    fontWeight: "bold",
    color: Colors.black,
  },
  completedText: {
    fontSize: Theme.FONT_SIZE.xs,
    color: Colors.primary,
  },
  taskColor: {
    width: 16,
    height: 16,
    borderRadius: Theme.BORDER_RADIUS.sm,
    marginTop: 7,
  },
  info: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: Theme.BORDER_RADIUS.md,
    marginBottom: 10,
    elevation: 1,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoText: {
    fontSize: Theme.FONT_SIZE.sm,
    color: Colors.paragraph,
  },
  infoValue: {
    fontSize: Theme.FONT_SIZE.sm,
    fontWeight: "bold",
    color: Colors.black,
  },
  priority: {
    textTransform: "capitalize",
    fontSize: Theme.FONT_SIZE.sm,
    fontWeight: "700",
    borderWidth: StyleSheet.hairlineWidth,
    borderBlockColor: Colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: Theme.BORDER_RADIUS.md,
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  paragraph: {
    fontSize: Theme.FONT_SIZE.md,
    color: Colors.paragraph,
    lineHeight: 24,
    marginBottom: 10,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 20,
  },
  subTitle: {
    fontSize: Theme.FONT_SIZE.md,
    fontWeight: "bold",
    color: Colors.black,
  },
  subCount: {
    fontSize: Theme.FONT_SIZE.sm,
    fontWeight: "bold",
    color: Colors.black,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: "100%",
  },
  title: {
    fontSize: Theme.FONT_SIZE.lg,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 5,
  },
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
  },
  infoTags: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  addSubTask: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: Theme.BORDER_RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray,
    marginVertical: 10,
    gap: 4,
  },
  addText: {
    fontSize: Theme.FONT_SIZE.sm,
    color: Colors.paragraph,
  },
});
