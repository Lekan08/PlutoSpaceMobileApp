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
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { PayWithFlutterwave } from "flutterwave-react-native";
// or import PayWithFlutterwave from 'flutterwave-react-native';
import { REACT_APP_ZAVE_URL, FLUTTER_AUTH_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loader, InnerLoader } from "../components/loader";
import { Toast } from "../components/alert";

export default function Login({ navigation }) {
  const [usernamex, setUsername] = useState("");
  const [passwordx, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});

  const [passwordShown, setPasswordShown] = useState(true);

  const handlePress = () => {
    setLoading(true);
    const raw = JSON.stringify({
      username: usernamex.toLowerCase(),
      password: passwordx,
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

    fetch(`${proREACT_APP_ZAVE_URL}/users/doLogin`, requestOptions)
      .then(async (res) => {
        // console.log(res.headers);;;;
        const aToken = res.headers.get("token-1");
        AsyncStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status === "SUCCESS") {
          // storing data
          const storeUser = async (value) => {
            try {
              await AsyncStorage.setItem("userInfo", JSON.stringify(value));
            } catch (error) {
              console.log(error);
            }
          };
          storeUser(result.data);
          setToastObject({
            status: result.status,
            message: result.message,
            open: true,
            type: "success",
            change: Math.floor(Math.random() * 100),
          });
          navigation.navigate("Home", { replace: true });
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
      usernamex === "" ||
      passwordx.length === 0 ||
      passwordx === ""
    ) {
      // Alert.alert("EMPTY_TEXTFIELDS", "Fill empty textfields");
      setToastObject({
        status: "EMPTY_TEXTFIELDS",
        message: "Fill empty textfields",
        open: true,
        type: "error",
        change: Math.floor(Math.random() * 100),
      });
    } else {
      handlePress();
    }
  };

  /* An example function called when transaction is completed successfully or canceled */
  const handleOnRedirect = (data) => {
    console.log(data);
  };

  /* An example function to generate a random transaction reference */
  const generateTransactionRef = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  return (
    // <Sandbox />
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                paddingTop: 40,
                // fontFamily: "serif",
                width: 300,
              }}
            >
              Let’s Help You Find Your Match
            </Text>
          </View>
          <Text style={{ color: "#F96D02" }}>
            Meeting the perfect one shouldn’t be a hassle.
          </Text>
          <View style={{ paddingTop: 40 }}>
            <Text style={styles.inputText}>Username:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Username"
              value={usernamex}
              onChangeText={(value) => setUsername(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />

            <Text style={styles.inputText}>Password:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                value={passwordx}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={passwordShown}
                placeholderTextColor={"#777"}
                style={styles.inputField}
                name="password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                enablesReturnKeyAutomatically
              />
              <Pressable
                onPress={() => {
                  passwordShown
                    ? setPasswordShown(false)
                    : setPasswordShown(true);
                }}
              >
                <Icon
                  name={passwordShown ? "eye-off" : "eye"}
                  size={22}
                  color="grey"
                />
              </Pressable>
            </View>
            {/* <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: `${FLUTTER_AUTH_KEY}`,
              customer: {
                email: "user@gmail.com",
              },
              amount: 2000,
              currency: "NGN",
              payment_options: "card",
            }}
          />
          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: `${FLUTTER_AUTH_KEY}`,
              customer: {
                email: "customer-email@example.com",
              },
              amount: 2000,
              currency: "NGN",
              payment_options: "card",
            }}
            customButton={(props) => (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={props.onPress}
                isBusy={props.isInitializing}
                disabled={props.disabled}
              >
                <Text style={styles.loginText}>Pay $500</Text>
              </TouchableOpacity>
            )}
          /> */}
            <TouchableOpacity onPress={clickHandler}>
              <View
                style={[
                  styles.loginButton,
                  { flexDirection: "row", justifyContent: "center" },
                ]}
              >
                <Text style={styles.loginText}>LOGIN</Text>
                <InnerLoader animating={loading} color="#fff" size="small" />
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={{ alignItems: "center" }}>
            <View
              style={{
                paddingTop: 15,
                flexDirection: "row",
              }}
            >
              <Text style={styles.inputText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
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
          </View> */}
        </ScrollView>
        {/* <Loader animating={true} /> */}
        {/* <Toast /> */}
      </TouchableWithoutFeedback>
      <Toast
        status={toastObject.status}
        message={toastObject.message}
        open={toastObject.open}
        type={toastObject.type}
        change={toastObject.change}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282A3A",
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
  inputContainer: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    width: 300,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: "90%",
    color: "#fff",
  },
  loginButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: 20,
  },
  loginText: {
    textAlign: "center",
    color: "#fff",
  },
  inputText: {
    marginTop: 10,
    alignSelf: "center",
    color: "#F96D02",
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
// {
//   <View>
//       {people.map((item) => {
//         return (
//           <View key={item.key}>
//             <Text style={styles.item}>{item.name}</Text>
//           </View>
//         );
//       })}
//     </View>
// }
