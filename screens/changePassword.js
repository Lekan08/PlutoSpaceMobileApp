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

import { Loader, InnerLoader } from "../components/loader";

export default function ChangePassword({ navigation }) {
  const [usernamex, getUsername] = useState("");
  const [currentPasswordx, getCurrentPassword] = useState("");
  const [newPasswordx, getNewPassword] = useState("");
  const [newRPasswordx, getRNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePress = () => {
    setLoading(true);
    const raw = JSON.stringify({
      username: usernamex,
      password: currentPasswordx,
      newPassword: newPasswordx,
    });
    const myHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const url = "https://tarastoreservice.plutospace.space";

    fetch(`${url}/users/changePass`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status === "SUCCESS") {
          const navigatee = () => {
            navigation.navigate("Login", { replace: true });
          };
          setToastObject({
            status: result.status,
            message: result.message,
            open: true,
            type: "success",
            change: Math.floor(Math.random() * 100),
            onPress: navigatee,
          });
        } else {
          setToastObject({
            status: result.status,
            message: result.message,
            open: true,
            type: "success",
            change: Math.floor(Math.random() * 100),
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const clickHandler = () => {
    if (
      usernamex.length === 0 ||
      usernamex.length === "" ||
      currentPasswordx.length === 0 ||
      currentPasswordx.length === "" ||
      newPasswordx.length === 0 ||
      newPasswordx.length === "" ||
      newRPasswordx.length === 0 ||
      newRPasswordx.length === ""
    ) {
      Alert.alert("EMPTY_TEXTFIELDS", "Fill empty textfields");
    }
    // if(newPasswordx !== newRPasswordx){
    //     Alert.Alert("passwords don't match")
    // }
    else handlePress();
  };

  return (
    <View>
      <ScrollView>
        {/* <Image source={require("../images/house_of_tara_logo.png")} /> */}

        <View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "900",
              color: "#ffffff",
              paddingHorizontal: 0,
              paddingTop: 40,
              fontFamily: "serif",
              width: 300,
            }}
          >
            Change Password
          </Text>
        </View>
        <Text style={styles.inputText}>Username:</Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="default"
          value={usernamex}
          onChangeText={(value) => getUsername(value)}
          style={styles.input}
          placeholderTextColor={"#777"}
        />
        <Text style={styles.inputText}>Current password:</Text>
        <TextInput
          placeholder="Enter current Password"
          value={currentPasswordx}
          onChangeText={(value) => getCurrentPassword(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />
        <Text style={styles.inputText}>New password:</Text>
        <TextInput
          placeholder="Enter a new Password"
          value={newPasswordx}
          onChangeText={(value) => getNewPassword(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />
        <Text style={styles.inputText}>Confirm new password:</Text>
        <TextInput
          placeholder="Retype new Password"
          value={newRPasswordx}
          onChangeText={(value) => getRNewPassword(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />
        <TouchableOpacity onPress={clickHandler}>
          <View
            style={[
              styles.changePassButton,
              { flexDirection: "row", justifyContent: "center" },
            ]}
          >
            <Text style={styles.inputText}>Change password</Text>
            <InnerLoader animating={loading} color="#fff" size="small" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    width: 300,
    color: "#fff",
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  changePassButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: 50,
  },
  inputText: {
    textAlign: "center",
    color: "#fff",
  },
});
