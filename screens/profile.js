import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Pressable,
  Modal,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Icons from "@expo/vector-icons/MaterialIcons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import { Con, Col, Row } from "../components/grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { ScrollView } from "react-native-gesture-handler";
export default function Profile({ navigation }) {
  const [pno, setPno] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [oname, setOname] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [sex, setSex] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [nameCircleColor, setNameCircleColor] = useState("#F96D02");

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // getting data
      const getUser = async () => {
        try {
          const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
          setFname(`${userData.otherDetailsDTO.personal.fname}`);
          setLname(`${userData.otherDetailsDTO.personal.lname}`);
          setOname(`${userData.otherDetailsDTO.personal.oname}`);
          setEmail(`${userData.otherDetailsDTO.personal.email}`);
          setPno(`${userData.otherDetailsDTO.personal.pno}`);
          setCountry(`${userData.otherDetailsDTO.personal.residentialCountry}`);
          setState(`${userData.otherDetailsDTO.personal.residentialState}`);
          setCity(`${userData.otherDetailsDTO.personal.residentialCity}`);
          setAddress(`${userData.otherDetailsDTO.personal.residentialStreet}`);
          setDayOfBirth(`${userData.otherDetailsDTO.personal.dayOfBirth}`);
          setMonthOfBirth(`${userData.otherDetailsDTO.personal.monthOfBirth}`);
          setYearOfBirth(`${userData.otherDetailsDTO.personal.yearOfBirth}`);
          setSex(`${userData.otherDetailsDTO.personal.sex}`);
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

  const LogOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };

  const clickHandler = (id) => {
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
          onPress: () => LogOut(id),
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
      <View style={{ alignSelf: "center" }}>
        <View
          style={{
            backgroundColor: "#ffff",
            height: 80,
            width: 80,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "#F96D02",
              fontWeight: "bold",
              fontSize: moderateScale(40),
              textTransform: "uppercase",
            }}
          >
            {fname.charAt(0)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: moderateScale(15),
              fontWeight: "700",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {fname}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#ffff",
          width: "100%",
          height: "80%",
          marginTop: 6,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Text
          style={{
            color: "#454545",
            fontWeight: "bold",
            textTransform: "capitalize",
            fontSize: moderateScale(16),
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          settings
        </Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            elevation: 4,
            height: 60,
            width: "90%",
            alignSelf: "center",
            marginTop: 10,
            alignItems: "center",
            // borderBottomColor: "#F96D02",
            // borderWidth: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#F96D02",
              height: 40,
              width: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Icon name="account-outline" size={28} color="#ffff" />
          </View>
          <Text style={{ color: "#454545", fontWeight: "800" }}>
            View Profile
          </Text>
          <MaterialIcons
            // onPress={() => navigation.navigate("EditProfile")}
            onPress={handleModal}
            name="navigate-next"
            size={30}
            color="black"
            style={{ marginHorizontal: 145 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            elevation: 4,
            height: 60,
            width: "90%",
            alignSelf: "center",
            marginTop: 10,
            alignItems: "center",
            // borderBottomColor: "#F96D02",
            // borderWidth: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#F96D02",
              height: 40,
              width: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Icon name="account-settings" size={28} color="#ffff" />
          </View>
          <Text style={{ color: "#454545", fontWeight: "800" }}>
            Edit Profile
          </Text>
          <MaterialIcons
            onPress={() => navigation.navigate("EditProfile")}
            name="navigate-next"
            size={30}
            color="black"
            style={{ marginHorizontal: 150 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            elevation: 4,
            height: 60,
            width: "90%",
            alignSelf: "center",
            marginTop: 10,
            alignItems: "center",
            // borderBottomColor: "#F96D02",
            // borderWidth: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#F96D02",
              height: 40,
              width: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Icon name="account-multiple" size={28} color="#ffff" />
          </View>
          <Text style={{ color: "#454545", fontWeight: "800" }}>
            {" "}
            Change Passwrd
          </Text>
          <MaterialIcons
            onPress={() => navigation.navigate("changePassword")}
            name="navigate-next"
            size={30}
            color="black"
            style={{ marginHorizontal: 111 }}
          />
        </View>
        <TouchableOpacity onPress={clickHandler}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              elevation: 4,
              height: 60,
              width: "90%",
              alignSelf: "center",
              marginTop: 10,
              alignItems: "center",
              // borderBottomColor: "#F96D02",
              // borderWidth: 1,
            }}
          >
            <View
              style={{
                // backgroundColor: "#F96D02",
                // height: 40,
                // width: 40,
                // borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                flexDirection: "row",
              }}
            >
              <Icon name="logout" size={28} color="#0f0f0f" />
              <Text
                style={{
                  color: "#454545",
                  fontWeight: "800",
                  marginHorizontal: 10,
                }}
              >
                LOGOUT
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        // animationType="fade"
        visible={isModalVisible}
      >
        <Pressable
          onPress={handleModal}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            ></View>
            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Full name:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      // fontWeight: "bold",
                      textAlign: "center",
                      color: "#aaaa",
                    }}
                  >
                    {fname}
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      // fontWeight: "bold",
                      textAlign: "center",
                      marginHorizontal: 10,
                      color: "#aaaa",
                    }}
                  >
                    {lname}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      // fontWeight: "bold",
                      textAlign: "center",
                      marginHorizontal: 10,
                      color: "#aaaa",
                    }}
                  >
                    {oname}
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Email:
                </Text>
                <Text
                  style={{ fontSize: 15, color: "#aaaa", textAlign: "center" }}
                >
                  {email}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Phone Number:
                </Text>
                <Text
                  style={{ fontSize: 15, color: "#aaaa", textAlign: "center" }}
                >
                  +{pno}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Sex:
                </Text>
                <Text
                  style={{ fontSize: 15, color: "#aaaa", textAlign: "center" }}
                >
                  {sex}
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Nationality:
                </Text>
                <Text
                  style={{ fontSize: 15, color: "#aaaa", textAlign: "center" }}
                >
                  {country}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  State:
                </Text>
                <Text
                  style={{ fontSize: 15, color: "#aaaa", textAlign: "center" }}
                >
                  {state}
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Address:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#aaaa",
                      textAlign: "center",
                    }}
                  >
                    {address},{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#aaaa",
                      textAlign: "center",
                    }}
                  >
                    {city},{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#aaaa",
                      textAlign: "center",
                    }}
                  >
                    {state},{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#aaaa",
                      textAlign: "center",
                    }}
                  >
                    {country},{" "}
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Date Of Birth :
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#aaaa",
                      textAlign: "center",
                    }}
                  >
                    {dayOfBirth},{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#aaaa",
                      textAlign: "center",
                    }}
                  >
                    {monthOfBirth},{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#aaaa",
                      textAlign: "center",
                    }}
                  >
                    {yearOfBirth},{" "}
                  </Text>
                </View>
              </View>
            </Pressable>
            {/* <Pressable
              onPress={() => navigation.navigate("Customeredit")}
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Edit Profile
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return {
                  backgroundColor: pressed ? "#ccc" : "transparent",
                  paddingVertical: 20,
                };
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Share QR Code
              </Text>
            </Pressable> */}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F96D02",
    // paddingBottom: 60,
  },
});
