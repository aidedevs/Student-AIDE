import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Theme from "@/constants/Theme";
import React from "react";
import images from "@/assets";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image source={images.paperPlane} style={styles.icon} />
          <Image source={images.school} style={styles.icon} />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={styles.title}>Student AIDE</Text>
          <Text style={styles.subtitle}>e-learning Platform</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image source={images.pencil} style={styles.icon} />
          <Image source={images.globe} style={styles.icon} />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image source={images.computer} style={styles.icon} />
        </View>
      </View>

      <View style={{ width: "100%", marginTop: 10, paddingHorizontal: 20 }}>
        {/* Tagline */}
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.tagline}>Find yourself by doing</Text>
          <Text style={styles.tagline}>whatever you do!</Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.replace("sign-in")}
          activeOpacity={0.5}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity onPress={() => {}} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },
  iconsContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    margin: 10,
  },
  title: {
    fontSize: Theme.FONT_SIZE.xl,
    fontWeight: "bold",
    color: "#4a2c8a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 40,
  },
  tagline: {
    fontSize: Theme.FONT_SIZE.xl + 1,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    // marginBottom: 40,
  },
  nextButton: {
    backgroundColor: "#4a2c8a",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: Theme.SPACING.md,
  },
  nextButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: Theme.FONT_SIZE.lg,
  },
  skipButton: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    color: Colors.black,
    fontWeight: "bold",
    fontSize: Theme.FONT_SIZE.lg,
  },
  skipText: {
    color: "#000",
    fontSize: 16,
  },
});
