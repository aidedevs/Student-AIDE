import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

const Layout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="student-center" />
      </Stack>
      <StatusBar style="dark" backgroundColor="white" />
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({});
