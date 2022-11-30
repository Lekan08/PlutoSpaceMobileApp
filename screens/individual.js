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
} from "react-native";
// import SweetAlert from 'react-native-sweet-alert';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import CalenderPicker from "react-native-calendar-picker";
import { SelectList } from "react-native-dropdown-select-list";

// import DatePicker from "react-native-datepicker";
import { Picker } from "@react-native-picker/picker";
// import SelectList from "../components/dropdown";
import AllCountriesAndStates from "../countries-states-master/countries";
import {
  REACT_APP_ZAVE_URL,
  REACT_APP_LOUGA_URL,
  FLUTTER_AUTH_KEY,
} from "@env";
import GHeaders from "../getHeaders";
import PHeaders from "../pHeaders";

// KPURKISH👌👌👌👌
// KPURKISH👌👌👌👌
// KPURKISH👌👌👌👌
import { Loader, InnerLoader } from "../components/loader";

export default function Individual({ navigation }) {
  const [firstnamex, setFirstname] = useState("");
  const [lastnamex, setLastname] = useState("");
  const [othernamex, setOthername] = useState("");
  const [titlex, setTitle] = useState("");
  const [occupationx, setOccupation] = useState("");
  const [portfoliox, setPortfolio] = useState("");
  const [marraigestatusx, setMarraigestatus] = useState("");
  const [facebookx, setFacebook] = useState("");
  const [instagramx, setInstagram] = useState("");
  const [twitterx, setTwitter] = useState("");
  const [linkedInx, setLinkedIn] = useState("");
  const [websitex, setWebsite] = useState("");
  const [phonenumberx, setPhonenumber] = useState("");
  const [emailx, setEmail] = useState("");
  const [cityx, setCity] = useState("");
  const [addressx, setAddress] = useState("");
  const [duty, setDutyRelieverx] = useState("");
  const [user, setUser] = useState([]);
  const [selected, setSelected] = React.useState("");

  const [loading, setLoading] = useState(false);

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const data = AlCountry.map((data) => {
    return { key: data.code3, value: data.name };
  });
  const [allStates, setAllStates] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

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

  const handlePress = () => {
    setLoading(true);
    const data11 = JSON.parse(AsyncStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const dutyx = Number(duty);
    const raw = JSON.stringify({
      fname: firstnamex,
      lname: lastnamex,
      oname: othernamex,
      title: titlex,
      street: addressx,
      city: cityx,
      state: residentialStatex,
      country: residentialCountryx,
      email: emailx,
      pno: phonenumberx,
      createdBy: dutyx,
      accountOwnerID: personalIDs,
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

    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        AsyncStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        } else {
          alert("Please fill the required input(s)");
        }
        setOpened(false);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
      })

      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(AsyncStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        AsyncStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (isMounted) {
          setUser(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const clickHandler = () => {
    if (
      firstnamex.length === 0 ||
      firstnamex === "" ||
      lastnamex.length === 0 ||
      lastnamex === "" ||
      othernamex.length === 0 ||
      othernamex === "" ||
      titlex.length === 0 ||
      titlex === "" ||
      phonenumberx.length === 0 ||
      phonenumberx === "" ||
      marraigestatusx.length === 0 ||
      marraigestatusx === "" ||
      emailx.length === 0 ||
      emailx === "" ||
      cityx.length === 0 ||
      cityx === "" ||
      addressx.length === 0 ||
      addressx === ""
    ) {
      Alert.alert("EMPTY_TEXTFIELDS", "Fill empty textfields");
    } else {
      handlePress();
    }
  };

  // KPURKISH👌👌👌👌👌👌
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
    { value: "Others", key: 16 },
  ];

  // const maptitlez = titlez.map((item) => {
  //   return item.name;
  // });
  // console.log(titlez);
  // console.log(maptitlez);

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
              Create Individual Client
            </Text>
          </View>
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
            <Text style={styles.inputText}>Other Name:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Optional"
              value={othernamex}
              onChangeText={(value) => setOthername(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>Title:</Text>
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
                selectedValue={titlex}
                onValueChange={(newValue) => setTitle(newValue)}
              >
                <Picker.Item label="Select Title" value="" />

                {titlez.map((apic) => (
                  <Picker.Item
                    label={apic.name}
                    key={apic.key}
                    value={apic.key}
                  />
                ))}
              </Picker>
              <SelectList
                setSelected={(val) => setSelected(val)}
                data={titlez}
                save="value"
              />
            </View>
            {/* <Text style={styles.inputText}>Occupation:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Occupation"
              value={occupationx}
              onChangeText={(value) => setOccupation(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            /> */}
            {/* <Text style={styles.inputText}>Portfolio:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Portfolio"
              value={portfoliox}
              onChangeText={(value) => setPortfolio(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>Marraige Status:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Optional"
              value={marraigestatusx}
              onChangeText={(value) => setMarraigestatus(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            /> */}
            {/* <Text style={styles.inputText}>Facebook Handle:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Optional"
              value={facebookx}
              onChangeText={(value) => setFacebook(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>Instagram Handle:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Optional"
              value={instagramx}
              onChangeText={(value) => setInstagram(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>Twitter Handle:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Optional"
              value={twitterx}
              onChangeText={(value) => setTwitter(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>linkedIn:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Optional"
              value={linkedInx}
              onChangeText={(value) => setLinkedIn(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            /> */}
            {/* <Text style={styles.inputText}>Website:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Optional"
              value={websitex}
              onChangeText={(value) => setWebsite(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            /> */}
            <Text style={styles.inputText}>Email:</Text>
            <TextInput
              keyboardType="default"
              placeholder="Email"
              value={emailx}
              onChangeText={(value) => setEmail(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>Phone Number:</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="Phone Number"
              value={phonenumberx}
              onChangeText={(value) => setPhonenumber(value)}
              style={styles.input}
              placeholderTextColor={"#777"}
            />
            <Text style={styles.inputText}>Created By::</Text>
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
                selectedValue={duty}
                onValueChange={(newValue) => setDutyRelieverx(newValue)}
              >
                <Picker.Item label="Select Title" value="" />
                {user.map((api) => (
                  <Picker.Item
                    // label={apic.name}
                    key={api.personal.id}
                    value={api.personal.id}
                  >
                    {api.personal.fname} {api.personal.lname}
                  </Picker.Item>
                ))}
              </Picker>
            </View>
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
            <TouchableOpacity onPress={clickHandler}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282A3A",
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
