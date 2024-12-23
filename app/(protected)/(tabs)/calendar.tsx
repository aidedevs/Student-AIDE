import Header from "@/components/header";
import { HeaderTitle } from "@/components/header-title";
import Loader from "@/components/loader";
import NoDataFound from "@/components/no-data-found";
import { Colors } from "@/constants/Colors";
import Theme from "@/constants/Theme";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { getFormattedDateByMY } from "@/utils";
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

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: "class" | "exam" | "holiday" | "assignment";
  description?: string;
}

interface Event {
  date: number;
  event: string;
  type: string;
  description: string;
  userId: string;
}

export interface GroupedData {
  [date: number]: Event[];
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
const getWeek = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
  });
};

const getEventColor = (type: string): string => {
  switch (type) {
    case "class":
      return "#4CAF50";
    case "exam":
      return "#F44336";
    case "holiday":
      return "#2196F3";
    case "assignment":
      return "#FF9800";
    default:
      return "#757575";
  }
};
const CalendarPage = () => {
  const { top } = useSafeAreaInsets();
  const { results, isLoading, loadMore } = usePaginatedQuery(
    api.academic.getAcademicCalendar,
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

  const renderItem = ({ item }: { item: Doc<"academicCalendar"> }) => {
    return (
      <TouchableOpacity
        style={styles.eventContainer}
        onPress={() => console.log("Event pressed:", item?.event)}
      >
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {formatDate(new Date(item?.date!))}
          </Text>
        </View>
        <View style={styles.eventContent}>
          <View
            style={[
              styles.eventType,
              { backgroundColor: getEventColor(item?.type!) },
            ]}
          />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{item.event}</Text>
            {item.description && (
              <Text style={styles.eventDescription}>{item.description}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      data={results}
      keyExtractor={(item) => item?._id}
      renderItem={renderItem}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <>
          <Header isHome={false} />

          <HeaderTitle title="Academic Calender" />
          <View style={styles.today}>
            <Text style={styles.todayDate}>{new Date().getDate()}</Text>
            <View>
              <Text style={styles.todayText}>{getWeek(new Date())}</Text>
              <Text style={styles.todayText}>
                {getFormattedDateByMY(new Date())}
              </Text>
            </View>
          </View>
          <View style={styles.legend}>
            {["class", "exam", "holiday", "assignment"].map((type) => (
              <View key={type} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    {
                      backgroundColor: getEventColor(
                        type as CalendarEvent["type"]
                      ),
                    },
                  ]}
                />
                <Text style={styles.legendText}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        </>
      }
      ListEmptyComponent={isLoading ? <></> : <NoDataFound />}
      ListFooterComponent={isLoading ? <Loader /> : <></>}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        paddingVertical: top,
        padding: 20,
        backgroundColor: Colors.white,
        gap: 10,
      }}
    />
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  eventContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
    elevation: -0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dateContainer: {
    width: 100,
    padding: 12,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },
  eventContent: {
    flex: 1,
    flexDirection: "row",
  },
  eventType: {
    width: 4,
  },
  eventDetails: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
  },
  today: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 4,
  },
  todayDate: {
    fontSize: Theme.FONT_SIZE.xl * 2,
    fontWeight: "bold",
    color: Colors.black,
  },
  todayText: {
    fontSize: Theme.FONT_SIZE.lg,
    color: Colors.lightGray1,
    fontWeight: "700",
  },
});
