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
import * as NavigationBar from "expo-navigation-bar";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { LogBox } from "react-native";

import { tokenCache } from "@/utils/cache";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

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

  useEffect(() => {
    // if (typeof isAppLaunched === "undefined") return;

    if (!isLoaded) return;

    // if (!isAppLaunched) {
    //   router.replace("/(public)");
    // }

    const inProtectedGroup = segments[0] === "(protected)";

    if (isSignedIn && !inProtectedGroup) {
      router.replace("/(protected)/(tabs)/feed");
    } else if (!isSignedIn && inProtectedGroup) {
      router.replace("/(public)");
    }
  }, [isSignedIn]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <>
      <GestureHandlerRootView>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
              <InitialLayout />
            </ConvexProviderWithClerk>
          </ClerkLoaded>
        </ClerkProvider>
      </GestureHandlerRootView>
      <StatusBar style="dark" backgroundColor="white" />
    </>
  );
}
