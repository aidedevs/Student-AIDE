import { Colors } from "@/constants/Colors";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

const TabLayout = () => {
  // useFocusEffect(React.useCallback(() => {}, []));
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarStyle: {
            backgroundColor: Colors.white,

            // borderTopColor: Colors.lightGray,
            // borderTopWidth: 1,
            // paddingVertical: 10,
            // paddingHorizontal: 15,
            // justifyContent: "space-around",
            alignItems: "center",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="feed"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="grades"
          options={{
            title: "Grades",
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome name={"graduation-cap"} size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={
                  focused ? "clipboard-text-clock" : "clipboard-clock-outline"
                }
                size={size}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome5
                name={focused ? "clipboard-list" : "list-alt"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
