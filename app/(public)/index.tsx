import images from "@/assets";
import PrivacyPolicy from "@/components/privacy-policy";
import TermsAndConditions from "@/components/ters-conditions";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const OnboardingScreen = () => {
  const router = useRouter();
  const [showPrivacy, setPrivacy] = React.useState(false);
  const [showTerms, setTerms] = React.useState(false);

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
          <AnimatedImage
            entering={FadeInUp.duration(1500).delay(500).springify()}
            source={images.paperPlane}
            style={styles.icon}
          />
          <AnimatedImage
            entering={FadeInUp.duration(1500).delay(800).springify()}
            source={images.school}
            style={styles.icon}
          />
        </View>

        <Animated.View
          style={[{ paddingVertical: 10 }]}
          entering={FadeIn.duration(500).delay(500).springify()}
        >
          <Text style={styles.title}>Student AIDE</Text>
          <Text style={styles.subtitle}>e-learning Platform</Text>
        </Animated.View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AnimatedImage
            entering={FadeInLeft.duration(1500).delay(1200).springify()}
            source={images.pencil}
            style={styles.icon}
          />
          <AnimatedImage
            entering={FadeInRight.duration(1500).delay(1200).springify()}
            source={images.globe}
            style={styles.icon}
          />
        </View>

        <Animated.View
          style={[{ alignItems: "center", justifyContent: "center" }]}
        >
          <AnimatedImage
            source={images.computer}
            style={styles.icon}
            entering={FadeIn.duration(500).delay(900).springify()}
          />
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInDown.duration(1500).delay(1600).springify()}
        style={{ width: "100%", marginTop: 10, paddingHorizontal: 20 }}
      >
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.tagline}>Find yourself by doing</Text>
          <Text style={styles.tagline}>whatever you do!</Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.replace("/sign-in")}
          activeOpacity={0.5}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: Colors.lightGray2, fontSize: 14 }}>
            By clicking continue, you agree to the
          </Text>
          <TouchableWithoutFeedback onPress={() => setTerms(true)}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              • Terms and Conditions
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setPrivacy(true)}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              • Privacy Policy
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>

      <TermsAndConditions isVisible={showTerms} setVisible={setTerms} />
      <PrivacyPolicy isVisible={showPrivacy} setVisible={setPrivacy} />
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
    marginBottom: 30,
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
