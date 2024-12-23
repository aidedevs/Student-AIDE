import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { icons } from "@/assets";
import { Colors } from "@/constants/Colors";

export default function NoDataFound() {
  return (
    <View style={styles.container}>
      <Image source={icons.NoData} style={styles.noData} />
      <Text style={styles.text}>No Data Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  noData: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
    opacity: 0.7,
  },
  text: {
    fontSize: 18,
    // fontWeight: "bold",
    textAlign: "center",
    color: Colors.paragraph,
  },
});
