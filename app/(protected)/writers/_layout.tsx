import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const WriterLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="join-writers"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="create-post"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
};

export default WriterLayout;
