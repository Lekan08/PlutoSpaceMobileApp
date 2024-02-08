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
import { REACT_APP_TARA_URL, FLUTTER_AUTH_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllCountriesAndStates from "../countries-states-master/countries";
import { ToastAlert } from "../components/alert";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
export default function EditProfile({ navigation }) {
  //Getting user info

  const [disabledButton, setDisabledButton] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOthername] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
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
  const [loading, setLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      let isMounted = true;
      if (isMounted) {
        // getting data
        const getUser = async () => {
          try {
            const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
            setFirstName(`${userData.otherDetailsDTO.personal.fname}`);
            setLastName(`${userData.otherDetailsDTO.personal.lname}`);
            setOthername(`${userData.otherDetailsDTO.personal.oname}`);
            setEmail(`${userData.otherDetailsDTO.personal.email}`);
            setResidentialCountry(
              `${userData.otherDetailsDTO.personal.residentialCountry}`
            );
            const countryxx = `${userData.otherDetailsDTO.personal.residentialCountry}`;
            const filteredItems = AlCountry.filter(
              (item) => item.name === countryxx
            );
            setAllStates(filteredItems[0].states);
            setResidentialState(
              `${userData.otherDetailsDTO.personal.residentialState}`
            );
            setCity(`${userData.otherDetailsDTO.personal.residentialCity}`);
            setAddress(
              `${userData.otherDetailsDTO.personal.residentialStreet}`
            );
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
    }
  }, [isFocused]);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Image source={require("../images/house_of_tara_logo.png")} /> */}
        <View style={styles.subContainer}>
          <View style={{ paddingTop: 10 }}>
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
            <Text style={styles.inputText}>Country</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={{
                  color: "#0f0f0f",
                }}
                itemStyle={{
                  // backgroundColor: "#0f0f0f",
                  color: "#000",
                  // fontFamily: "Ebrima",
                  fontSize: moderateScale(19),
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
              value={city}
              onChangeText={(value) => setCity(value)}
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
            <TouchableOpacity disabled={disabledButton} onPress={clickHandler}>
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
    borderColor: "#777",
    padding: 8,
    margin: 5,
    // width: 300,
    marginHorizontal: 5,
    color: "#0f0f0f",
    paddingHorizontal: 20,
    borderRadius: 5,
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
    marginTop: 10,
    // alignSelf: "center",
    marginHorizontal: 10,
    color: "#777",
    fontWeight: "900",
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
    // fontFamily: "Ebrima",
    fontSize: moderateScale(19),
  },
});
