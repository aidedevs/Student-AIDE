import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  style?: object;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search",
  style = {},
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleClear = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchQuery("");
    onSearch("");
  };

  const handleCancel = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchQuery("");
    setIsFocused(false);
    onSearch("");
  };

  const handleChangeText = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const handleFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textTransform: "capitalize",
            marginVertical: 6,
          }}
        >
          Search
        </Text>
      </View>
      <View
        style={[
          styles.searchContainer,
          isFocused && styles.searchContainerFocused,
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color="#8E8E93"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={handleChangeText}
          autoFocus={true}
          onFocus={handleFocus}
          placeholder="Search post ..."
          placeholderTextColor="#8E8E93"
          clearButtonMode="never"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <View style={styles.clearIconContainer}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F750",
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 38,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray,
  },
  searchContainerFocused: {
    flex: undefined,
    flexGrow: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: "#000",
    padding: 0,
    height: "100%",
  },
  clearButton: {
    padding: 4,
  },
  clearIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    marginLeft: 8,
    paddingLeft: 8,
  },
  cancelButtonText: {
    color: Colors.lightGray2,
    fontSize: 17,
  },
});

export default SearchBar;
