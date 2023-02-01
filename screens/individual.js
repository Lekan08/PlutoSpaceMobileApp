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
  Form,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { ToastAlert } from "../components/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { horizontalScale, moderateScale, verticalScale } from "../../Metrics";
import AllCountriesAndStates from "../countries-states-master/countries";
import {
  REACT_APP_ZAVE_URL,
  REACT_APP_LOUGA_URL,
  FLUTTER_AUTH_KEY,
} from "@env";
import { Loader, InnerLoader } from "../components/loader";

export default function Individual({ navigation }) {
  const [firstnamex, setFirstname] = useState("");
  const [lastnamex, setLastname] = useState("");
  const [othernamex, setOthername] = useState("");
  const [titlex, setTitle] = useState("");
  const [phonenumberx, setPhonenumber] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [emailx, setEmail] = useState("");
  const [cityx, setCity] = useState("");
  const [addressx, setAddress] = useState("");
  const [Input, setInput] = useState("");
  const [userx, setUser] = useState([]);
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [loading, setLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});
  const [userDatax, setUserData] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);
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
  // And this handle my button that triger the API call

  const handlePress = () => {
    async function fetchData() {
      setLoading(true);
      setDisabledButton(true);
      console.log("nowwww");

      let requestOptions;
      // getting data
      try {
        const userDataa = JSON.parse(await AsyncStorage.getItem("userInfo"));
        const userData = userDataa.data;
        let GeneToken = await AsyncStorage.getItem("rexxdex1");
        let apiToken = await AsyncStorage.getItem("rexxdex");
        console.log(GeneToken);

        //   if (apiToken !== "null" && apiToken !== null) {
        //     await AsyncStorage.setItem("rexxdex1", apiToken);
        //   }
        let ogrIDx = userData.orgID;
        let personalIDx = userData.personalID;
        const raw = JSON.stringify([
          {
            orgID: ogrIDx,
            fname: firstnamex,
            lname: lastnamex,
            oname: othernamex,
            title: titlex,
            street: addressx,
            city: cityx,
            state: residentialStatex,
            country: residentialCountryx,
            email: emailx,
            createdBy: personalIDx,
            accountOwnerID: personalIDx,
          },
        ]);
        console.log(raw);
        let myHeaders;
        const token = await AsyncStorage.getItem("rexxdex1");
        myHeaders = {
          "Content-Type": "application/json",
          "Token-1": `${token}`,
        };
        requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        console.log(requestOptions);
        setUserData(userDataa);
      } catch (error) {
        console.log(error);
      }

      await fetch(
        `${process.env.REACT_APP_LOUGA_URL}/individual/add`,
        requestOptions
      )
        .then(async (res) => {
          const storeUser = async (value) => {
            try {
              const aToken = value.headers.get("token-1");
              if (
                aToken === "null" ||
                aToken === null ||
                aToken === undefined ||
                aToken === ""
              ) {
                // sup[Danga]
              } else {
                await AsyncStorage.setItem("rexxdex1", aToken);
              }
            } catch (error) {
              console.log(error);
            }
          };
          storeUser(res);
          const resultres = await res.text();
          if (
            resultres === null ||
            resultres === undefined ||
            resultres === ""
          ) {
            return {};
          }
          return JSON.parse(resultres);
        })
        .then((result) => {
          console.log(result);
          setLoading(false);
          setDisabledButton(false);
          if (result.message === "Expired Access") {
            navigation.navigate("initial");
          }
          if (result.message === "Token Does Not Exist") {
            navigation.navigate("initial");
          }
          if (result.message === "Unauthorized Access") {
            navigation.navigate("initial");
          }
          if (result.status === "SUCCESS") {
            setFirstname("");
            setLastname("");
            setOthername("");
            setEmail("");
            setTitle("");
            setPhonenumber("");
            setResidentialCountry("");
            setResidentialState("");
            setResidentialCountry("");
            setResidentialState("");
            setCity("");
            setAddress("");
            setToastObject({
              status: result.status,
              message: result.message,
              open: true,
              type: "success",
              change: Math.floor(Math.random() * 100),
              onPress: () => navigation.goBack(),
            });
            // navigation.navigate("Profile", { replace: true });
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
          setDisabledButton(false);
          console.log(error);
        });
      return () => {
        isMounted = false;
      };
    }
    fetchData();
  };
  // This validates my form
  const clickHandler = () => {
    if (
      firstnamex.length === 0 ||
      firstnamex === "" ||
      lastnamex.length === 0 ||
      lastnamex === "" ||
      titlex.length === 0 ||
      titlex === "" ||
      phonenumberx.length === 0 ||
      phonenumberx === "" ||
      emailx.length === 0 ||
      emailx === "" ||
      cityx.length === 0 ||
      cityx === "" ||
      addressx.length === 0 ||
      addressx === ""
    ) {
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
  // TitleData
  const titlez = [
    { value: "Bishop", key: 1 },
    { value: "Chancellor", key: 2 },
    { value: "Comrade", key: 3 },
    { value: "Doctor", key: 4 },
    { value: "Engineer", key: 5 },
    { value: "Excellency", key: 6 },
    { value: "Honorable", key: 7 },
    { value: "Imam", key: 8 },
    { value: "Master", key: 9 },
    { value: "Miss", key: 10 },
    { value: "Reverend", key: 11 },
    { value: "Pastor", key: 12 },
    { value: "Professor", key: 13 },
    { value: "Pope", key: 14 },
    { value: "Vice", key: 15 },
    { value: "Mr", key: 16 },
    { value: "Mrs", key: 17 },
    { value: "Others", key: 18 },
  ];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              elevation: 5,
              backgroundColor: "#ffffff",
              marginVertical: 10,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(30),
                fontWeight: "bold",
                color: "#F96D02",
                paddingHorizontal: 10,
                // paddingTop: 10,
                fontFamily: "serif",
                // width: 300,
                // textAlign: "center",
              }}
            >
              CREATE CLIENT
            </Text>
          </View>
          <View style={styles.subContainer}>
            {/* <View>
              <Image source={require("../images/house_of_tara_logo.png")} />
            </View> */}

            <View style={{ paddingTop: 10 }}>
              <Text style={styles.inputText}>First Name</Text>
              <TextInput
                keyboardType="default"
                placeholder="First Name"
                value={firstnamex}
                onChangeText={(value) => setFirstname(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>Last Name</Text>
              <TextInput
                keyboardType="default"
                placeholder="Last Name"
                value={lastnamex}
                onChangeText={(value) => setLastname(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>Other Name</Text>
              <TextInput
                keyboardType="default"
                placeholder="(Optional)"
                value={othernamex}
                onChangeText={(value) => setOthername(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>Title</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={{
                    color: "#0f0f0f",
                  }}
                  itemStyle={{
                    backgroundColor: "#0f0f0f",
                    color: "#000",
                    fontFamily: "Ebrima",
                    fontSize: moderateScale(19),
                  }}
                  selectedValue={titlex}
                  onValueChange={(newValue) => setTitle(newValue)}
                >
                  <Picker.Item label="Select Title" value="" />

                  {titlez.map((apic) => (
                    <Picker.Item
                      label={apic.value}
                      key={apic.key}
                      value={apic.value}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={styles.inputText}>Email</Text>
              <TextInput
                keyboardType="default"
                placeholder="Email"
                value={emailx}
                onChangeText={(value) => setEmail(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>Phone Number</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Phone Number"
                value={phonenumberx}
                onChangeText={(value) => setPhonenumber(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>Country</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={{
                    color: "#0f0f0f",
                  }}
                  itemStyle={{
                    backgroundColor: "#0f0f0f",
                    color: "#000",
                    fontFamily: "Ebrima",
                    fontSize: moderateScale(19),
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
              <Text style={styles.inputText}>State</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={{ color: "#0f0f0f" }}
                  selectedValue={residentialStatex}
                  onValueChange={(newValue) => handleOnChangeRCState(newValue)}
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
              <Text style={styles.inputText}>City</Text>
              <TextInput
                keyboardType="default"
                placeholder="City"
                value={cityx}
                onChangeText={(value) => setCity(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>House Address</Text>
              <TextInput
                keyboardType="default"
                placeholder="Address"
                multiline
                value={addressx}
                onChangeText={(value) => setAddress(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <TouchableOpacity
                disabled={disabledButton}
                onPress={clickHandler}
              >
                <View
                  style={[
                    styles.loginButton,
                    { flexDirection: "row", justifyContent: "center" },
                  ]}
                >
                  <Text style={styles.loginText}>Save</Text>
                  <InnerLoader animating={loading} color="#fff" size="small" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <Loader animating={loading1} color="#fff" size="small" />
      <ToastAlert
        status={toastObject.status}
        message={toastObject.message}
        open={toastObject.open}
        type={toastObject.type}
        change={toastObject.change}
        onPress={toastObject.onPress}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: 10,
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    paddingTop: 10,
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: verticalScale(20),
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0f0f0f",
    padding: 15,
    margin: 5,
    fontSize: moderateScale(18),
    width: horizontalScale(300),
    color: "#0f0f0f",
    paddingHorizontal: 20,
    borderRadius: moderateScale(5),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#0f0f0f",
    padding: 15,
    margin: 5,
    width: horizontalScale(300),
    color: "#0f0f0f",
    paddingHorizontal: 20,
    borderRadius: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: "90%",
    color: "#0f0f0f",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#0f0f0f",
    margin: 5,
    width: horizontalScale(300),
    color: "#0f0f0f",
    paddingHorizontal: 20,
    borderRadius: moderateScale(5),
  },
  loginButton: {
    padding: 15,
    marginTop: verticalScale(30),
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: moderateScale(10),
  },
  loginText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  inputText: {
    marginTop: verticalScale(10),
    alignSelf: "center",
    color: "#0F0F0F",
    fontWeight: "bold",
    // marginLeft: 40,
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
  itemStyle: {
    backgroundColor: "#F96D02",
    color: "#000",
    fontFamily: "Ebrima",
    fontSize: moderateScale(19),
  },
});
