import images from "@/assets";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignInPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={images?.students} style={styles.imageContainer} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <View>
            <Text style={[styles.title, { color: Colors.primary }]}>
              Welcome back!
            </Text>
            <Text style={styles.title}> Sign in to continue!</Text>
          </View>
          <View style={{ marginBottom: Theme?.SPACING.md - 2 }}>
            <Text style={styles.subtitle}>
              Please kindly note that you can only sign in with your student
              email address.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(tabs)/feed")}
          >
            <Image source={images.google} style={styles.google} />
            <Text style={styles.text}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: Theme?.SPACING.lg - 4,
    alignItems: "center",
  },
  title: {
    fontSize: Theme?.FONT_SIZE.xl + 8,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors?.black,
    // fontFamily: "DMSans_700Bold",
  },
  button: {
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors?.lightGray1,
    borderRadius: Theme?.BORDER_RADIUS.full,
    paddingVertical: Theme?.SPACING.sm + 4,
    paddingHorizontal: Theme?.SPACING.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Theme?.SPACING.lg,
    marginBottom: Theme?.SPACING.md,
    gap: 10,
  },
  google: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  text: {
    fontSize: Theme?.FONT_SIZE.lg,
    fontWeight: "bold",
    color: Colors.lightGray2,
    fontFamily: "DMSans_700Bold",
  },
  subtitle: {
    fontSize: Theme?.FONT_SIZE.md,
    fontWeight: "normal",
    color: Colors.lightGray2,
    // fontFamily: "DMSans_400Regular",
    marginTop: Theme?.SPACING.sm,
    textAlign: "center",
  },
});
