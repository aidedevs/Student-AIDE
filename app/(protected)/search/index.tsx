import { PostCard } from "@/components/cards";
import SearchBar from "@/components/search-input";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchPost() {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const posts = useQuery(
    api.studentCenter.searchPosts,
    search === "" ? "skip" : { search }
  );
  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <View style={[styles.container]}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={posts}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.lightGray1,
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No post found</Text>
        )}
        renderItem={({ item }) => (
          <PostCard
            post={item as Doc<"studentCenters"> & { creator: Doc<"users"> }}
          />
        )}
        contentContainerStyle={{
          backgroundColor: Colors.white,
          paddingTop: 10,
          gap: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  user: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
});
