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
import { Loader, InnerLoader } from "../components/loader";
import { ToastAlert } from "../components/alert";
export default function EditProfile({ navigation }) {
  //Getting user info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOthername] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});
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
          setCategories(`${userData.categories}`);
          setCountry(`${userData.country}`);
          setState(`${userData.state}`);
          setCity(`${userData.city}`);
          setAddress(`${userData.address}`);
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
  const clickHandler = () => {
    if (
      firstName.length === 0 ||
      firstName === "" ||
      lastName.length === 0 ||
      lastName === "" ||
      email.length === 0 ||
      email === "" ||
      city.length === 0 ||
      city === "" ||
      address.length === 0 ||
      address === ""
    ) {
      setToastObject({
        status: "EMPTY_TEXTFIELDS",
        message: "Fill empty textfields",
        open: true,
        type: "error",
        change: Math.floor(Math.random() * 100),
      });
      // Alert.alert("Please fill all empty textfields");
    }
    // else handlePress();
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

        <View style={{ paddingTop: 40 }}>
          <Text style={styles.inputText}>First Name</Text>
          <TextInput
            keyboardType="default"
            placeholder="First Name"
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}>Last Name</Text>
          <TextInput
            keyboardType="default"
            placeholder="Last Name"
            value={lastName}
            onChangeText={(value) => setLastName(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}>Other Name</Text>
          <TextInput
            keyboardType="default"
            placeholder="Optional"
            value={otherName}
            onChangeText={(value) => setOthername(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            keyboardType="default"
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}>City</Text>
          <TextInput
            keyboardType="default"
            placeholder="City"
            value={city}
            onChangeText={(value) => setCity(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}>State</Text>
          <TextInput
            keyboardType="default"
            placeholder="City"
            value={state}
            onChangeText={(value) => setState(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}>Country</Text>
          <TextInput
            keyboardType="default"
            placeholder="City"
            value={country}
            onChangeText={(value) => setCountry(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}>House Address</Text>
          <TextInput
            keyboardType="default"
            placeholder="Address"
            multiline
            value={address}
            onChangeText={(value) => setAddress(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
        </View>
        <TouchableOpacity onPress={clickHandler}>
          <View style={styles.changePassButton}>
            <Text
              style={{
                color: "#ffff",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <ToastAlert
        status={toastObject.status}
        message={toastObject.message}
        open={toastObject.open}
        type={toastObject.type}
        change={toastObject.change}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
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
    color: "#0f0f0f",
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  changePassButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F96D02",
    marginHorizontal: 40,
    borderRadius: 15,
  },
  inputText: {
    // textAlign: "left",
    marginLeft: 60,
    color: "#F96D02",
    fontSize: 15,
    fontWeight: "bold",
  },
});
