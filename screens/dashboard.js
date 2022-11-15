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
  const [userData, setUserData] = useState([]);
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
          setUserName(`${userData.firstname} ${userData.lastname}`);
          setCategories(userData.categories[0]);
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

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (cater === true) {
        setCategories("DISTRIBUTOR");
        setBGCol("#f96d02");
      } else if (cater === false) {
        setCategories("RETAILER");
        setBGCol("#425F57");
      }
    }
    return () => {
      isMounted = false;
    };
  }, [cater]);

  const clickHandler = () => {
    setCater(!cater);
  };

  return (
    <View style={globalStyles.dashContainer}>
      <View
        style={{
          height: "50%",
          maxHeight: "50%",
          backgroundColor: bGCol,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 60,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={clickHandler}>
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
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 115,
              width: 115,
              backgroundColor: "#F96D02",
              borderWidth: 5,
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 60,
              marginRight: 20,
            }}
          >
            <Image
              source={require("../images/kpurkish.jpeg")}
              style={{ width: 100, borderRadius: 50, height: 100 }}
            />
          </View>
        </View>

        <View
          style={{
            marginBottom: -20,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 20,
            marginBottom: 20,
            color: "#ffff",
          }}
        >
          {categories}
        </Text>
        <View></View>
        <View
          style={{
            marginBottom: -10,
          }}
        />
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginLeft: 20,
            color: "#ffff",
          }}
        >
          Hello {userName}
        </Text>
        <View>
          <Text
            style={{
              fontSize: 20,
              marginButtom: 30,
              marginLeft: 20,
              color: "#ffff",
            }}
          >
            Today sales
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: 20,
              color: "#ffff",
            }}
          >
            ₦1,500.04
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View
              style={{
                // padding: 2,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: "#f96d02",
                borderWidth: 1,
                borderColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginRight: 20,
                marginBottom: 5,
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
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: "50%",
          maxHeight: "50%",
          backgroundColor: "#0f0f0f",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <ScrollView> */}
        <Con>
          <Row>
            <Col numRows={2}>
              <TouchableOpacity onPress={() => navigation.navigate("Products")}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#333",
                    borderRadius: 10,
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
                      lineHeight: 22,
                      color: "#fff",
                      marginBottom: 5,
                    }}
                  >
                    Products
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
                    <Icon name="view-grid-outline" size={28} color="#0f0f0f" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
            <Col numRows={2}>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#333",
                    borderRadius: 10,
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
                      lineHeight: 22,
                      color: "#fff",
                      marginBottom: 5,
                    }}
                  >
                    Profile
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
                    <Icon name="account" size={28} color="#0f0f0f" />
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
                    backgroundColor: "#333",
                    borderRadius: 10,
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
                      color: "#fff",
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
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                    }}
                  >
                    <Icon name="history" size={28} color="#0f0f0f" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
            <Col numRows={2}>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#333",
                    borderRadius: 10,
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
                      color: "#fff",
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
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                    }}
                  >
                    <Icon name="cart" size={28} color="#0f0f0f" />
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
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
    backgroundColor: "#0F0F0F",
  },
  // dashboard: {
  //   backgroundColor: '#F96D02',
  //}
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
