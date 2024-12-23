import { usePaginatedQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AchievementCard, PostCard } from "@/components/cards";
import Header from "@/components/header";
import { HeaderTitle } from "@/components/header-title";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import NoDataFound from "@/components/no-data-found";
import Loader from "@/components/loader";

const SavedPosts = () => {
  const { cat } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const { results, isLoading, loadMore } = usePaginatedQuery(
    api.studentCenter.getPosts,
    { category: cat as string },
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
    <FlatList
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      data={results}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <PostCard
          post={item as Doc<"studentCenters"> & { creator: Doc<"users"> }}
        />
      )}
      ListHeaderComponent={
        <>
          <Header isHome={false} />
          <HeaderTitle title="Saved Post" />
        </>
      }
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.lightGray,
            marginVertical: 14,
          }}
        />
      )}
      contentContainerStyle={{
        paddingVertical: top,
        padding: 20,
        backgroundColor: Colors.white,
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={isLoading ? <></> : <NoDataFound />}
      ListFooterComponent={isLoading ? <Loader /> : <></>}
    />
  );
};

export default SavedPosts;
