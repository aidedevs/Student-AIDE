import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};
export default Layout;
