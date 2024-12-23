import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function Loader() {
  return (
    <View>
      <ActivityIndicator size={26} color={Colors.primary} />
      <Text style={{ textAlign: "center", marginTop: 0 }}>Loading ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
