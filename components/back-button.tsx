import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Theme from "@/constants/Theme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.backButtonContainer]}>
      <Ionicons name="arrow-back" size={24} color={Colors.black} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    padding: 4,
    borderRadius: Theme.BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginRight: 10,
  },
});
