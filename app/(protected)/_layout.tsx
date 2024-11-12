import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ProtectedLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="(modal)/create-task"
          options={{
            title: "New Task",
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(modal)/[id]/index"
          options={{ title: "", presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="(modal)/news-event/[id]/index"
          options={{ title: "", presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="(modal)/view-task/[id]/index"
          options={{ title: "", presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="(modal)/view-task/[id]/add-subtask"
          options={{ title: "", presentation: "modal", headerShown: false }}
        />
      </Stack>
      <StatusBar style="dark" backgroundColor="white" />
    </>
  );
};

export default ProtectedLayout;
