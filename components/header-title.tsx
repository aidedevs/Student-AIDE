import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Theme.SPACING.md,
  },
  title: {
    fontSize: Theme.FONT_SIZE.xl + 2,
    fontWeight: "bold",
    color: Colors.black,
  },
});
