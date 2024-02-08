import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Form,
  RefreshControl,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { REACT_APP_TARA_URL, FLUTTER_AUTH_KEY } from "@env";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loader, InnerLoader } from "../components/loader";
import { useIsFocused } from "@react-navigation/native";
export default function SeeAllindividuals({ navigation }) {
  // omo📊👌👌
  // const [firstnamex, setFirstname] = useState("");
  // const [lastnamex, setLastname] = useState("");
  // const [othernamex, setOthername] = useState("");
  // const [titlex, setTitle] = useState("");
  // const [emailx, setEmail] = useState("");
  // const [cityx, setCity] = useState("");
  // const [addressx, setAddress] = useState("");
  // omo📊👌👌
  const isFocused = useIsFocused();
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(false);
  const [clientsx, setClients] = useState([]);
  const [clientx, setClientx] = useState("");
  const [modalLName, setModalLName] = useState("");
  const [modalFName, setModalFName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalCity, setModalCity] = useState("");
  const [modalCountry, setModalCoumtry] = useState("");
  const [userDatax, setUserData] = useState({});
  const [items, setItems] = useState([]);

  // const [nameCircleColor, setNameCircleColor] = useState("#F96D02");

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     // getting data
  //     const getUser = async () => {
  //       try {
  //         const fnamee = apic.fname;
  //         const firstLetter = fnamee.charAt(0).toUpperCase();
  //         console.log(firstLetter);
  //         const alpha1 = ["A", "B", "C", "D", "E", "F"];
  //         const alpha2 = ["G", "H", "I", "J", "K", "L"];
  //         const alpha3 = ["M", "N", "O", "P", "Q", "R"];
  //         const alpha4 = ["S", "T", "U", "V", "W", "X", "Y", "Z"];
  //         alpha1.map((alp) => {
  //           if (firstLetter === alp) {
  //             setNameCircleColor("#009EFF");
  //           }
  //         });
  //         alpha2.map((alp) => {
  //           if (firstLetter === alp) {
  //             setNameCircleColor("#54B435");
  //           }
  //         });
  //         alpha3.map((alp) => {
  //           if (firstLetter === alp) {
  //             setNameCircleColor("#533E85");
  //           }
  //         });
  //         alpha4.map((alp) => {
  //           if (firstLetter === alp) {
  //             setNameCircleColor("#F96D02");
  //           }
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getUser();
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = (id) => {
    console.log(id);
    const filteredData = clientsx.filter((client) => client.id === id);

    console.log(filteredData);
    if (filteredData.length !== 0) {
      setModalLName(filteredData[0].lname);
      setModalFName(filteredData[0].fname);
      setModalEmail(filteredData[0].email);
      setModalCity(filteredData[0].city);
      setModalCoumtry(filteredData[0].country);
    }
    setIsModalVisible(() => !isModalVisible);
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  useEffect(() => {
    if (isFocused) {
      setLoading1(true);
      async function fetchData() {
        // console.log("nowwww");

        let ogrIDx;
        console.log("AHHH");
        console.log(ogrID);
        let headers;
        // getting data
        try {
          const userDataa = JSON.parse(await AsyncStorage.getItem("userInfo"));
          const userData = userDataa.data;
          let GeneToken = await AsyncStorage.getItem("rexxdex1");
          let apiToken = await AsyncStorage.getItem("rexxdex");
          console.log(GeneToken);
          console.log(apiToken);

          //   if (apiToken !== "null" && apiToken !== null) {
          //     await AsyncStorage.setItem("rexxdex1", apiToken);
          //   }
          const token = await AsyncStorage.getItem("rexxdex1");
          headers = {
            "Content-Type": "application/json",
            "Token-1": `${token}`,
          };
          console.log(headers);
          setUserData(userDataa);
          ogrIDx = userData.orgID;
        } catch (error) {
          console.log(error);
        }

        let isMounted = true;
        await fetch(
          `${process.env.REACT_APP_LOUGA_URL}/individual/gets/${ogrIDx}`,
          {
            headers,
          }
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
            setLoading1(false);
            // console.log(result);
            if (result.message === "Expired Access") {
              navigation.navigate("initial");
            }
            if (result.message === "Token Does Not Exist") {
              navigation.navigate("initial");
            }
            if (result.message === "Unauthorized Access") {
              navigation.navigate("initial");
            }
            if (isMounted) {
              console.log(result.length);
              if (result.length) {
                if (result.length !== 0) {
                  setClients(result);
                } else {
                  setClients([]);
                }
              }
            }
          });
        return () => {
          isMounted = false;
        };
      }
      fetchData();
    }
  }, [isFocused, input]);
  // const bigZZ = clientsx.map((read) => {
  //   console.log(read);
  //   read.fname;
  // });

  console.log("Kpurkish");
  console.log(clientsx);
  console.log("SHow me ");

  const handleDeleteIndividual = (id) => {
    // console.log(id);
    // console.log("zombie");
    async function fetchData() {
      let requestOptions;
      // getting data
      try {
        const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
        let GeneToken = await AsyncStorage.getItem("rexxdex1");
        let apiToken = await AsyncStorage.getItem("rexxdex");
        // console.log(GeneToken);

        //   if (apiToken !== "null" && apiToken !== null) {
        //     await AsyncStorage.setItem("rexxdex1", apiToken);
        //   }
        // let myHeaders;
        // const token = await AsyncStorage.getItem("rexxdex1");
        // myHeaders = {
        //   "Content-Type": "application/json",
        //   "Token-1": `${token}`,
        // };
        let headers;
        const token = await AsyncStorage.getItem("rexxdex1");
        headers = {
          "Content-Type": "application/json",
          "Token-1": `${token}`,
        };
        requestOptions = {
          method: "DELETE",
          headers: headers,
        };
        // console.log(requestOptions);
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }

      await fetch(
        `${process.env.REACT_APP_LOUGA_URL}/individual/delete/${id}`,
        requestOptions
      ).then(async (res) => {
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
            // console.log(error);
          }
        };
        storeUser(res);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      });
      return () => {
        isMounted = false;
      };
    }
    fetchData();
  };

  const clickHandler = (id) => {
    // console.log(id);
    // console.log("WEREEEY");
    Alert.alert(
      "WARNING!!",
      "Are you sure? Client will be deleted from list!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes Delete",
          onPress: () => handleDeleteIndividual(id),
        },
      ],
      { cancelable: false }
    );
  };
  const handleNameCircleColor = (fnamee) => {
    const firstLetter = fnamee.charAt(0).toUpperCase();
    console.log(firstLetter);
    const alpha1 = ["A", "B", "C", "D", "E", "F"];
    const alpha2 = ["G", "H", "I", "J", "K", "L"];
    const alpha3 = ["M", "N", "O", "P", "Q", "R"];
    const alpha4 = ["S", "T", "U", "V", "W", "X", "Y", "Z"];
    let colorr = "#009EFF";
    alpha1.map((alp) => {
      if (firstLetter === alp) {
        colorr = "#ACC6AA";
      }
    });
    alpha2.map((alp) => {
      if (firstLetter === alp) {
        colorr = "#54B435";
      }
    });
    alpha3.map((alp) => {
      if (firstLetter === alp) {
        colorr = "#4FD3C4";
      }
    });
    alpha4.map((alp) => {
      if (firstLetter === alp) {
        colorr = "#F96D02";
      }
    });
    return colorr;
  };

  // console.log(bigZZ);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#F96D02", "#0f0f0f", "#DC0000"]}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ alignItems: "center" }}>
          {clientsx.map((apic) => (
            <View
              style={{
                backgroundColor: "#ffffffff",
                elevation: 5,
                height: verticalScale(60),
                width: "97%",
                borderRadius: moderateScale(5),
                marginTop: verticalScale(20),
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  // marginTop: 10,
                  marginLeft: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  // justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    backgroundColor: handleNameCircleColor(apic.fname),
                    // backgroundColor: "#F96D02",
                    width: horizontalScale(35.5),
                    borderRadius: moderateScale(100),
                    height: verticalScale(35.5),
                    // padding: 9,
                    margin: 6,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#ffff",
                      fontSize: moderateScale(20),
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    {apic.fname.charAt(0)}
                  </Text>
                  {/* <Image
                    source={require("../images/dummy.jpg")}
                    style={{
                      width: 35.5,
                      borderRadius: 100,
                      height: 35.5,
                      padding: 9,
                      margin: 6,
                    }}
                  /> */}
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: moderateScale(18),
                      fontWeight: "bold",
                      marginLeft: 0,
                      // marginTop: 10,
                      // color: "#ffff",
                      // textAlign: "center",
                      // alignContent: "center",
                      // alignSelf: "flex-start",
                      textTransform: "uppercase",
                      // alignItems: "center",
                      // justifyContent: "center",
                      // marginStart: 30,
                    }}
                  >
                    <Text
                      style={{
                        color: "#F96D02",
                      }}
                    >
                      {apic.title}:
                    </Text>
                    {apic.fname} {apic.lname}
                  </Text>
                </View>
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
                    <Icon
                      name="delete"
                      size={25.5}
                      // onPress={(e) => handleMyModal(apic)}
                      onPress={() => clickHandler(apic.id)}
                      style={{
                        color: "#DC0000",
                        marginRight: 5,
                        // alignSelf: "flex-end",
                        // marginTop: 7,
                      }}
                    />
                    <Icon
                      name="arrow-drop-down"
                      size={25.5}
                      onPress={() => handleModal(apic.id)}
                      // onPress={handleModal}
                      style={{
                        color: "#F96D02",
                        marginRight: 5,
                        // alignSelf: "flex-end",
                        // marginTop: 7,
                      }}
                    />
                    {/* <Icon
                    name="add"
                    size={25.5}
                    // onPress={(e) => handleMyModal(apic)}
                    onPress={() => clickHandler(apic.id)}
                    style={{
                      color: "#0f0f0f",
                      // alignSelf: "flex-end",
                      // marginTop: 7,
                    }}
                  /> */}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal transparent={true} animationType="slide" visible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "flex-start",
                backgroundColor: "#fff",
                // borderBottomWidth: 1,
                borderColor: "#F96D02",
                // padding: 2,
                marginBottom: 10,
              }}
            >
              <Icon
                name="highlight-remove"
                size={30}
                onPress={handleModal}
                color="#F96D02"
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "#F96D02",
                  padding: 20,
                  borderRadius: moderateScale(5),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: horizontalScale(0),
                    height: verticalScale(2),
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: moderateScale(20),
                    color: "#fff",
                  }}
                >
                  CLIENT DETAILS
                </Text>
              </View>
              <Text style={styles.inputText}>
                <Text style={{ color: "red" }}>* </Text>First Name:
                {/* {apic.fname} */}
              </Text>
              <TextInput
                keyboardType="default"
                placeholder="First Name"
                value={modalFName}
                // onChangeText={(value) => setFirstname(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>
                <Text style={{ color: "red" }}>* </Text>Last Name:
                {/* {apic.lname}  */}
              </Text>
              <TextInput
                keyboardType="default"
                placeholder="Last Name"
                value={modalLName}
                // onChangeText={(value) => setLastname(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>
                Email:
                {/* {apic.email}  */}
              </Text>
              <TextInput
                keyboardType="default"
                placeholder="Email"
                value={modalEmail}
                // onChangeText={(value) => setEmail(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>
                City:
                {/* {apic.city}  */}
              </Text>
              <TextInput
                keyboardType="default"
                placeholder="City"
                value={modalCity}
                // onChangeText={(value) => setCity(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              <Text style={styles.inputText}>
                Country:
                {/* {apic.address}  */}
              </Text>
              <TextInput
                keyboardType="default"
                placeholder="Address"
                multiline
                value={modalCountry}
                // onChangeText={(value) => setAddress(value)}
                style={styles.input}
                placeholderTextColor={"#777"}
              />
              {/* <TouchableOpacity onPress={handleModal}>
                <View
                  style={[
                    styles.loginButton,
                    { flexDirection: "row", justifyContent: "center" },
                  ]}
                >
                  <Text style={styles.loginText}>SAVE</Text>
                  <InnerLoader animating={loading} color="#fff" size="small" />
                </View>
              </TouchableOpacity> */}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Loader animating={loading1} color="#fff" size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: 0,
    paddingBottom: 10,
  },
  buttonContainer: {
    marginTop: verticalScale(20),
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 15,
    margin: 5,
    width: horizontalScale(300),
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(50),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 15,
    margin: 5,
    width: horizontalScale(300),
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(50),
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
    width: horizontalScale(300),
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(50),
  },
  loginButton: {
    padding: 15,
    marginTop: verticalScale(30),
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: moderateScale(20),
  },
  loginText: {
    textAlign: "center",
    color: "#fff",
  },
  inputText: {
    marginTop: verticalScale(10),
    alignSelf: "center",
    color: "#F96D02",
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

  modalView: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: moderateScale(20),
    height: "70%",
    minHeight: verticalScale(200),
    maxHeight: verticalScale(700),
    shadowColor: "#000",
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },

  buttonContainer: {
    marginTop: verticalScale(20),
    padding: 20,
  },
  txAInput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    height: verticalScale(100),
    textAlignVertical: "top",
    color: "#777",
    paddingHorizontal: 10,
    borderRadius: moderateScale(5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    textAlignVertical: "top",
    color: "#777",
    paddingHorizontal: 10,
    borderRadius: moderateScale(5),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#777",
    margin: 5,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  pickerContainer2: {
    borderWidth: 1,
    borderColor: "#777",
    margin: 5,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(5),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: "90%",
    color: "#777",
  },
  loginButton: {
    padding: 15,
    marginTop: verticalScale(30),
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: moderateScale(5),
  },
  loginText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  inputText: {
    marginTop: verticalScale(5),
    marginLeft: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#333",
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#777",
    margin: 5,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    marginTop: verticalScale(5),
    marginLeft: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#333",
  },
  modalView: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: moderateScale(20),
    height: "70%",
    minHeight: verticalScale(200),
    maxHeight: verticalScale(700),
    shadowColor: "#000",
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  salesItemTitle: {
    fontWeight: "bold",
    borderRightWidth: 1,
    borderColor: "#0f0f0f",
    paddingHorizontal: 2,
  },
  salesItemBody: {
    fontWeight: "regular",
    borderRightWidth: 1,
    borderColor: "#0f0f0f",
    paddingHorizontal: 2,
    textAlign: "right",
  },
});
