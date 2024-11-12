import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TaskCard } from "./Taskcard";
import { taskData } from "@/assets/dummyData";

export const OngoingTask = () => {
  const data = taskData.slice(0, 3);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data?.map((el, id) => {
        const item = { ...el, index: id };
        return (
          <View key={id}>
            <TaskCard {...item} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
});
