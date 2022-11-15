import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import { Con, Col, Row } from "../components/grid";
import { color } from "react-native-reanimated";

export default function Checkout({ navigation }) {
  return (
    <View style={globalStyles.dashContainer}>
      <View
        style={{
          backgroundColor: "#0F0F0F",
          height: "100%",
          maxHeight: "50%",
        }}
      >
        <View
          style={{
            backgroundColor: "#F96D02",
            height: "100%",
            maxHeight: "50%",
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40,
    backgroundColor: "#ffff",
  },
  loginText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffff",
  },
  loginButton: {
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 40,
    backgroundColor: "#3CCF4E",
    height: "30%",
    width: "80%",
    borderRadius: 20,
  },
});
