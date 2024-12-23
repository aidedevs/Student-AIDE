import CustomButton from "@/components/button";
import { PostCard } from "@/components/cards";
import { FloatingButton } from "@/components/floating-button";
import Header from "@/components/header";
import { HeaderTitle } from "@/components/header-title";
import Loader from "@/components/loader";
import NoDataFound from "@/components/no-data-found";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { AntDesign } from "@expo/vector-icons";
import { usePaginatedQuery } from "convex/react";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const { userProfile: user } = useUserProfile();
  const { top } = useSafeAreaInsets();
  const { results, isLoading, loadMore } = usePaginatedQuery(
    api.studentCenter.getPosts,
    { userId: user?._id },
    { initialNumItems: 5 }
  );

  const router = useRouter();
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
    <View style={[styles.container]}>
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

            {user?.isApproved && <HeaderTitle title="My Posts" />}
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <></>
          ) : (
            <View style={{ flex: 1 }}>
              {!user?.isApproved ? (
                <View style={styles.writer}>
                  <AntDesign
                    name="questioncircle"
                    size={60}
                    color={Colors.primary}
                  />
                  <Text style={styles.writerTitle}>
                    Do you want to be a write on this platform?
                  </Text>

                  <CustomButton
                    label="Join Now"
                    onPress={() => router.push("/writers/join-writers")}
                  />
                </View>
              ) : (
                <NoDataFound />
              )}
            </View>
          )
        }
        contentContainerStyle={{
          paddingVertical: top,
          padding: 20,
          backgroundColor: Colors.white,
          gap: 10,
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={isLoading ? <Loader /> : <></>}
      />
      {user?.isApproved && (
        <FloatingButton
          onPress={() => router.push("/writers/create-post")}
          icon="plus"
          color="#ffffff"
          backgroundColor="#4C1D95"
        />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  writer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  writerTitle: {
    fontSize: 24,
    marginTop: 10,
    textAlign: "center",
  },
  writeBtn: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
