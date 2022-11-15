import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function Profile({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setcategories] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // getting data
      const getUser = async () => {
        try {
          const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
          setFirstName(`${userData.firstname}`);
          setLastName(`${userData.lastname}`);
          setEmail(`${userData.email}`);
          setcategories(`${userData.categories}`);
          setcountry(`${userData.country}`);
          setstate(`${userData.state}`);
          setcity(`${userData.city}`);
          setaddress(`${userData.address}`);
          console.log(userData);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <View style={globalStyles.container}>
      <View
        style={{
          backgroundColor: "#BAD1C2",
          height: "50%",
          width: "100%",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "#0F0F0F",
            fontWeight: "700",
            fontSize: 20,
            paddingTop: 25,
            marginLeft: 20,
          }}
        >
          Firstname: {firstName} 
        </Text>

        <Text
          style={{
            color: "#0F0F0F",
            fontWeight: "700",
            fontSize: 20,
            paddingTop: 25,
            marginLeft: 20,
          }}
        >
          Lastname: {lastName}
        </Text>

        <Text
          style={{
            color: "#0F0F0F",
            fontWeight: "700",
            fontSize: 20,
            paddingTop: 25,
            marginLeft: 20,
          }}
        >
          Email: {email}
        </Text>

        <Text
          style={{
            color: "#0F0F0F",
            fontWeight: "700",
            fontSize: 20,
            paddingTop: 25,
            marginLeft: 20,
          }}
        >
          Category: {categories}
        </Text>

        <Text
          style={{
            color: "#0F0F0F",
            fontWeight: "700",
            fontSize: 20,
            paddingTop: 25,
            marginLeft: 20,
          }}
        >
          Address:{address}, {city}, {state}, {country}
        </Text>
      </View>

      <TouchableOpacity
        style={{ width: 315, paddingTop: 10 }}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <View style={styles.loginButton}>
          <Text style={styles.loginText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ width: 315, paddingTop: 2 }}
        onPress={() => navigation.navigate("changePassword")}
      >
        <View style={styles.loginButton}>
          <Text style={styles.loginText}>Change Password</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#54B435",
    marginHorizontal: 10,
    borderRadius: 50,
  },
  loginText: {
    textAlign: "center",
    color: "#0F0F0F",
    fontWeight: "600",
    fontSize: 15,
  },
});
