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
export default function Login({ navigation }) {
  const [emailx, setEmail] = useState("");
  const [cpasswordx, setCpassword] = useState("");
  const [newpasswordx, setNewpassword] = useState("");
  const [confirmpasswordx, setConfirmpassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handlePress = () => {
    const raw = JSON.stringify({
      email: emailx,
    
    });
    const myHeaders = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };


    const url = "https://tarastoreservice.plutospace.space";

    fetch(`${url}/users/doLogin`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            Alert.alert(result.status, result.message, [{text: "Continue", onPress:() =>{
            navigation.navigate("Home", {replace: true})  
            }}]);
          } else {
            Alert.alert(result.status, result.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    // const raw = JSON.stringify({
    //   username: usernamex,
    //   password: passwordx,
    // });
    // const myHeaders = {
    //   "Accept": "application/json",
    //   "Content-Type": "application/json",
    // };
    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    // };
    // fetch("https://mywebsite.com/endpoint/", requestOptions)
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // .catch((err) => {
    //   console.log(err);
    //  });
  };

  const clickHandler = () => {
    // navigation.navigate("Home");
    if (
      emailx.length === 0 ||
      emailx === "" ||
      cpasswordx.length === 0 ||
      cpasswordx === "" ||
      newpasswordx.length === 0 ||
      newpasswordx === "" ||
      confirmpasswordx.length === 0 ||
      confirmpasswordx === "" 
    ) {
      Alert.alert("Damm", "You can't fuckin leave this place empty dude!!");
    } else {
      handlePress();
    }

    //fetching api
    // const raw = JSON.stringify({
    //   username: usernamex,
    //   password: passwordx,
    // });
    // const myHeaders = {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // };

    // const url = "https://tarastoreservice.plutospace.space";
    // fetch(url + "http://users/doLogin", {
    //   method: "GET",
    //   headers: myHeaders,
    //   body: raw,
    // });
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
              paddingTop: 40,
              fontFamily: "serif",
              width: 300,
            }}
          >
            Let’s Help You Find Your Match
          </Text>
        </View>
        <Text style={{ color: "#ffffff" }}>
          Meeting the perfect one shouldn’t be a hassle.
        </Text>
        <View style={{ paddingTop: 40 }}>
          <Text style={styles.inputText}>Email:</Text>
          <TextInput
            keyboardType="default"
            placeholder="email"
            value={emailx}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
              <Text style={{
                  variant:"button",
                    fontSize:"60%",
                    align:"right",
                    onClick:{togglePassword},
                    color:"#ffff"
              }}>
                    show password
                  </Text>
          <Text style={styles.inputText}> Current Password:</Text>
          <TextInput
           type={passwordShown ? "text" : "password"}
            placeholder="Currentpassword"
            value={cpasswordx}
            onChangeText={(value) => setCpassword(value)}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}> New Password:</Text>
           <TextInput
           type={passwordShown ? "text" : "password"}
            placeholder="New Password"
            value={newpasswordx}
            onChangeText={(value) => setNewpassword(value)}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}> Confirm Password:</Text>
           <TextInput
           type={passwordShown ? "text" : "password"}
            placeholder="Currentpassword"
            value={confirmpasswordx}
            onChangeText={(value) => setConfirmpassword(value)}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={"#777"}
          />
          {/* <TextInput label={passwordx} right={ <TextInput.Icon color="grey" name={'eye'} />} /> */}
        
          <TouchableOpacity onPress={clickHandler}>
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>LOGIN</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              paddingTop: 15,
              flexDirection: "row",
            }}
          >
            <Text style={styles.inputText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Welcome")}
            >
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: "center",
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
  link: {
    marginTop: 10,
    color: "#F96D02",
  },
});
{
  /* <View>
      {people.map((item) => {
        return (
          <View key={item.key}>
            <Text style={styles.item}>{item.name}</Text>
          </View>
        );
      })}
    </View> */
}
