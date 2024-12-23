import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface ButtonProps {
  label: string;
  className?: string;
  onPress?: () => void;
  isLoading?: boolean;
}
export default function CustomButton({
  label,
  onPress,
  isLoading,
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.5}
      style={[styles.submitButton, isLoading && { opacity: 0.6 }]}
      onPress={onPress}
    >
      <Text style={styles.submitButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#4C1D95",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
