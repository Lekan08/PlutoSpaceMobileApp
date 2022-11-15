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
// import Header from "./components/header";
// import TodoItem from "./components/todoItem";
// import AddTodo from "./components/addTodo";
// import Sandbox from "./components/sandbox";

export default function ForgotPassword({ navigation }) {
  const [emailx, setEmail] = useState("");

  const handlePress = () => {
    const raw = JSON.stringify({
      email: emailx,
    });
    const myHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
  };

  const url = "https://tarastoreservice.plutospace.space";

  fetch(`${url}/users/doLogin`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if (result.status === "SUCCESS") {
        Alert.alert(result.status, result.message);
        navigation.navigate("Dashboard", { replace: true });
        //navigate("/authentication/company-Registration", { replace: true });
      } else {
        Alert.alert(result.status, result.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  const clickHandler = () => {
    if (emailx.length === 0 || emailx === "") {
      Alert.alert("You need to enter an Email to continue");
    } else {
      handlePress();
    }
  };

  return (
    // <Sandbox />
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image source={require("../images/house_of_tara_logo.png")} />
        </View>
        <View style={{ borderRadius: 5 }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "900",
              color: "#ffffff",
              paddingHorizontal: 0,
              paddingTop: 30,
              fontFamily: "serif",
              width: 300,
            }}
          >
            FORGOTTEN YOUR PASSWORD?
          </Text>
        </View>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontWeight: "50",
            paddingHorizontal: 0,
            paddingTop: 10,
            fontFamily: "serif",
            width: 200,
          }}
        >
          Enter the email attached to your account to reset your password.
        </Text>
        <View style={{ paddingTop: 40 }}>
          <Text style={styles.inputText}></Text>
          <TextInput
            keyboardType="default"
            placeholder="Email"
            value={emailx}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />

          <TouchableOpacity onPress={clickHandler}>
            <View style={styles.submitButton}>
              <Text style={styles.submitText}>SEND INSTRUCTIONS</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View>
      {people.map((item) => {
        return (
          <View key={item.key}>
            <Text style={styles.item}>{item.name}</Text>
          </View>
        );
      })}
    </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#0F0F0F",
  // },
  // content: {
  //   padding: 40,
  // },
  // list: { marginTop: 20 },
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    alignItems: "center",
    paddingTop: 60,
    // justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    width: 300,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  submitButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: 50,
  },
  submitText: {
    textAlign: "center",
    color: "#fff",
  },
  inputText: {
    marginTop: 10,
    alignSelf: "center",
    color: "#fff",
  },
  item: {
    padding: 30,
    marginTop: 24,
    backgroundColor: "#F96D02",
    fontSize: 24,
    marginHorizontal: 10,
  },
});
