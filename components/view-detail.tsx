import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { formatDateTime } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { ReactNode, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ColorSpace } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const BANNER_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const STATUS_BAR_TRANSITION_THRESHOLD = BANNER_HEIGHT - HEADER_HEIGHT - 30;

interface DataProps {
  image: string | undefined;
  title: string;
  children: React.ReactNode;
  onPress?: () => void;
}
export default function ViewDetailPage({
  image,
  title,
  children,
  onPress,
}: DataProps) {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [statusBarStyle, setStatusBarStyle] = useState<
    "light-content" | "dark-content"
  >("light-content");
  const lastScrollY = useRef(0);

  const headerImageHeight = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT - HEADER_HEIGHT],
    outputRange: [BANNER_HEIGHT + insets.top, HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const headerImageOpacity = scrollY.interpolate({
    inputRange: [
      STATUS_BAR_TRANSITION_THRESHOLD - 20,
      STATUS_BAR_TRANSITION_THRESHOLD,
    ],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [
      STATUS_BAR_TRANSITION_THRESHOLD - 20,
      STATUS_BAR_TRANSITION_THRESHOLD,
    ],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const handleScroll = Animated.event<NativeScrollEvent>(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        setIsScrollingDown(currentScrollY > lastScrollY.current);

        if (currentScrollY > STATUS_BAR_TRANSITION_THRESHOLD) {
          setStatusBarStyle("dark-content");
        } else {
          setStatusBarStyle("light-content");
        }

        lastScrollY.current = currentScrollY;
      },
    }
  );

  const AnimatedHeader = () => (
    <Animated.View
      style={[
        styles.headerBackground,
        {
          opacity: headerBackgroundOpacity,
          height: HEADER_HEIGHT + insets.top,
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={statusBarStyle}
      />
      <AnimatedHeader />

      <Animated.View
        style={[
          styles.header,
          {
            height: headerImageHeight,
            paddingTop: insets.top,
            opacity: headerImageOpacity,
          },
        ]}
      >
        {image ? (
          <Image
            source={{ uri: image! }}
            style={[styles.headerImage, { height: BANNER_HEIGHT + insets.top }]}
          />
        ) : (
          <View
            style={[
              styles.headerImage,
              {
                height: BANNER_HEIGHT + insets.top,
                backgroundColor: Colors.primaryDark,
              },
            ]}
          >
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>{title}</Text>
            </View>
          </View>
        )}
      </Animated.View>

      {(isScrollingDown || scrollY?._value < 50) && (
        <Animated.View
          style={[
            styles.backButton,
            {
              top: insets.top + 8,
            },
          ]}
        >
          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.backButtonContainer,
              {
                backgroundColor: Colors.white,
                ...(scrollY._value > STATUS_BAR_TRANSITION_THRESHOLD && {
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 3.84,
                  elevation: 5,
                }),
              },
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          {lastScrollY.current > STATUS_BAR_TRANSITION_THRESHOLD && (
            <Text numberOfLines={1} style={styles.bigTitle}>
              {title?.length > 28 ? title?.slice(0, 28) + "..." : title}
            </Text>
          )}
        </Animated.View>
      )}
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: BANNER_HEIGHT + insets.top,
        }}
      >
        <View style={styles.content}>
          {lastScrollY.current < STATUS_BAR_TRANSITION_THRESHOLD && (
            <Text style={styles.title}>{title}</Text>
          )}

          <>{children}</>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    zIndex: 1,
    shadowRadius: 3.84,
  },
  headerImage: {
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    resizeMode: "cover",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 16,
    zIndex: 2,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
  },
  bigTitle: {
    fontSize: Theme.FONT_SIZE.xl,
    fontWeight: "bold",
    marginLeft: 10,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000010",
  },
  noImageText: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.white,
  },
});
