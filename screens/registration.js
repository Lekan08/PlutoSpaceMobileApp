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
  Form,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// import SweetAlert from 'react-native-sweet-alert';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
// import SelectList from "../components/dropdown";
import AllCountriesAndStates from "../countries-states-master/countries";
import { REACT_APP_TARA_URL } from "@env";

import { Loader, InnerLoader } from "../components/loader";
import { Toast } from "../components/alert";
// import RNPickerSelect from "react-native-picker-select";
// import Header from "./components/header";
// import TodoItem from "./components/todoItem";
// import AddTodo from "./components/addTodo";
// import Sandbox from "./components/sandbox";
// import {Ionicons} from '@ex'
export default function Registration({ navigation, route }) {
  const [firstnamex, setFirstname] = useState("");
  const [lastnamex, setLastname] = useState("");
  const [emailx, setEmail] = useState("");
  const [cityx, setCity] = useState("");
  const [addressx, setAddress] = useState("");
  const [passwordx, setPassword] = useState("");
  const [rPasswordx, setRPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});
  // const [countryx, setCountryx] = useState("");

  const [passwordShown, setPasswordShown] = useState(true);
  const [rtPasswordShown, setRTPasswordShown] = useState(true);

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

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

  // const handleOnChangeNationality = (e) => {
  //   setNationality(e.target.value);
  // };

  const handlePress = () => {
    setLoading(true);
    const rdCartegory = route.params.cartegory;
    let cartegoryx = [];
    if (rdCartegory === "RETAILER") {
      cartegoryx = ["RETAILER"];
    } else if (rdCartegory === "DISTRIBUTOR") {
      cartegoryx = ["DISTRIBUTOR"];
    } else if (rdCartegory === "BOTH") {
      cartegoryx = ["DISTRIBUTOR", "RETAILER"];
    }
    console.log(cartegoryx);
    const raw = JSON.stringify({
      username: emailx,
      firstname: firstnamex,
      lastname: lastnamex,
      email: emailx.toLowerCase(),
      country: residentialCountryx,
      state: residentialStatex,
      city: cityx,
      address: addressx,
      password: passwordx,
      categories: cartegoryx,
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

    fetch(`${REACT_APP_TARA_URL}/users/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status === "SUCCESS") {
          // Alert.alert(result.status, result.message, [
          //   {
          //     text: "Continue",
          //     onPress: () => {
          //       navigation.navigate("Login", { replace: true });
          //     },
          //   },
          // ]);
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
      addressx === "" ||
      passwordx.length === 0 ||
      passwordx === "" ||
      rPasswordx.length === 0 ||
      rPasswordx === ""
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

    // SweetAlert.showAlertWithOptions({
    //   title: result.status,
    //   subTitle: result.message,
    //   confirmButtonTitle: 'OK',
    //   confirmButtonColor: '#000',
    //   otherButtonTitle: 'Cancel',
    //   otherButtonColor: '#dedede',
    //   backgroundColor: "#F96D02",
    //   style: 'success',
    //   cancellable: true
    // },
    //   callback => console.log('callback'));

    //fetching api
    // const raw = JSON.stringify({
    //   username: usernamex,
    //   password: passwordx,
    // });
    // const myHeaders = {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // };

    // fetch(REACT_APP_TARA_URL + "http://users/doLogin", {
    //   method: "GET",
    //   headers: myHeaders,
    //   body: raw,
    // });
  };

  return (
    // <Sandbox />
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Image source={require("../images/house_of_tara_logo.png")} />
          </View>
          <View style={{ borderRadius: 5 }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "900",
                color: "#F96D02",
                paddingHorizontal: 0,
                paddingTop: 40,
                fontFamily: "serif",
                width: 300,
              }}
            >
              Creativity Is Your Best MakeUp Skill,Don't Be Afraid To Experiment
            </Text>
          </View>
          {/* <Text style={{ color: "#ffffff" }}>
            Meeting the perfect one shouldn't be a hassle.
          </Text> */}
          <View style={{ paddingTop: 40 }}>
            <Text style={styles.inputText}>First Name:</Text>
            <TextInput
              keyboardType="default"
              placeholder="First Name"
              value={firstnamex}
              onChangeText={(value) => setFirstname(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>Last Name:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Last Name"
              value={lastnamex}
              onChangeText={(value) => setLastname(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>Email:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Email"
              value={emailx}
              onChangeText={(value) => setEmail(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            {/* <Text style={styles.inputText}>Username:</Text>
          <TextInput
            keyboardType="default"
            placeholder="Username"
            value={usernamex}
            onChangeText={(value) => setUsername(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          /> */}

            {/* <SelectList
            setSelected={setResidentialCountry}
            data={data}
            onSelect={() => handleOnChangeRCCountry(residentialCountryx)}
            dropdownStyles={{ color: "#fff" }}
          /> */}

            {/* <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Select your favourite language",
              value: null,
            }}
            items={[
              { label: "JavaScript", value: "JavaScript" },
              { label: "TypeScript", value: "TypeScript" },
              { label: "Python", value: "Python" },
              { label: "Java", value: "Java" },
              { label: "C++", value: "C++" },
              { label: "C", value: "C" },
            ]}
          /> */}
            <Text style={styles.inputText}>Country:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={{
                  color: "#F96D02",
                }}
                itemStyle={{
                  backgroundColor: "#F96D02",
                  color: "#000",
                  fontFamily: "Ebrima",
                  fontSize: 19,
                }}
                selectedValue={residentialCountryx}
                onValueChange={(newValue) => handleOnChangeRCCountry(newValue)}
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
            <View style={styles.pickerContainer}>
              <Picker
                style={{ color: "#F96D02" }}
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
            <Text style={styles.inputText}>Confirm Password:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm Password"
                value={rPasswordx}
                onChangeText={(value) => setRPassword(value)}
                secureTextEntry={rtPasswordShown}
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
                  rtPasswordShown
                    ? setRTPasswordShown(false)
                    : setRTPasswordShown(true);
                }}
              >
                <Icon
                  name={rtPasswordShown ? "eye-off" : "eye"}
                  size={22}
                  color="grey"
                />
              </Pressable>
            </View>
            <TouchableOpacity onPress={clickHandler}>
              <View
                style={[
                  styles.loginButton,
                  { flexDirection: "row", justifyContent: "center" },
                ]}
              >
                <Text style={styles.loginText}>REGISTER</Text>
                <InnerLoader animating={loading} color="#fff" size="small" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <View
              style={{
                paddingTop: 15,
                flexDirection: "row",
              }}
            >
              <Text style={styles.inputText}>Have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Toast
          status={toastObject.status}
          message={toastObject.message}
          open={toastObject.open}
          type={toastObject.type}
          change={toastObject.change}
          onPress={toastObject.onPress}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
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
    paddingBottom: 60,
  },
  buttonContainer: {
    marginTop: 20,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 15,
    margin: 5,
    width: 300,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 15,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#777",
    // maxHeight: 40,
    margin: 5,
    width: 300,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 50,
    // flexDirection: "row",
    // justifycontent: "center",
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
  itemStyle: {
    backgroundColor: "#F96D02",
    color: "#000",
    fontFamily: "Ebrima",
    fontSize: 19,
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
