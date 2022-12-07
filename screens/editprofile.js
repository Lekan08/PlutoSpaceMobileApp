import React, { useState, useEffect } from "react";
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
// KPURKISH👌👌👌👌
// KPURKISH👌👌👌👌
// KPURKISH👌👌👌👌
export default function EditProfile({ navigation }) {
  //Getting user info
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
  //Getting user info

  const handlePress = () => {
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
        if (result.status === "SUCCESS") {
          Alert.alert(result.status, result.message, [
            {
              text: "Continue",
              onPress: () => {
                navigation.navigate("Home", { replace: true });
              },
            },
          ]);
        } else {
          Alert.alert(result.status, result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clickHandler = () => {
    if (
      firstnamex.length === 0 ||
      firstnamex === "" ||
      lastnamex.length === 0 ||
      lastnamex === "" ||
      emailx.length === 0 ||
      emailx === "" ||
      cityx.length === 0 ||
      cityx === "" ||
      addressx.length === 0 ||
      addressx === ""
    ) {
      Alert.alert("Please fill all empty textfields");
    }
    // if(newPasswordx !== newRPasswordx){
    //     Alert.Alert("passwords don't match")
    // }
    else handlePress();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={require("../images/house_of_tara_logo.png")} />

        <View style={{ paddingBottom: 20, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "900",
              color: "#F96D02",
              paddingHorizontal: 5,
              paddingTop: 40,
              fontFamily: "serif",
              width: 300,
              marginLeft: 50,
            }}
          >
            Edit Profile
          </Text>
        </View>
        <Text style={styles.inputText}>First Name</Text>
        <TextInput
          placeholder="××××××"
          keyboardType="default"
          value={firstName}
          onChangeText={(value) => getUsername(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />
        <Text style={styles.inputText}>Last Name:</Text>
        <TextInput
          placeholder="××××××"
          keyboardType="default"
          value={lastName}
          onChangeText={(value) => getUsername(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />
        <Text style={styles.inputText}>Email:</Text>
        <TextInput
          placeholder="××××××××××××"
          keyboardType="default"
          value={lastName}
          onChangeText={(value) => getUsername(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />
        <Text style={styles.inputText}>Country:</Text>
        <TextInput
          placeholder="×××××××"
          keyboardType="default"
          value={lastName}
          onChangeText={(value) => getUsername(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />
        <Text style={styles.inputText}>State:</Text>
        <TextInput
          placeholder="××××××××"
          keyboardType="default"
          value={lastName}
          onChangeText={(value) => getUsername(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />
        <Text style={styles.inputText}>City:</Text>
        <TextInput
          placeholder="×××××××××"
          keyboardType="default"
          value={lastName}
          onChangeText={(value) => getUsername(value)}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={"#777"}
        />

        <TouchableOpacity onPress={clickHandler}>
          <View style={styles.changePassButton}>
            <Text style={styles.inputText}>Save</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    alignItems: "center",
    paddingTop: 60,
    justifyContent: "center",
    paddingBottom: 60,
  },
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
    borderRadius: 10,
  },
  changePassButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#7FB77E",
    marginHorizontal: 40,
    borderRadius: 15,
  },
  inputText: {
    textAlign: "center",
    color: "#F96D02",
    fontSize: 15,
  },
});
