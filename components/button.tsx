import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface ButtonProps {
  label: string;
  className?: string;
}
export default function CustomButton({ label, className }: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
