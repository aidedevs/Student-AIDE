import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { calculateProgress } from "@/utils";

interface CardProps {
  id: string | number;
  index: number;
  priority: string;
  title: string;
  completed: boolean;
  subTasks: {
    id: string | number;
    title: string;
    completed: boolean;
  }[];
}
export const TaskCard = ({
  id,
  index,
  priority,
  title,
  subTasks,
  completed,
}: CardProps) => {
  const progress = calculateProgress({ completed, subTasks });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      key={id}
      style={[
        styles.cardContainer,
        {
          backgroundColor: index === 1 ? "#471073" : Colors.bgSecondary,
        },
      ]}
    >
      <View style={styles.topContainer}>
        <View style={styles.priorityContainer}>
          <Text style={styles.priority}>{priority}</Text>
        </View>
        <Text style={[styles.title, { color: index === 1 ? "white" : "" }]}>
          {title}
        </Text>
      </View>
      <View>
        <Text
          style={[styles.progressText, { color: index === 1 ? "white" : "" }]}
        >
          Progress
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                {
                  width: `${progress}%`,
                  backgroundColor: index === 1 ? "#7630AF" : Colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.percent, { color: index === 1 ? "white" : "" }]}>
            {progress}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 20,
    padding: 20,
    backgroundColor: Colors.bgSecondary,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 250,
    width: 300,
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    height: "70%",
  },
  priorityContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: Theme.BORDER_RADIUS.full,
    marginBottom: 10,
    color: Colors.primary,
    alignSelf: "flex-start",
  },
  priority: {
    fontSize: Theme.FONT_SIZE.md,
    fontWeight: "700",
    color: Colors.primaryDark,
    textTransform: "capitalize",
  },
  title: {
    fontSize: Theme.FONT_SIZE.xl,
    fontWeight: "normal",
    color: Colors.black,
    marginBottom: 10,
  },
  progressText: {
    color: Colors.black,
    fontWeight: "bold",
    marginBottom: 10,
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
    backgroundColor: Colors.white,
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
});
