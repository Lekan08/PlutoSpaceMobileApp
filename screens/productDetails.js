import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  FlatList,
  TextInput,
  Modal,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import AllCountriesAndStates from "../countries-states-master/countries";

import { REACT_APP_TARA_URL } from "@env";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Loader, InnerLoader } from "../components/loader";

export default function ProductDetails({ navigation, route }) {
  const item = route.params;

  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productIDx, setProductID] = useState("");
  const [quantityx, setQuantity] = useState("");

  const [firstnamex, setFirstname] = useState("");
  const [lastnamex, setLastname] = useState("");
  const [emailx, setEmail] = useState("");
  const [pnox, setPno] = useState("");
  const [cityx, setCity] = useState("");
  const [addressx, setAddress] = useState("");
  const [userDatax, setUserData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (isFocused) {
      async function fetchData() {
        console.log("nowwww");
        const myHeaders = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        let userID;
        // getting data
        try {
          const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
          setUserData(userData);
          userID = userData.id;
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [isFocused]);

  const handlePress = () => {
    setLoading(true);
    const raw = JSON.stringify({
      productID: productIDx,
      quantity: quantityx,
      dealerID: userDatax.id,
      customer: {
        fname: firstnamex,
        lname: lastnamex,
        address: addressx,
        city: cityx,
        state: residentialStatex,
        country: residentialCountryx,
        email: emailx,
        pno: pnox,
      },
      status: 0,
      // "approverID": "string",
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

    fetch(`${REACT_APP_TARA_URL}/purchaseRequest/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        if (result.status === "SUCCESS") {
          Alert.alert(result.status, result.message, [
            {
              text: "ok",
              onPress: () => {
                setModalVisible(false);
              },
            },
          ]);
        } else {
          Alert.alert(result.status, result.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(error.status, error.message);
        console.log(error);
      });
  };

  const modalView = (item) => {
    setQuantity(0);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPno("");
    setCity("");
    setAddress("");
    setModalVisible(true);
    setProductName(item.product.name);
    setProductQuantity(item.quantity);
  };

  const addRemoveQuantity = (val) => {
    const conQuant = parseInt(quantityx, 10);
    if (val === 0) {
      if (conQuant > 0) {
        setQuantity(conQuant - 1);
      }
    } else if (val === 1) {
      if (conQuant < productQuantity) {
        setQuantity(conQuant + 1);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#0F0F0F" }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 5,
            margin: 5,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 300,
              borderRadius: 10,
              height: 300,
              alignSelf: "center",
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 5,
            margin: 5,
            flex: 1,
          }}
        >
          <View style={{ margin: 5, marginTop: 10 }}>
            <Text
              style={{
                fontWeight: "500",
                color: "#000",
                fontSize: 18,
                textTransform: "capitalize",
              }}
            >
              {item.product.name}
            </Text>
          </View>
          <View style={{ margin: 5, marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              ₦{item.product.pricePerQuantity}
            </Text>
          </View>
          <View style={{ backgroundColor: "#fff", margin: 5 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#777",
                textTransform: "uppercase",
                borderBottomColor: "#777",
                borderBottomWidth: 1,
                letterSpacing: 1,
                fontSize: 15,
              }}
            >
              Details
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "bold",
              color: "#000",
              textTransform: "capitalize",
            }}
          >
            Description
          </Text>
          <Text
            style={{
              textTransform: "capitalize",
            }}
          >
            {item.product.description}
          </Text>
        </View>
        {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
          alignSelf: "flex-end",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            modalView(item);
            setProductID(item.productId);
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: "#F96D02",
              width: "100%",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textTransform: "uppercase",
                alignSelf: "center",
                fontSize: 13,
              }}
            >
              Request Purchase
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <Icon
                name="cancel"
                size={30}
                onPress={() => setModalVisible(!modalVisible)}
                color="red"
              />
            </View>
            <ScrollView
              style={{ flex: 1, marginBottom: 50 }}
              showsVerticalScrollIndicator={false}
            >
              <Text
                style={[
                  styles.modalText,
                  { color: "#F96D02", fontWeight: "bold", fontSize: 25 },
                ]}
              >
                {productName}
              </Text>
              <View style={[styles.centeredView, { paddingTop: 10 }]}>
                <View>
                  <Text
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Customer's Details
                  </Text>
                </View>
                <Text style={styles.inputText}>First Name</Text>
                <TextInput
                  keyboardType="default"
                  // placeholder="First Name"
                  value={firstnamex}
                  onChangeText={(value) => setFirstname(value)}
                  style={styles.input}
                  placeholderTextColor={"#777"}
                />
                <Text style={styles.inputText}>Last Name</Text>
                <TextInput
                  keyboardType="default"
                  // placeholder="Last Name"
                  value={lastnamex}
                  onChangeText={(value) => setLastname(value)}
                  style={styles.input}
                  placeholderTextColor={"#777"}
                />
                <Text style={styles.inputText}>Phone Number</Text>
                <TextInput
                  keyboardType="numeric"
                  // placeholder="Email"
                  value={pnox}
                  onChangeText={(value) => setPno(value)}
                  style={styles.input}
                  placeholderTextColor={"#777"}
                />
                <Text style={styles.inputText}>Email</Text>
                <TextInput
                  keyboardType="default"
                  // placeholder="Email"
                  value={emailx}
                  onChangeText={(value) => setEmail(value)}
                  style={styles.input}
                  placeholderTextColor={"#777"}
                />
                <Text style={styles.inputText}>City</Text>
                <TextInput
                  keyboardType="default"
                  // placeholder="City"
                  value={cityx}
                  onChangeText={(value) => setCity(value)}
                  style={styles.input}
                  placeholderTextColor={"#777"}
                />
                <Text style={styles.inputText}>House Address</Text>
                <TextInput
                  keyboardType="default"
                  // placeholder="Address"
                  multiline
                  value={addressx}
                  onChangeText={(value) => setAddress(value)}
                  style={styles.input}
                  placeholderTextColor={"#777"}
                />
                <Text style={styles.inputText}>Country:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    style={{
                      color: "#000",
                    }}
                    // itemStyle={{
                    //   backgroundColor: "#0f0f",
                    //   color: "#fafa",
                    //   fontFamily: "Ebrima",
                    //   fontSize: 17,
                    // }}
                    selectedValue={residentialCountryx}
                    onValueChange={(newValue) =>
                      handleOnChangeRCCountry(newValue)
                    }
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
                    style={{ color: "#000" }}
                    selectedValue={residentialStatex}
                    onValueChange={(newValue) =>
                      handleOnChangeRCState(newValue)
                    }
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
                <Text style={styles.inputText}>Quantity</Text>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  {/* <View style={styles.addRemove}>
                    <Icon
                      name="remove"
                      size={30}
                      onPress={() => addRemoveQuantity(0)}
                      color="white"
                    />
                  </View> */}
                  <TextInput
                    keyboardType="numeric"
                    placeholder="0"
                    value={quantityx}
                    onChangeText={(value) => setQuantity(value)}
                    // style={{
                    //   borderBottomColor: "#777",
                    //   borderBottomWidth: 1,
                    //   padding: 5,
                    //   width: 40,
                    //   color: "#000",
                    //   fontWeight: "bold",
                    //   //   textAlign: "center",
                    //   // paddingHorizontal: 20,
                    //   // borderRadius: 50,
                    // }}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  {/* <View style={styles.addRemove}>
                    <Icon
                      name="add"
                      size={30}
                      onPress={() => addRemoveQuantity(1)}
                      color="white"
                    />
                  </View> */}
                </View>
                <TouchableOpacity
                  style={{ width: "100%" }}
                  onPress={() => handlePress()}
                >
                  <View
                    style={[
                      styles.loginButton,
                      {
                        flexDirection: "row",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      SAVE
                    </Text>
                    <InnerLoader
                      animating={loading}
                      color="#fff"
                      size="small"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  buttonContainer: {
    marginTop: 20,
    padding: 20,
  },

  loginButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#F96D02",
    // marginHorizontal: 10,
    width: "100%",
    borderRadius: 5,
  },
  addRemove: {
    backgroundColor: "#F96D02",
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  purchaseButton: {
    padding: 10,
    backgroundColor: "#F96D02",
    width: "100%",
    borderRadius: 5,
  },
  pickerContainer: {
    borderBottomColor: "#777",
    borderBottomWidth: 1,
    width: "100%",
    color: "#fff",
    // paddingHorizontal: 20,
    // borderRadius: 50,
  },
  input: {
    borderBottomColor: "#777",
    borderBottomWidth: 1,
    padding: 5,
    margin: 5,
    width: "100%",
    color: "#000",
    // paddingHorizontal: 20,
    // borderRadius: 50,
  },
  inputText: {
    marginTop: 20,
    alignSelf: "flex-start",
    color: "#777",
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
  // modal style
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});
