import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ title, navigation }) {
  const redirectCart = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <MaterialIcons
        name="shopping-cart"
        size={28}
        onPress={redirectCart}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    // letterSpacing: 1,
  },
  icon: {
    // position: "absolute",
    right: 16,
    color: "#fff",
  },
});
