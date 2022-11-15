import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <ScrollView>
        <View>
          <Image source={require("../images/house_of_tara_logo.png")} />
        </View>
        <View style={{ borderRadius: 5 }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "900",
              color: "#F96D02",
              paddingHorizontal: 0,
              paddingTop: 20,
              // fontFamily: "serif",
              width: 300,
            }}
          >
            Let Know What You Are Signing Up For
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "100",
            color: "#F96D02",
            paddingHorizontal: 0,
            paddingTop: 10,
            fontFamily: "serif",
            width: 300,
          }}
        >
          What Repository are you signing up for ?
        </Text>
        <View>
          <TouchableOpacity
            style={{ width: 300, paddingTop: 10 }}
            onPress={() =>
              navigation.navigate("Registration", { cartegory: "RETAILER" })
            }
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>Retailer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 300, paddingTop: 10 }}
            onPress={() =>
              navigation.navigate("Registration", { cartegory: "DISTRIBUTOR" })
            }
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>Wholesaler</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 300, paddingTop: 10 }}
            onPress={() =>
              navigation.navigate("Registration", { cartegory: "BOTH" })
            }
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>Both</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    alignItems: "center",
    paddingTop: 60,
    justifyContent: "center",
  },
  loginButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: 50,
  },
  loginText: {
    textAlign: "center",
    color: "#fff",
  },
});
