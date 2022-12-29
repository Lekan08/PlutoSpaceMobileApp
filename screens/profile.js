import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Icons from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import { Con, Col, Row } from "../components/grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
export default function Profile({ navigation }) {
  const [kpurkish, setKpurkish] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pno, setPno] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [nameCircleColor, setNameCircleColor] = useState("#F96D02");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // getting data
      const getUser = async () => {
        try {
          const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
          setUserName(`${userData.otherDetailsDTO.personal.fname}`);
          const fnamee = userData.otherDetailsDTO.personal.fname;
          const firstLetter = fnamee.charAt(0).toUpperCase();
          console.log(firstLetter);
          const alpha1 = ["A", "B", "C", "D", "E", "F"];
          const alpha2 = ["G", "H", "I", "J", "K", "L"];
          const alpha3 = ["M", "N", "O", "P", "Q", "R"];
          const alpha4 = ["S", "T", "U", "V", "W", "X", "Y", "Z"];
          alpha1.map((alp) => {
            if (firstLetter === alp) {
              setNameCircleColor("#F96D02");
            }
          });
          alpha2.map((alp) => {
            if (firstLetter === alp) {
              setNameCircleColor("#54B435");
            }
          });
          alpha3.map((alp) => {
            if (firstLetter === alp) {
              setNameCircleColor("#533E85");
            }
          });
          alpha4.map((alp) => {
            if (firstLetter === alp) {
              setNameCircleColor("#F96D02");
            }
          });
          setLastName(`${userData.otherDetailsDTO.personal.lname}`);
          setPno(`${userData.otherDetailsDTO.personal.pno}`);
          setEmail(`${userData.otherDetailsDTO.personal.email}`);
          setCountry(`${userData.otherDetailsDTO.personal.residentialCountry}`);
          setState(`${userData.otherDetailsDTO.personal.residentialState}`);
          setCity(`${userData.otherDetailsDTO.personal.residentialStreet}`);
          setUserData(userData);
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
    console.log("WEREEEY");
    Alert.alert(
      "LOGOUT",
      "You will loggeed out of this session!!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes Logout",
          // onPress: () => navigation.navigate("Login"),
          // onPress: () => handleDeleteIndividual(id),
          // onPress: () => navigation.navigate("Login"),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: "center",
          backgroundColor: "#fff",
          elevation: 5,
          height: "29%",
          width: "100%",
          // marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // alignContent: "center",
            // justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: nameCircleColor,
              // backgroundColor: {kpurkish},
              height: 70,
              width: 70,
              borderRadius: 100,
              alignSelf: "center",
              marginLeft: 146,
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "#ffff",
                fontSize: 40,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {userName.charAt(0)}
              {lastName.charAt(0)}
            </Text>
          </View>
          {/* <Image
            source={require("../images/dummy.jpg")}
            style={{
              width: 60,
              borderRadius: 100,
              height: 60,
              padding: 9,
              margin: 6,
              alignSelf: "center",
              marginLeft: 146,
            }}
          /> */}

          <Icons
            name="edit"
            size={25.5}
            onPress={() => navigation.navigate("editprofile")}
            style={{
              color: "#F96D02",
              // marginLeft: 85,
              // paddingTop: 80,
              // marginTop: 40,
              // alignSelf: "flex-end",
              // marginRight: 10,
              marginLeft: 120,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "900",
              marginRight: 10,
            }}
          >
            {userName}
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "900",
            }}
          >
            {lastName}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
          }}
        >
          +{pno}
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 20,
            alignContent: "center",
          }}
        >
          <View
            style={{
              marginLeft: 25,
            }}
          >
            <Icon
              name="email"
              size={25}
              style={{
                color: "#F96D02",
                // marginLeft: 85,
                // paddingTop: 80,
                // marginTop: 40,
                // alignSelf: "flex-end",
                // marginRight: 10,
                // marginLeft: 120,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginLeft: 25,
              fontWeight: "900",
              textTransform: "uppercase",
            }}
          >
            {email}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: 120,
            width: 100,
            borderRadius: 10,
            // marginLeft: 10,
            elevation: 5,
          }}
        >
          <Icon
            name="account-plus"
            size={50}
            onPress={() => navigation.navigate("Individual")}
            style={{
              color: "#F96D02",
              // marginLeft: 85,
              // paddingTop: 80,
              marginTop: 20,
              // alignSelf: "flex-end",
              // marginRight: 10,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              color: "#F96D02",
              fontSize: 16,
              textAlign: "center",
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            Create Client
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            height: 120,
            width: 100,
            borderRadius: 10,
            marginLeft: 10,
            elevation: 5,
          }}
        >
          <Icon
            name="account-multiple"
            size={50}
            onPress={() => navigation.navigate("seeAllindividuals")}
            style={{
              color: "#F96D02",
              // marginLeft: 85,
              // paddingTop: 80,
              marginTop: 20,
              // alignSelf: "flex-end",
              // marginRight: 10,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              color: "#F96D02",
              fontSize: 16,
              textAlign: "center",
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            All Client
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            height: 120,
            width: 100,
            borderRadius: 10,
            marginLeft: 10,
            elevation: 5,
          }}
        >
          <Icon
            name="form-textbox-password"
            size={50}
            onPress={() => navigation.navigate("changePassword")}
            style={{
              color: "#F96D02",
              // marginLeft: 85,
              // paddingTop: 80,
              marginTop: 20,
              // alignSelf: "flex-end",
              // marginRight: 10,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              color: "#F96D02",
              fontSize: 16,
              textAlign: "center",
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            Change Password
          </Text>
        </View>
      </View>

      <View
        style={{
          alignSelf: "center",
          backgroundColor: "#F96D02",
          elevation: 5,
          height: "5%",
          width: "90%",
          marginTop: 10,
          flex: 1,
          flexDirection: "row",
          borderRadius: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: "#0f0f0f",
              fontSize: 15,
              // textAlign: "left",
              marginTop: 16,
              marginLeft: 20,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {city}
          </Text>
          <Icon
            name="city"
            size={50}
            // onPress={() => navigation.navigate("")}
            style={{
              color: "#0f0f0f",
              marginLeft: 15,
              // paddingTop: 80,
              marginTop: 20,
              // alignSelf: "flex-end",
              // marginRight: 10,
              alignSelf: "center",
            }}
          />
        </View>

        <View>
          <Text
            style={{
              color: "#0f0f0f",
              fontSize: 15,
              // textAlign: "left",
              marginTop: 16,
              marginLeft: 30,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {state}
          </Text>
          <Icon
            name="state-machine"
            size={50}
            // onPress={() => navigation.navigate("")}
            style={{
              color: "#0f0f0f",
              marginLeft: 25,
              // paddingTop: 80,
              marginTop: 20,
              // alignSelf: "flex-end",
              // marginRight: 10,
              alignSelf: "center",
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: "#0f0f0f",
              fontSize: 15,
              // textAlign: "left",
              marginTop: 15,
              marginLeft: 60,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {country}
          </Text>

          <Icon
            name="flag"
            size={50}
            // onPress={() => navigation.navigate("")}
            style={{
              color: "#0f0f0f",
              marginLeft: 55,
              // paddingTop: 80,
              marginTop: 20,
              // alignSelf: "flex-end",
              // marginRight: 10,
              alignSelf: "center",
            }}
          />
        </View>
      </View>
      <View
        style={{
          alignSelf: "center",
          backgroundColor: "#fff",
          // elevation: 2,
          height: "20%",
          width: "100%",
          marginTop: 15,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              marginTop: 20,
            }}
          >
            <View
              style={{
                marginLeft: 25,
              }}
            >
              <Icon
                name="logout"
                onPress={() => clickHandler()}
                size={25}
                style={{
                  color: "#F96D02",
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                marginLeft: 25,
                marginTop: 3,
              }}
            >
              LogOut
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingBottom: 60,
  },
});
