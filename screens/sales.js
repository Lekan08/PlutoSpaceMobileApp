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
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import { PayWithFlutterwave } from "flutterwave-react-native";
// or import PayWithFlutterwave from 'flutterwave-react-native';
import { REACT_APP_TARA_URL, FLUTTER_AUTH_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loader, InnerLoader } from "../components/loader";
import { Toast } from "../components/alert";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Picker } from "@react-native-picker/picker";
import AllCountriesAndStates from "../countries-states-master/countries";

const windowWidth = Dimensions.get("screen").width;

export default function Sales({ navigation }) {
  const [usernamex, setUsername] = useState("");
  const [passwordx, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});

  const [passwordShown, setPasswordShown] = useState(true);

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const [firstnamex, setFirstname] = useState("");
  const [lastnamex, setLastname] = useState("");
  const [titlex, setTitle] = useState("");
  const [emailx, setEmail] = useState("");
  const [cityx, setCity] = useState("");
  const [addressx, setAddress] = useState("");
  // const [countryx, setCountryx] = useState("");

  const data = AlCountry.map((data) => {
    return { key: data.code3, value: data.name };
  });
  const [allStates, setAllStates] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");

  const handleOnChangeRCCountry = (valuex) => {
    console.log(valuex);
    if (valuex) {
      const filteredItems = AlCountry.filter((item) => item.name === valuex);
      console.log(filteredItems);
      if (filteredItems[0].states || filteredItems[0].states.length !== 0) {
        setAllStates(filteredItems[0].states);
        setResidentialCountry(valuex);
      } else {
        setAllStates([]);
      }
    }
  };

  const handleOnChangeRCState = (valuex) => {
    setResidentialState(valuex);
  };

  let [name, setName] = useState("anthony");

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

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

    fetch(`${REACT_APP_TARA_URL}/users/doLogin`, requestOptions)
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
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderColor: "#f96d02",
            padding: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              color: "#F96D02",
              paddingHorizontal: 10,
              // fontFamily: "serif",
              width: 300,
            }}
          >
            Make a sale
          </Text>
        </View>
        {/* <Text style={{ color: "#F96D02" }}>
          Meeting the perfect one shouldn’t be a hassle.
        </Text> */}
        <View style={{ paddingTop: 10, justifyContent: "center" }}>
          <Text style={styles.inputText}>Client:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={{
                color: "#777",
                margin: -5,
              }}
              itemStyle={{
                backgroundColor: "#F96D02",
                color: "#000",
                fontFamily: "Ebrima",
                fontSize: 19,
              }}
              selectedValue={residentialCountryx}
              onValueChange={(newValue) => setResidentialCountry(newValue)}
            >
              <Picker.Item label="Select Client" value="" />
              {AlCountry.map((apic) => (
                <Picker.Item
                  label={apic.name}
                  key={apic.code3}
                  value={apic.name}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.inputText}>Comment:</Text>
          <TextInput
            keyboardType="default"
            // placeholder="Comment"
            value={usernamex}
            multiline
            numberOfLines={5}
            onChangeText={(value) => setUsername(value)}
            style={styles.txAInput}
            placeholderTextColor={"#777"}
          />
          <View style={{ marginVertical: 30, height: 1, width: "80%" }} />
          <Button title="button" onPress={handleModal} />
          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={styles.modalView}>
                <View
                  style={{
                    alignItems: "flex-start",
                    backgroundColor: "#fff",
                    // borderBottomWidth: 1,
                    borderColor: "#f96d02",
                    // padding: 2,
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="highlight-remove"
                    size={30}
                    onPress={handleModal}
                    color="#f96d02"
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "#f96d02",
                      padding: 20,
                      borderRadius: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}
                  >
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#fff",
                      }}
                    >
                      Add User
                    </Text>
                  </View>
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>
                    First Name:
                  </Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="First Name"
                    value={firstnamex}
                    onChangeText={(value) => setFirstname(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Last Name:
                  </Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="Last Name"
                    value={lastnamex}
                    onChangeText={(value) => setLastname(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Title:
                  </Text>
                  <View style={styles.pickerContainer2}>
                    <Picker
                      style={{
                        color: "#777",
                        margin: -5,
                      }}
                      selectedValue={titlex}
                      onValueChange={(newValue) => setTitle(newValue)}
                    >
                      <Picker.Item label="Select Country" value="" />
                      <Picker.Item label="Mr" value="Mr" />
                      <Picker.Item label="Mrs" value="Mrs" />
                      <Picker.Item label="Miss" value="Miss" />
                    </Picker>
                  </View>
                  <Text style={styles.inputText}>Email:</Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="Email"
                    value={emailx}
                    onChangeText={(value) => setEmail(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>Country:</Text>
                  <View style={styles.pickerContainer2}>
                    <Picker
                      style={{
                        color: "#777",
                        margin: -5,
                      }}
                      itemStyle={{
                        backgroundColor: "#F96D02",
                        color: "#000",
                        fontFamily: "Ebrima",
                        fontSize: 19,
                      }}
                      selectedValue={residentialCountryx}
                      onValueChange={(newValue) =>
                        handleOnChangeRCCountry(newValue)
                      }
                    >
                      <Picker.Item label="Select Country" value="" />
                      {AlCountry.map((apic) => (
                        <Picker.Item
                          label={apic.name}
                          key={apic.code3}
                          value={apic.name}
                        />
                      ))}
                    </Picker>
                  </View>
                  <Text style={styles.inputText}>State:</Text>
                  <View style={styles.pickerContainer2}>
                    <Picker
                      style={{
                        color: "#777",
                        margin: -5,
                      }}
                      selectedValue={residentialStatex}
                      onValueChange={(newValue) =>
                        handleOnChangeRCState(newValue)
                      }
                    >
                      <Picker.Item label=" Select State" value="" />
                      {allStates.map((apic) => (
                        <Picker.Item
                          label={apic.name}
                          key={apic.code}
                          value={apic.name}
                        />
                      ))}
                    </Picker>
                  </View>
                  <Text style={styles.inputText}>City:</Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="City"
                    value={cityx}
                    onChangeText={(value) => setCity(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>House Address:</Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="Address"
                    multiline
                    value={addressx}
                    onChangeText={(value) => setAddress(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <TouchableOpacity onPress={clickHandler}>
                    <View
                      style={[
                        styles.loginButton,
                        { flexDirection: "row", justifyContent: "center" },
                      ]}
                    >
                      <Text style={styles.loginText}>SAVE</Text>
                      <InnerLoader
                        animating={loading}
                        color="#fff"
                        size="small"
                      />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <View
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTopWidth: 1,
              borderColor: "#777",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    width: "40%",
                  }}
                >
                  Product
                </Text>
                <Text
                  style={{
                    width: "10%",
                  }}
                >
                  Qtyoooooooooooooo
                </Text>
                <Text
                  style={{
                    width: "10%",
                  }}
                >
                  Taxoooooooooooooooo
                </Text>
                <Text
                  style={{
                    width: "20%",
                  }}
                >
                  Priceooooooooooooooooo
                </Text>
                <Text
                  style={{
                    width: "20%",
                  }}
                >
                  Total Priceooooooooooooooooo
                </Text>
              </View>
            </View>
          </View>
          <Button title="print" onPress={generatePdf} />
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
      </ScrollView>
      {/* <Loader animating={true} /> */}
      {/* <Toast /> */}
      {/* </TouchableWithoutFeedback> */}
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
    backgroundColor: "#fff",
    // alignItems: "center",
    paddingTop: 5,
    // justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    padding: 20,
  },
  txAInput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    // width: "90%",
    // marginHorizontal: 10,
    height: 100,
    textAlignVertical: "top",
    color: "#777",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    // width: "90%",
    // marginHorizontal: 10,
    textAlignVertical: "top",
    color: "#777",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#777",
    // maxHeight: 40,
    margin: 5,
    width: windowWidth - 10,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 5,
    // flexDirection: "row",
    // justifycontent: "center",
  },
  pickerContainer2: {
    borderWidth: 1,
    borderColor: "#777",
    // maxHeight: 40,
    margin: 5,
    // width: windowWidth - 10,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 5,
    // flexDirection: "row",
    // justifycontent: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    width: windowWidth - 10,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: "90%",
    color: "#777",
  },
  loginButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  loginText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  inputText: {
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#333",
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
  modalView: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: "70%",
    minHeight: 200,
    maxHeight: 700,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
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
