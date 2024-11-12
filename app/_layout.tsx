import {
  ClerkLoaded,
  ClerkProvider,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { LogBox } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

import { getFromSecureStorage } from "@/utils";
import { tokenCache } from "@/utils/cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}
LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);

NavigationBar.setBackgroundColorAsync("white");
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // const isAppLaunched = getFromSecureStorage()!;

  // useEffect(() => {
  //   if (typeof isAppLaunched === "undefined") return;

  //   if (!isLoaded) return;

  //   if (!isAppLaunched) {
  //     router.replace("/(public)");
  //   }

  //   const inProtectedGroup = segments[0] === "(protected)";

  //   if (isSignedIn && !inProtectedGroup) {
  //     router.replace("/(protected)/(tabs)/index");
  //   } else if (!isSignedIn && inProtectedGroup) {
  //     router.replace("/(public)/sign-in");
  //   }
  // }, [isSignedIn, isAppLaunched]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
      <StatusBar style="dark" backgroundColor="white" />
    </ClerkProvider>
  );
}
