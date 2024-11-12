import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { achievementData, studentCenterData } from "@/assets/dummyData";
import { renderAchievementCard, renderArticleCard } from "@/components/cards";
import Header from "@/components/header";
import { HeaderTitle } from "@/components/header-title";
import { Colors } from "@/constants/Colors";

const StudentCenter = () => {
  const { cat } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const [data, setData] = useState(
    cat === "Achievement" ? achievementData : studentCenterData
  );

  return (
    <FlatList
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={
        cat === "Achievement" ? renderAchievementCard : renderArticleCard
      }
      ListHeaderComponent={
        <>
          <Header isHome={false} />
          <HeaderTitle title={`${cat}s`} />
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
      }}
    />
  );
};

export default StudentCenter;
