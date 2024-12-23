import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  icon?: keyof typeof AntDesign.glyphMap;
  color?: string;
  size?: number;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

export const FloatingButton = ({
  onPress,
  icon = "plus",
  color = "#000000",
  size = 24,
  backgroundColor = "#ffffff",
  containerStyle,
  buttonStyle,
}: ButtonProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }, buttonStyle]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <AntDesign name={icon} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 30,
    zIndex: 1000,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
