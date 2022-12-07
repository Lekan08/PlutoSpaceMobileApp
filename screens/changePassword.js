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

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { PayWithFlutterwave } from "flutterwave-react-native";
// or import PayWithFlutterwave from 'flutterwave-react-native';
import { REACT_APP_ZAVE_URL, FLUTTER_AUTH_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loader, InnerLoader } from "../components/loader";
import { ToastAlert } from "../components/alert";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
// import GHeaders from "../getHeader";
// import PHeaders from "../postHeader";
export default function ChangePassword({ navigation }) {
  const [usernamex, getUsername] = useState("");
  const [currentPasswordx, getCurrentPassword] = useState("");
  const [newPasswordx, getNewPassword] = useState("");
  const [newRPasswordx, getRNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});
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

    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/changepass`, requestOptions)
      .then(async (res) => {
        // console.log(res.headers);;;;  // storing data
        const storeUser = async (value) => {
          try {
            const aToken = value.headers.get("token-1");
            await AsyncStorage.setItem("rexxdex1", aToken);
          } catch (error) {
            console.log(error);
          }
        };
        storeUser(res);

        return res.json();
      })
      .then(async (result) => {
        setLoading(false);
        console.log(result);
        if (result.status === "SUCCESS") {
          // PHeaders();
          // GHeaders();
          // storing data
          await AsyncStorage.getItem("rexxdex1").then((resultt) => {
            console.log(`enteredd: ${resultt}`);
            const storeUser = async (value) => {
              try {
                await AsyncStorage.setItem(
                  "username",
                  JSON.stringify(usernamex)
                );
                await AsyncStorage.setItem(
                  "password",
                  JSON.stringify(passwordx)
                );
                await AsyncStorage.setItem(
                  "userInfo",
                  JSON.stringify(value.data)
                );
                await AsyncStorage.setItem(
                  "userOtherDets",
                  JSON.stringify(value.otherDetailsDTO)
                );
                await AsyncStorage.setItem(
                  "BirthDayStatus",
                  JSON.stringify(value.wishBirthday)
                );
                await navigation.navigate("Home", { replace: true });
              } catch (error) {
                console.log(error);
              }
            };
            storeUser(result);
            // setToastObject({
            //   status: result.status,
            //   message: result.message,
            //   open: true,
            //   type: "success",
            //   change: Math.floor(Math.random() * 100),
            // });
          });
        } else {
          // Alert.alert(result.status, result.message);
          setToastObject({
            status: result.status,
            message: result.message,
            open: true,
            type: "error",
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
      // Alert.alert("EMPTY_TEXTFIELDS", "Fill empty textfields");
      setToastObject({
        status: "EMPTY_TEXTFIELDS",
        message: "Fill empty textfields",
        open: true,
        type: "error",
        change: Math.floor(Math.random() * 100),
      });
    } else handlePress();
  };

  return (
    <View>
      <ScrollView>
        <View style={{ marginLeft: 50, marginTop: 50 }}>
          <Image source={require("../images/house_of_tara_logo.png")} />
        </View>

        <View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "900",
              color: "#F96D02",
              paddingHorizontal: 10,
              paddingTop: 40,
              fontFamily: "serif",
              width: 300,
              textAlign: "center",
            }}
          >
            Change Password
          </Text>
        </View>
        <Text style={styles.inputText}>Email:</Text>
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
            <Text
              style={{
                color: "#ffffffff",
              }}
            >
              Save
            </Text>
            <InnerLoader animating={loading} color="#fff" size="small" />
          </View>
        </TouchableOpacity>
        <ToastAlert
          status={toastObject.status}
          message={toastObject.message}
          open={toastObject.open}
          type={toastObject.type}
          change={toastObject.change}
        />
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
    borderRadius: 14,
  },
  changePassButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F96D02",
    marginHorizontal: 60,
    borderRadius: 14,
  },
  inputText: {
    textAlign: "center",
    color: "#F96D02",
    paddingTop: 10,
  },
});
