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
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { REACT_APP_ZAVE_URL, FLUTTER_AUTH_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { horizontalScale, moderateScale, verticalScale } from "../../Metrics";
import { Loader, InnerLoader } from "../components/loader";
// import GHeaders from "../getHeader";
// import PHeaders from "../postHeader";

export default function Initial({ navigation }) {
  const [num, setNum] = useState(0);
  const [input, setInput] = useState(true);
  const [loading, setLoading] = useState(true);
  const handlePress = () => {
    if (num === 3) {
      navigation.navigate("Login");
    } else {
      async function fetchData() {
        console.log("nowwww");
        let usernamex;
        let passwordx;
        // getting data
        try {
          usernamex = JSON.parse(await AsyncStorage.getItem("username"));
          passwordx = JSON.parse(await AsyncStorage.getItem("password"));
          console.log(usernamex);
          console.log(passwordx);
          if (
            usernamex === "null" ||
            usernamex === null ||
            passwordx === "null" ||
            passwordx === null
          ) {
            return navigation.navigate("Appintro");
          }
        } catch (error) {
          console.log(error);
        }
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
              setLoading(false);
              // storing data
              await AsyncStorage.getItem("rexxdex1").then((resultt) => {
                console.log(`enteredd: ${resultt}`);
                const storeUser = async (value) => {
                  try {
                    await AsyncStorage.setItem(
                      "userInfo",
                      JSON.stringify(value)
                    );
                    await AsyncStorage.setItem(
                      "userOtherDets",
                      JSON.stringify(value.otherDetailsDTO)
                    );
                    await AsyncStorage.setItem(
                      "BirthDayStatus",
                      JSON.stringify(value.wishBirthday)
                    );
                    console.log("done setting");
                    await navigation.navigate("Home", { replace: true });
                  } catch (error) {
                    console.log(error);
                  }
                };
                storeUser(result);
              });
            } else {
              setNum(num + 1);
              setInput(!input);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchData();
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handlePress();
    }
    return () => {
      isMounted = false;
    };
  }, [input]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 100 }}>
        <Image
          source={require("../images/house_of_tara_logo.png")}
          //   style={{ height: 50, width: 50 }}
        />
        <InnerLoader animating={loading} color="#fff" size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 60,
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: verticalScale(20),
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    width: horizontalScale(300),
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(50),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    width: horizontalScale(300),
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(50),
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: "90%",
    color: "#fff",
  },
  loginButton: {
    padding: 15,
    marginTop: verticalScale(30),
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: moderateScale(20),
  },
  loginText: {
    textAlign: "center",
    color: "#fff",
  },
  inputText: {
    marginTop: verticalScale(10),
    alignSelf: "center",
    color: "#F96D02",
  },
  item: {
    padding: 30,
    marginTop: verticalScale(24),
    backgroundColor: "#F96D02",
    fontSize: moderateScale(24),
    marginHorizontal: 10,
  },
  link: {
    marginTop: verticalScale(10),
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
