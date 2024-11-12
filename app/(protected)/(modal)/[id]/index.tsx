import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { studentCenterData } from "@/assets/dummyData";
import { Avatar } from "@/components/header";
import ViewDetailPage from "@/components/view-detail";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { formatDateTime } from "@/utils";

const Page = () => {
  const { id } = useLocalSearchParams();
  const data = studentCenterData.find((el) => el.id === id);
  const router = useRouter();

  return (
    <ViewDetailPage
      image={data?.image}
      title={data?.title!}
      onPress={() => router.back()}
    >
      <Text style={styles.metadata}>
        Posted on {formatDateTime(data?.created_at!) || " March 15, 2024"}
      </Text>

      <Text style={styles.paragraph}>{data?.content}</Text>

      <Text style={styles.paragraph}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
      <View style={styles.writer}>
        {data?.user?.img && (
          <Avatar url={data?.user?.img} isHome={false} size={44} />
        )}

        <View>
          <Text style={styles.username}>
            {data?.user?.name}
            <Text style={{ fontSize: 12, fontWeight: "light", marginLeft: 2 }}>
              {"  (Writer)"}
            </Text>
          </Text>
          <Text style={styles.course}>{data?.user?.course}</Text>
        </View>
      </View>
    </ViewDetailPage>
  );
};

const styles = StyleSheet.create({
  metadata: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: Theme.FONT_SIZE.md,
    lineHeight: Theme.SPACING.lg,
    color: Colors.paragraph,
    marginBottom: 16,
  },
  writer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Theme.SPACING.lg - 4,
  },
  username: {
    fontSize: Theme.FONT_SIZE.md,
    fontWeight: "bold",
    color: Colors.black,
    marginLeft: 4,
  },
  course: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});

export default Page;
