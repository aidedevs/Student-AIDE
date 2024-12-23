import { EventCard, NewsCard, StudentCenterItem } from "@/components/cards";
import Header from "@/components/header";
import Loader from "@/components/loader";
import NoDataFound from "@/components/no-data-found";
import { OngoingTask } from "@/components/ongoing-tasks";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const typeData = ["News", "Events", "Student Center"];
const studentsCenter = [{ _id: "Student" }];

const Page = () => {
  const { top } = useSafeAreaInsets();
  const [type, setType] = useState("News");
  const { results, isLoading, loadMore } = usePaginatedQuery(
    type === "News" ? api.news.getNews : api.events.getEvent,
    {},
    { initialNumItems: 5 }
  );

  const [refreshing, setRefreshing] = useState(false);

  const onLoadMore = () => {
    loadMore(5);
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <View style={styles.contentContainer}>
        <FlatList
          scrollEventThrottle={16}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          data={type === "Student Center" ? studentsCenter : results}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>
            type === "News" ? (
              <NewsCard item={item as Doc<"news">} />
            ) : type === "Events" ? (
              <EventCard item={item as Doc<"activities">} />
            ) : (
              <StudentCenterItem />
            )
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
                    onPress={() => setType(el)}
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
            backgroundColor: Colors.white,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={isLoading ? <></> : <NoDataFound />}
          ListFooterComponent={isLoading ? <Loader /> : <></>}
        />
      </View>
    </>
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

  lottieAnim: {
    width: 10,
    height: 100,
    backgroundColor: "white",
    position: "absolute",
    left: -8,
    top: -8,
  },
  gesture: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 400,
    width: "100%",
    // backgroundColor: "green",
    zIndex: 99999,
  },
  lottieView: {
    width: 80,
    height: 80,
    backgroundColor: "transparent",
    marginTop: -15,
  },
  pullToRefreshArea: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  contentContainer: { flex: 1 },
  center: { justifyContent: "center", alignItems: "center" },
});
