import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../styles/global";
import { Con, Col, Row } from "../components/grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Profile({ navigation }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setcategories] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // getting data
      const getUser = async () => {
        try {
          const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
          setFname(`${userData.otherDetailsDTO.personal.fname}`);
          setLname(`${userData.otherDetailsDTO.personal.lname}`);
          setEmail(`${userData.otherDetailsDTO.personal.email}`);
          setcountry(`${userData.otherDetailsDTO.personal.residentialCountry}`);
          setstate(`${userData.otherDetailsDTO.personal.residentialState}`);
          setcity(`${userData.otherDetailsDTO.personal.residentialCity}`);
          setaddress(`${userData.otherDetailsDTO.personal.residentialStreet}`);
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

  return (
    <View style={globalStyles.dashContainer}>
      <View
        style={{
          height: "60%",
          maxHeight: "60%",
          backgroundColor: "#F96D02",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 20,
            color: "#ffff",
            textAlign: "center",
          }}
        >
          Hii 👋 {fname} {lname}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <View
            style={{
              height: 145,
              width: 145,
              borderWidth: 5,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              borderRadius: 80,
            }}
          >
            <Image
              source={require("../images/Ahhh.png")}
              style={{ width: 220, borderRadius: 100, height: 220 }}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginTop: 60,
            marginLeft: 20,
            color: "#ffff",
            textAlign: "center",
          }}
        >
          {email}
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginLeft: 20,
            color: "#ffff",
            textAlign: "center",
          }}
        >
          {address}, {city}, {state}, {country}
        </Text>
      </View>
      <View
        style={{
          height: "50%",
          maxHeight: "50%",
          backgroundColor: "#ffff",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Con>
          <Row>
            <Col numRows={2}>
              <TouchableOpacity
                onPress={() => navigation.navigate("editprofile")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#F96D02",
                    borderRadius: 10,
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      lineHeight: 22,
                      color: "#fff",
                      marginBottom: 5,
                    }}
                  >
                    Edit Profile
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#ffff",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                    }}
                  >
                    <Icon name="account-plus" size={28} color="#0f0f0f" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
            <Col numRows={2}>
              <TouchableOpacity
                onPress={() => navigation.navigate("changePassword")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#F96D02",
                    borderRadius: 10,
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      lineHeight: 22,
                      color: "#fff",
                      marginBottom: 5,
                    }}
                  >
                    Change Password
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#ffff",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                    }}
                  >
                    <Icon
                      name="form-textbox-password"
                      size={28}
                      color="#0f0f0f"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row>
            <Col numRows={2}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Individual")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#F96D02",
                    borderRadius: 10,
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      lineHeight: 22,
                      color: "#fff",
                      marginBottom: 5,
                    }}
                  >
                    Create Client
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#ffff",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                    }}
                  >
                    <Icon name="archive-plus" size={28} color="#0f0f0f" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
            <Col numRows={2}>
              <TouchableOpacity
                onPress={() => navigation.navigate("seeAllindividuals")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#F96D02",
                    borderRadius: 10,
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      lineHeight: 22,
                      color: "#fff",
                      marginBottom: 5,
                    }}
                  >
                    See All Client
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#ffff",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                    }}
                  >
                    <Icon name="account-multiple" size={28} color="#0f0f0f" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
        </Con>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40,
    backgroundColor: "#ffff",
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "",
    borderRadius: 10,
  },
  icon: {
    flex: 1,
  },
});
