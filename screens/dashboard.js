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

import { horizontalScale, moderateScale, verticalScale } from "../../Metrics";
export default function Dashboard({ navigation }) {
  // const [reviews, setReviews] = useState([
  //   { title: "Zelda, breath of fire", rating: 5, body: "lorem ipsum", key: 1 },
  //   {
  //     title: "Gotta Catch Them All (again)",
  //     rating: 4,
  //     body: "lorem ipsum",
  //     key: 2,
  //   },
  //   { title: "Not So 'Final' Fantasy", rating: 3, body: "lorem ipsum", key: 3 },
  // ]);

  // const myHeaders = {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // };
  // const requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: "follow",
  // };

  // const url = "https://tarastoreservice.plutospace.space";
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState({});
  const [categories, setCategories] = useState("");
  const [cater, setCater] = useState(true);
  const [bGCol, setBGCol] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // getting data
      const getUser = async () => {
        try {
          const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
          setUserName(
            `${userData.otherDetailsDTO.personal.fname} ${userData.otherDetailsDTO.personal.lname}`
          );
          // setCategories(userData.categories[0]);
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

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     if (cater === true) {
  //       setCategories("DISTRIBUTOR");
  //       setBGCol("#f96d02");
  //     } else if (cater === false) {
  //       setCategories("RETAILER");
  //       setBGCol("#425F57");
  //     }
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [cater]);

  const clickHandler = () => {
    setCater(!cater);
  };
  const LogOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };

  return (
    <View style={globalStyles.dashContainer}>
      <View
        style={{
          height: "50%",
          maxHeight: "50%",
          backgroundColor: "#F96D02",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: verticalScale(60),
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {/* <TouchableOpacity onPress={clickHandler}>
              <View
                style={{
                  padding: 10,
                  height: 40,
                  minHeight: 42,
                  backgroundColor: "#000",
                  borderWidth: 3,
                  borderColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  marginLeft: 20,
                  // marginTop: 50,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Switch Repository
                </Text>
              </View>
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              height: verticalScale(115),
              width: horizontalScale(115),
              backgroundColor: "#F96D02",
              borderWidth: 5,
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: moderateScale(60),
              marginRight: 20,
            }}
          >
            <Image
              source={require("../images/kpurkish.jpeg")}
              style={{
                width: horizontalScale(100),
                borderRadius: moderateScale(50),
                height: verticalScale(100),
              }}
            />
          </View>
        </View>

        {/* <View
          style={{
            marginBottom: -20,
          }}
        /> */}
        {/* <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 20,
            marginBottom: 20,
            color: "#ffff",
          }}
        >
          {categories}
        </Text> */}
        {/* <View
          style={{
            marginBottom: -10,
          }}
        /> */}
        <Text
          style={{
            fontSize: moderateScale(40),
            fontWeight: "bold",
            marginLeft: 20,
            color: "#ffff",
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontSize: moderateScale(40),
            fontWeight: "bold",
            marginLeft: 20,
            color: "#ffff",
          }}
        >
          {userName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              borderBottomColor: "#FFFFFF",
              borderColor: "#FFFFFF",
              borderBottomWidth: 5,
            }}
          />
          <TouchableOpacity onPress={() => LogOut}>
            <View
              style={{
                // padding: 2,
                paddingHorizontal: 10,
                paddingVertical: 5,
                // backgroundColor: "#FFFFFF",
                // elevation: 5,
                justifyContent: "center",
                alignItems: "center",
                // borderRadius: 5,
                // marginRight: 20,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(20),
                  letterSpacing: 2,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  marginBottom: 5,
                }}
              >
                LOGOUT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: "50%",
          maxHeight: "50%",
          backgroundColor: "#FFFFFF",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <ScrollView> */}
        <Con>
          <Row>
            <Col numRows={2}>
              <TouchableOpacity onPress={() => navigation.navigate("Sales")}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                    borderRadius: moderateScale(10),
                    elevation: 5,
                    // justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginTop: verticalScale(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontWeight: "600",
                      lineHeight: verticalScale(22),
                      color: "#0F0F0F",
                      marginBottom: 5,
                    }}
                  >
                    Sales
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#ffff",
                      justifyContent: "center",
                      alignItems: "center",
                      // height: 40,
                      // width: 40,
                      borderRadius: moderateScale(50),
                    }}
                  >
                    <Icon name="sale" size={28} color="#0F0F0F" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
            <Col numRows={2}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Individual")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                    borderRadius: moderateScale(10),
                    elevation: 5,
                    // justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginTop: verticalScale(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontWeight: "600",
                      lineHeight: verticalScale(22),
                      color: "#0F0F0F",
                      marginBottom: 5,
                    }}
                  >
                    Individual
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#ffff",
                      justifyContent: "center",
                      alignItems: "center",
                      // height: 40,
                      // width: 40,
                      borderRadius: moderateScale(50),
                    }}
                  >
                    <Icon name="account-outline" size={28} color="#0F0F0F" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row>
            <Col numRows={2}>
              <TouchableOpacity
                onPress={() => navigation.navigate("TransactionHistory")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                    borderRadius: moderateScale(10),
                    elevation: 5,
                    // justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginTop: verticalScale(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontWeight: "600",
                      // alignSelf: "center",
                      lineHeight: verticalScale(22),
                      color: "#0F0F0F",
                      marginBottom: 5,
                    }}
                  >
                    History
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#ffff",
                      justifyContent: "center",
                      alignItems: "center",
                      // height: 40,
                      // width: 40,
                      borderRadius: moderateScale(50),
                    }}
                  >
                    <Icon name="history" size={28} color="#0F0F0F" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
            {/* <Col numRows={2}>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 10,
                    elevation: 5,
                    // justifyContent: "center",
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
                      // alignSelf: "center",
                      lineHeight: 22,
                      color: "#0F0F0F",
                      marginBottom: 5,
                    }}
                  >
                    Cart
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#ffff",
                      justifyContent: "center",
                      alignItems: "center",
                      // height: 40,
                      // width: 40,
                      borderRadius: 50,
                    }}
                  >
                    <Icon name="cart" size={28} color="#0F0F0F" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col> */}
          </Row>
        </Con>
        {/* </ScrollView> */}
      </View>
      {/* <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewDetails", item)}
          >
         
            <Text style={globalStyles.titleText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      /> */}
      {/* <Button
        title="Press"
        onPress={() => navigation.navigate("ReviewDetails")}
      /> */}

      {/* <View style={styles.container}>
      <Text style={styles.dashboard}>PRODUCTS

      </Text>
      <Text style={styles.dashboard}>PROFILE</Text>
      <Text style={styles.dashboard}>TRANSACTIONS</Text>
      <Text style={styles.dashboard}>HISTORY</Text>
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40,
    backgroundColor: "#FFFFFF",
  },
  // dashboard: {
  //   backgroundColor: '#F96D02',
  //}
  item: {
    padding: 16,
    marginTop: verticalScale(16),
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "",
    borderRadius: moderateScale(10),
  },
  icon: {
    flex: 1,
  },
});
