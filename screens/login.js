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
import { ToastAlert } from "../components/alert";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
// import GHeaders from "../getHeader";
// import PHeaders from "../postHeader";

export default function Login({ navigation }) {
  const [usernamex, setUsername] = useState("");
  const [passwordx, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});
  // const { allPHeaders: myHeaders } = PHeaders();
  // const { allGHeaders: miHeaders } = GHeaders();

  const [passwordShown, setPasswordShown] = useState(true);

  let [name, setName] = useState("anthony");

  const html = `
    <html>
      <body>
        <h1>Hi ${name}</h1>
        <p style="color: green;">55 packages are looking for fundingrun for detail2 vulnerabilities (1 high, 1 criticalTo address issues that do not require attention, run:npm audit fiTo address all issues, run:npm audit fix --forcRun  for details.</p>
        <p style="color: red;">Hello. Bonjour. Hola.</p>
        <p style="color: coral;">Hello. Bonjour. Hola.</p>
      </body>
    </html>
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  const handlePress = () => {
    setLoading(true);
    const raw = JSON.stringify({
      username: usernamex.toLowerCase(),
      password: passwordx,
    });
    console.log(raw);
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

    fetch(`${REACT_APP_ZAVE_URL}/login/dologin`, requestOptions)
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
                await AsyncStorage.setItem("userInfo", JSON.stringify(value));
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
    // navigation.navigate("Home", { replace: true });
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
              textContentType="username"
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
                textContentType="password"
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
            {/* <Button title="print" onPress={generatePdf} /> */}
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
        {/* <ToastAlert /> */}
      </TouchableWithoutFeedback>
      <ToastAlert
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
