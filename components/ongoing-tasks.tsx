import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { TaskCardProps } from "@/app/(protected)/(tabs)/tasks";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { TaskCard } from "./task-card";

export const OngoingTask = () => {
  const data = useQuery(api.tasks.getUserOngoingTasks);

  // if (!data) return;
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data?.map((el, id) => {
        const item = { ...(el as TaskCardProps), index: id };
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
