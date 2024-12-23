import BackButton from "@/components/back-button";
import Loader from "@/components/loader";
import NoDataFound from "@/components/no-data-found";
import { ResourceCard } from "@/components/resource-card";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { usePaginatedQuery } from "convex/react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Resource {
  _id: string;
  title: string;
  description: string;
  category: "assignment" | "lecture" | "lab" | "exam" | "other";
  file_type: "pdf" | "docx" | "pptx" | "xlsx" | "txt" | "zip";
  link: string;
  created_at: Date;
}

const getCategoryIcon = (category: Resource["category"]) => {
  switch (category) {
    case "assignment":
      return "create";
    case "lecture":
      return "book";
    case "lab":
      return "flask";
    case "exam":
      return "school";
    default:
      return "folder";
  }
};

const ResourceCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    Resource["category"] | "all"
  >("all");
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const categories: Array<Resource["category"] | "all"> = [
    "all",
    "assignment",
    "lecture",
    "lab",
    "exam",
    "other",
  ];

  const { results, isLoading, loadMore } = usePaginatedQuery(
    api.resources.getResources,
    { category: selectedCategory === "all" ? undefined : selectedCategory },
    { initialNumItems: 5 }
  );

  // const filteredResources = data?.filter((resource) => {
  //   const matchesSearch =
  //     resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     resource.description.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === "all" || resource.category === selectedCategory;
  //   return matchesSearch && matchesCategory;
  // });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const onLoadMore = () => {
    loadMore(5);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Resource Center</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Category Filters */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Ionicons
                name={
                  category === "all"
                    ? "apps"
                    : getCategoryIcon(category as Resource["category"])
                }
                size={16}
                color={selectedCategory === category ? "#fff" : "#666"}
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category &&
                    styles.selectedCategoryButtonText,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ResourceCard item={item as Doc<"resources">} />
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={isLoading ? <></> : <NoDataFound />}
        ListFooterComponent={isLoading ? <Loader /> : <></>}
      />
      <StatusBar backgroundColor="white" style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 6,
  },
  categoryWrapper: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    maxHeight: 60,
  },
  categoryScrollContent: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  categoryIcon: {
    marginRight: 4,
  },
  selectedCategoryButton: {
    backgroundColor: "#2196F3",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
});

export default ResourceCenter;
