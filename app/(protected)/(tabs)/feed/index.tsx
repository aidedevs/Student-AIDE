import { eventsData, newsData } from "@/assets/dummyData";
import {
  renderItem,
  renderNewsItem,
  renderStudentCenterItem,
} from "@/components/cards";
import Header from "@/components/header";
import { OngoingTask } from "@/components/ongoing-tasks";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const typeData = ["News", "Events", "Student Center"];
const studentsCenter = [{ id: "Student" }];

const Page = () => {
  const { top } = useSafeAreaInsets();
  const [type, setType] = useState("News");
  const [data, setData] = useState<any>(newsData);

  return (
    <FlatList
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={
        type === "News"
          ? renderNewsItem
          : type === "Events"
          ? renderItem
          : renderStudentCenterItem
      }
      ListHeaderComponent={
        <>
          <Header />
          <OngoingTask />
          <View style={styles.typesContainer}>
            {typeData.map((el) => (
              <TouchableOpacity
                style={styles.typesBtn}
                key={el}
                onPress={() => {
                  setType(el);
                  if (el === "News") {
                    setData(newsData);
                  } else if (el === "Events") {
                    setData(eventsData);
                  } else if (el === "Student Center") {
                    setData(studentsCenter);
                  }
                }}
              >
                <Text
                  style={[
                    styles.typeText,
                    el === type && {
                      borderBottomWidth: 3,
                      borderBottomColor: Colors.primary,
                      borderRadius: 4,
                    },
                  ]}
                >
                  {el}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      }
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.lightGray,
          }}
        />
      )}
      contentContainerStyle={{
        paddingVertical: top,
        padding: 20,
        backgroundColor: "white",
      }}
    />
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },

  typesContainer: {
    flexDirection: "row",
    marginVertical: Theme.SPACING.md,
    gap: Theme.SPACING.md,
  },
  typesBtn: {
    paddingVertical: Theme.SPACING.sm,
    backgroundColor: "white",
    borderRadius: Theme.BORDER_RADIUS.md,
    marginHorizontal: Theme.SPACING.sm,
  },
  typeText: {
    fontSize: Theme.FONT_SIZE.lg,
    color: Colors.black,
    fontWeight: "500",
  },
});
