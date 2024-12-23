import { userRequests } from "@/assets/dummyData";
import BackButton from "@/components/back-button";
import CustomButton from "@/components/button";
import NoDataFound from "@/components/no-data-found";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define types for help request and FAQ data
interface HelpRequest {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  category: "technical" | "academic" | "administrative" | "other";
  created_at: Date;
  updated_at: Date;
  response?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpScreen = () => {
  const faqsData = useQuery(api.faqs.getFAQs);
  const requestData = useQuery(api.requests.getRequests);
  const addRequest = useMutation(api.requests.addRequest);

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"requests" | "faqs" | "new">(
    "requests"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "technical" as HelpRequest["category"],
  });

  const categories: HelpRequest["category"][] = [
    "technical",
    "academic",
    "administrative",
    "other",
  ];
  const onSubmitRequest = async (data: any) => {
    await addRequest(data);
  };

  const getStatusColor = (status: HelpRequest["status"]) => {
    switch (status) {
      case "pending":
        return "#FFA000";
      case "in-progress":
        return "#2196F3";
      case "resolved":
        return "#4CAF50";
      default:
        return "#757575";
    }
  };

  const handleSubmit = () => {
    if (!newRequest.title.trim() || !newRequest.description.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    onSubmitRequest(newRequest);
    setNewRequest({ title: "", description: "", category: "technical" });
    setActiveTab("requests");
    // Alert.alert("Success", "Your help request has been submitted");
  };

  const filteredFAQs = faqsData?.filter(
    (faq) =>
      faq?.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq?.answer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {(["requests", "faqs", "new"] as const).map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Ionicons
            name={
              tab === "requests"
                ? "list"
                : tab === "faqs"
                  ? "help-circle"
                  : "add-circle"
            }
            size={20}
            color={activeTab === tab ? Colors.primary : "#666"}
          />
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRequests = () => (
    <ScrollView
      style={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {requestData?.length === 0 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataFound />
        </View>
      )}
      {requestData?.map((request) => (
        <View key={request._id} style={styles.requestCard}>
          <View style={styles.requestHeader}>
            <View style={styles.requestTitleContainer}>
              <Text style={styles.requestTitle}>{request.title}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: getStatusColor(
                      request?.status as HelpRequest["status"]
                    ),
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {request?.status?.replace("-", " ").toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.requestCategory}>
              {request?.category?.charAt(0)?.toUpperCase()! +
                request?.category?.slice(1)}
            </Text>
          </View>
          <Text style={styles.requestDescription}>{request?.description}</Text>
          {request?.response && (
            <View style={styles.responseContainer}>
              <Text style={styles.responseLabel}>Response:</Text>
              <Text style={styles.responseText}>{request?.response}</Text>
            </View>
          )}
          <Text style={styles.requestDate}>
            Submitted: {new Date(request._creationTime).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderFAQs = () => (
    <>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search FAQs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredFAQs?.map((faq) => (
          <TouchableOpacity key={faq._id} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>{faq?.question}</Text>
            <Text style={styles.faqAnswer}>{faq?.answer}</Text>
            <Text style={styles.faqCategory}>{faq?.category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderNewRequest = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.contentContainer}
    >
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  newRequest.category === category &&
                    styles.selectedCategoryButton,
                ]}
                onPress={() => setNewRequest({ ...newRequest, category })}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    newRequest.category === category &&
                      styles.selectedCategoryButtonText,
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.formLabel}>Title</Text>
          <TextInput
            style={styles.input}
            value={newRequest.title}
            onChangeText={(title) => setNewRequest({ ...newRequest, title })}
            placeholder="Brief title for your request"
            placeholderTextColor="#999"
          />

          <Text style={styles.formLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={newRequest.description}
            onChangeText={(description) =>
              setNewRequest({ ...newRequest, description })
            }
            placeholder="Detailed description of your issue"
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <CustomButton label="Submit Request" onPress={handleSubmit} />
          {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Help Center</Text>
      </View>

      {renderTabs()}

      {activeTab === "requests" && renderRequests()}
      {activeTab === "faqs" && renderFAQs()}
      {activeTab === "new" && renderNewRequest()}

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
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary, //"#2196F3"
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: Colors.primary, //"#2196F3"
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
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
  requestCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  requestHeader: {
    marginBottom: 8,
  },
  requestTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  requestCategory: {
    fontSize: 14,
    color: "#666",
  },
  requestDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  responseContainer: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  responseLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  requestDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  faqCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  faqCategory: {
    fontSize: 12,
    color: "#999",
  },
  formContainer: {
    padding: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary, //"#2196F3"
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  // submitButton: {
  //   backgroundColor: "#2196F3",
  //   padding: 16,
  //   borderRadius: 8,
  //   alignItems: "center",
  //   marginTop: 8,
  // },
  // submitButtonText: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
});

export default HelpScreen;
