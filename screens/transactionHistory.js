import React, { useState, useEffect, useContext } from "react";
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
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import AllCountriesAndStates from "../countries-states-master/countries";

import { PrintReceiptContext } from "./printReceiptContext";
import { REACT_APP_TARA_URL } from "@env";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
// import { printToFileAsync } from "expo-print";
import { Asset } from "expo-asset";
import { printAsync } from "expo-print";
import { manipulateAsync } from "expo-image-manipulator";
import { shareAsync } from "expo-sharing";
import { Loader, InnerLoader } from "../components/loader";

function History({ navigation }) {
  const [userDatax, setUserData] = useState({});
  const [itemObj, setItemObj] = useState({
    items: [],
    subTotalAmount: 0,
    bonusAmount: 0,
    taxAmount: 0,
    totalAmount: 0,
  });
  const { print } = useContext(PrintReceiptContext);
  const [sales, setSales] = useState([]);
  const [mainItems, setMainItems] = useState([]);
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productIDx, setProductID] = useState("");
  const [quantityx, setQuantity] = useState(0);
  const [input, setInput] = useState(false);
  const [clientsx, setClients] = useState([]);
  const [clientx, setClientx] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get("screen").width;

  const [refreshing, setRefreshing] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        console.log("false");
        if (isModalVisible) {
          return setIsModalVisible(false);
        }

        // // Prompt the user before leaving the screen
        // Alert.alert(
        //   "Discard changes?",
        //   "You have unsaved changes. Are you sure to discard them and leave the screen?",
        //   [
        //     { text: "Don't leave", style: "cancel", onPress: () => {} },
        //     {
        //       text: "Discard",
        //       style: "destructive",
        //       // If the user confirmed, then we dispatch the action we blocked earlier
        //       // This will continue the action that had triggered the removal of the screen
        //       onPress: () => navigation.dispatch(e.data.action),
        //     },
        //   ]
        // );
      }),
    [navigation]
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchData() {
      console.log("nowwww");

      let requestOptions;
      // getting data
      try {
        const userDataa = JSON.parse(await AsyncStorage.getItem("userInfo"));
        const userData = userDataa.data;
        let GeneToken = await AsyncStorage.getItem("rexxdex1");
        let apiToken = await AsyncStorage.getItem("rexxdex");
        console.log(GeneToken);

        //   if (apiToken !== "null" && apiToken !== null) {
        //     await AsyncStorage.setItem("rexxdex1", apiToken);
        //   }
        let ogrIDx = userData.orgID;
        let personalIDx = userData.personalID;
        const date = new Date();
        const firstDay = new Date(2021, date.getMonth(), 1).getTime();
        const curDay = new Date().getTime();
        const raw = JSON.stringify({
          orgID: ogrIDx,
          createdBys: [personalIDx],
          startTime: firstDay,
          endTime: curDay,
        });
        console.log(raw);
        let myHeaders;
        const token = await AsyncStorage.getItem("rexxdex1");
        myHeaders = {
          "Content-Type": "application/json",
          "Token-1": `${token}`,
        };
        requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        console.log(requestOptions);
        setUserData(userDataa);
      } catch (error) {
        console.log(error);
      }

      let isMounted = true;
      await fetch(
        `${process.env.REACT_APP_LOUGA_URL}/sales/gets`,
        requestOptions
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
          setRefreshing(false);
          console.log(result);
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
            if (result.length) {
              if (result.length !== 0) {
                setSales(result);
                setMainItems(result);
              } else {
                setSales([]);
                setMainItems([]);
              }
            }
          }
        });
      return () => {
        isMounted = false;
      };
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setLoading1(true);
      async function fetchData() {
        console.log("nowwww");

        let requestOptions;
        // getting data
        try {
          const userDataa = JSON.parse(await AsyncStorage.getItem("userInfo"));
          const userData = userDataa.data;
          let GeneToken = await AsyncStorage.getItem("rexxdex1");
          let apiToken = await AsyncStorage.getItem("rexxdex");
          console.log(GeneToken);

          //   if (apiToken !== "null" && apiToken !== null) {
          //     await AsyncStorage.setItem("rexxdex1", apiToken);
          //   }
          let ogrIDx = userData.orgID;
          let personalIDx = userData.personalID;
          const date = new Date();
          const firstDay = new Date(2021, date.getMonth(), 1).getTime();
          const curDay = new Date().getTime();
          const raw = JSON.stringify({
            orgID: ogrIDx,
            createdBys: [personalIDx],
            startTime: firstDay,
            endTime: curDay,
          });
          console.log(raw);
          let myHeaders;
          const token = await AsyncStorage.getItem("rexxdex1");
          myHeaders = {
            "Content-Type": "application/json",
            "Token-1": `${token}`,
          };
          requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          console.log(requestOptions);
          setUserData(userDataa);
        } catch (error) {
          console.log(error);
        }

        let isMounted = true;
        await fetch(
          `${process.env.REACT_APP_LOUGA_URL}/sales/gets`,
          requestOptions
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
            console.log(result);
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
                  setSales(result);
                  setMainItems(result);
                } else {
                  setSales([]);
                  setMainItems([]);
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

  const modalView = (item) => {
    let txa = 0;
    item.items.map((itm) => {
      txa += parseInt(itm.taxAmount, 10);
    });

    Object.assign(item, { taxAmount: txa });

    setItemObj(item);
    setIsModalVisible(true);
  };

  const addRemoveQuantity = (val) => {
    const conQuant = parseInt(quantityx, 10);
    console.log(conQuant);
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

  // Function to search table
  const searchFunc = (val) => {
    console.log(val);
    // const input = document.getElementById("search").value;
    const input = val;
    console.log(input);
    const filter = input.toUpperCase();
    const jsonData = [];
    // eslint-disable-next-line array-callback-return
    mainItems.map((item) => {
      let docName = item.product.name;
      if (docName == null) {
        docName = "";
      }
      if (
        item.product.name.toUpperCase().indexOf(filter) > -1 ||
        docName.toUpperCase().indexOf(filter) > -1
      ) {
        jsonData.push(item);
      }
    });
    setSales(jsonData);
  };

  const changeColor = (col) => {
    if (col === 0) {
      return "#fff000";
      // eslint-disable-next-line no-else-return
    } else if (col === 1) {
      return "#00ff00";
    } else if (col === 2) {
      return "grey";
    } else if (col === 3) {
      return "green";
    }
  };

  const changeStatus = (status) => {
    if (status === 0) {
      return "CREATED";
      // eslint-disable-next-line no-else-return
    } else if (status === 1) {
      return "PAID";
    } else if (status === 2) {
      return "READY FOR DELIVERY";
    } else if (status === 3) {
      return "DELIVERED";
    }
  };

  const generatePdf = async (filteredData, value) => {
    setLoading1(true);
    const asset = Asset.fromModule(
      require("../images/house-of-tara-black.jpg")
    );
    const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
      base64: true,
    });

    const filteredItems = filteredData.filter((item) => item.id === value);
    const clientData = filteredItems[0].individual;
    const clientName = `${clientData.title} ${clientData.fname}`;
    console.log(filteredItems[0]);
    const cashierName = `${userDatax.otherDetailsDTO.personal.fname}`;
    const allSaleItem = filteredItems[0].items;
    const bonusAmountx = filteredItems[0].bonusAmount;
    const subTotalAmountx = filteredItems[0].subTotalAmount;

    let salesString = ``;
    let ttam = 0;
    let ttxam = 0;
    allSaleItem.map((stringx) => {
      const tAm = parseInt(stringx.amount, 10);
      const txAm = parseInt(stringx.taxAmount, 10);
      ttam += tAm;
      ttxam += txAm;
      const stringg = `
      <tr style="border-bottom: 1px solid #0f0f0f;">
    <td style="border-bottom: 1px solid #0f0f0f;">${stringx.salesName}</td>
    <td style="border-bottom: 1px solid #0f0f0f;">${stringx.quantity}</td>
    <td style="text-align: end; border-bottom: 1px solid #0f0f0f;">₦${numberWithCommas(
      stringx.pricePerUnit
    )}.00</td>
    <td style="text-align: end; border-bottom: 1px solid #0f0f0f;">₦${numberWithCommas(
      stringx.amount
    )}.00</td>
  </tr>
  
  `;
      salesString += stringg;
    });

    console.log(salesString);
    const html = `
  <html>

  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.3/JsBarcode.all.min.js"></script>
  
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
  
    <title>Receipt</title>
  </head>
  
  <body>
    <div style="display: flex; align-items: center; flex-direction: column;">
      <div
        style="background-color: #ffffff; border: 1px #0f0f0f solid; padding-top: 2%; width: 80mm; display: flex; align-items: center; flex-direction: column;">
        <div><img  src="data:image/jpeg;base64,${
          image.base64
        }" height="250px" width="250px" />
        </div>
        <h4
          style="text-transform: uppercase; letter-spacing: 2mm; font-family: Arial; font-weight: 600; font-size: 18px; margin-top: -70px;">
          international
        </h4>
        <h4 style="text-transform: uppercase; font-family: Arial; font-weight: 700; margin-top: -25px;">House of tara intl
          limited lekki
        </h4>
        <h6 style="font-family: Arial;  margin-top: -20px; text-align: center; width: 70%;">13A Road 12, Onikepo Akande
          Street Off
          Admiralty Road, Lekki
          Phase 1, Lagos
        </h6>
        <div
          style="margin-top: -25px; display: flex; flex-direction: row; align-items: center; align-self: flex-start; margin-left: 50px;">
          <p style="text-transform: capitalize; font-family: Arial; font-weight: 800;  font-size: 13px;">Bill To:
          </p>
          <p style="text-transform: uppercase; font-family: Arial; font-weight: 500;  font-size: 13px;">&nbsp;STUDIO
          </p>
        </div>
        <p
          style="text-transform: capitalize; font-family: Arial; font-weight: 500;  font-size: 13px; margin-left: 100px; align-self: flex-start; margin-top: -12px;">
          ${clientName}
        </p>
        <p
          style="text-transform: uppercase; font-family: Arial; font-weight: 500;  font-size: 13px; margin-left: 100px; align-self: flex-start; margin-top: -10px;">
          Lekki<br />
          Lagos
        </p>
        <p
          style="font-family: Arial; font-weight: bold;  font-size: 13px; margin-left: 20px; align-self: flex-start; margin-top: -10px;">
          Cashier: ${cashierName}
        </p>
        <table style="font-family: Arial; font-size: small; text-align: left;">
          <tr>
            <th>Item Name</th>
            <th>Qty</th>
            <th style="text-align: end; border-bottom: 1px solid #0f0f0f;">Price</th>
            <th style="text-align: end; border-bottom: 1px solid #0f0f0f;">Ext Price</th>
          </tr>
          <!--  <tr>
            <td style="border-bottom: 1px solid #0f0f0f;">Make up for making the face up</td>
            <td style="border-bottom: 1px solid #0f0f0f;">10</td>
            <td style="text-align: end; border-bottom: 1px solid #0f0f0f;">N120,000.00</td>
            <td style="text-align: end; border-bottom: 1px solid #0f0f0f;">N120,000.00</td>
          </tr> -->
          <!-- <tr>
            <td></td>
            <td>Discount</td>
            <td>N2,000.00</td>
            <td></td>
          </tr> -->
          ${salesString}
          <tr>
            <td style="text-align: end; border-bottom: 1px solid #0f0f0f;"></td>
            <td style="text-align: end; border-bottom: 1px solid #0f0f0f;"></td>
            <td style="text-align: end; border-bottom: 1px solid #0f0f0f;">Subtotal:</td>
            <td style="text-align: end; border-bottom: 1px solid #0f0f0f;">₦${numberWithCommas(
              ttam
            )}.00</td>
          </tr>
          <tr>
            <td>Local Sales Tax</td>
            <td></td>
            <td style="text-align: end;">Tax:</td>
            <td style="text-align: end;">₦${numberWithCommas(ttxam)}.00</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td style="text-align: end; ">Discounts:</td>
            <td style="text-align: end;  border-bottom: 1px solid #0f0f0f;">₦${numberWithCommas(
              bonusAmountx
            )}.00</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td style="text-align: end; font-size: 12px; font-weight: bold;">RECEIPT TOTAL:</td>
            <td style="text-align: end;  border-bottom: 1px solid #0f0f0f; font-weight: bold;">₦${numberWithCommas(
              subTotalAmountx
            )}.00</td>
          </tr>
        </table>
        <p
          style=" font-family: Arial; font-weight: 500;  font-size: 12px; margin-left: 50px; align-self: flex-start; margin-top: 20px;">
          Check: ₦${numberWithCommas(subTotalAmountx)}.00 14/11/22
        </p>
        <p
          style=" font-family: Arial; font-weight: 500;  font-size: 12px; margin-left: 90px; align-self: flex-start; margin-top: 0px;">
          Total Sales Discount: ₦${numberWithCommas(bonusAmountx)}.00
        </p>
        <p style=" font-family: Arial; font-weight: 500;  font-size: 12px; margin-top: 0px;">
          Charges inclusive of 7.5% VAT
        </p>
        <p
          style=" font-family: Arial; font-weight: 500; text-align: center;  font-size: 12px; margin: 10px; align-self: flex-start; margin-top: 0px;">
          Thank you for shopping with us, Products purchased in good condition are not returnable
        </p>
        <p style=" font-family: Arial; font-weight: 500;  font-size: 12px; margin-top: 0px;">
          Have a great day !!!
        </p>
        <svg style="width: 50%;" id="barcode"></svg>
  
      </div>
    </div>
  
    <!-- jQuery first, then Popper.js, then Bootstrap JS
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
      crossorigin="anonymous"></script> -->
    <script type="text/javascript">
      JsBarcode("#barcode", "https://houseoftara.com", {
        lineColor: "#000000",
        width: 1,
        height: 40,
        displayValue: false
      });
  
    </script>
  
  
  </body>
  
  </html>
  `;

    setLoading1(false);
    await print(html);
    // await shareAsync(file.uri);
  };

  function numberWithCommas(x) {
    if (x === 0 || x === "0") {
      return "0";
    }
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        // paddingTop: 80,
      }}
    >
      <View
        style={{
          paddingHorizontal: 5,
          flex: 1,
          alignItems: "center",
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={["#F96D02", "#0F0F0f"]}
              onRefresh={onRefresh}
            />
          }
          keyExtractor={(item) => item.id}
          numColumns={1}
          data={sales}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => modalView(item)}>
                <View
                  style={{
                    backgroundColor: "#ffff",
                    width: screenWidth - 30,
                    maxWidth: screenWidth,
                    borderRadius: 5,
                    padding: 5,
                    elevation: 2,
                    margin: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 5,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "70%" }}>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        style={{
                          // width: 200,
                          color: "#0F0F0F",
                          paddingHorizontal: 0,
                        }}
                      >
                        {/* {item.items.map((itm, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 15,
                              fontWeight: "500",
                              color: "#0F0F0F",
                              paddingHorizontal: 0,
                            }}
                          >
                            {index !== 0 && <Text>, </Text>}
                            {itm.salesName}
                          </Text>
                        ))} */}
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "500",
                            color: "#0F0F0F",
                            paddingHorizontal: 0,
                          }}
                        >
                          <Text
                            style={{
                              color: "#F96D02",
                            }}
                          >
                            {item.individual.title}&nbsp;
                          </Text>
                          {item.individual.fname} {item.individual.lname}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "400",
                          color: "#000",
                          paddingHorizontal: 0,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: "900",
                            color: "#000",
                          }}
                        >
                          Subtotal:
                        </Text>
                        &nbsp;₦{numberWithCommas(item.subTotalAmount)}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 5,
                        // paddingVertical: 5,
                        alignSelf: "flex-end",
                        width: "30%",
                      }}
                    >
                      <View
                        style={{
                          marginLeft: 9,
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => generatePdf(sales, item.id)}
                        >
                          <View
                            style={{
                              marginTop: 5,
                              borderRadius: 5,
                              width: 100,
                              padding: 8,
                              backgroundColor: "#F96D02",
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontWeight: "bold",
                                textAlign: "center",
                                textTransform: "uppercase",
                                fontSize: 13,
                              }}
                            >
                              PRINT
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Modal transparent={true} animationType="slide" visible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "flex-end",
                backgroundColor: "#fff",
                // borderBottomWidth: 1,
                borderColor: "#f96d02",
                paddingHorizontal: 10,
                marginBottom: 10,
              }}
            >
              <Icon
                name="highlight-remove"
                size={40}
                onPress={handleModal}
                color="#f96d02"
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  backgroundColor: "#F96D02",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  items
                </Text>
              </View>
              {itemObj.items.map((itm, index) => (
                <View
                  key={index}
                  style={{
                    color: "#FFFFFF",
                    padding: 5,
                    marginHorizontal: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    marginVertical: 1,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "#0F0F0F",
                    }}
                  >
                    {itm.salesName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "400",
                        color: "#000",
                        paddingHorizontal: 0,
                      }}
                    >
                      Quantity:
                    </Text>
                    &nbsp;{numberWithCommas(itm.quantity)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "900",
                      color: "#000",
                    }}
                  >
                    ₦&nbsp;{numberWithCommas(itm.amount)}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  backgroundColor: "#F96D02",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  payment
                </Text>
              </View>
              <View
                style={{
                  color: "#FFFFFF",
                  padding: 5,
                  marginHorizontal: 5,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  marginVertical: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      color: "#000",
                      paddingHorizontal: 0,
                    }}
                  >
                    Item Total:
                  </Text>
                  ₦&nbsp;{numberWithCommas(itemObj.totalAmount)}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      color: "#000",
                      paddingHorizontal: 0,
                    }}
                  >
                    Discount:
                  </Text>
                  ₦&nbsp;{numberWithCommas(itemObj.bonusAmount)}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      color: "#000",
                      paddingHorizontal: 0,
                    }}
                  >
                    Tax:
                  </Text>
                  ₦&nbsp;{numberWithCommas(itemObj.taxAmount)}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      color: "#000",
                      paddingHorizontal: 0,
                    }}
                  >
                    Subtotal:
                  </Text>
                  ₦&nbsp;{numberWithCommas(itemObj.subTotalAmount)}
                </Text>
              </View>
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
    // flex: 1,
    // backgroundColor: "#0F0F0F",
    alignItems: "center",
    // paddingTop: 60,
    justifyContent: "center",
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
    backgroundColor: "#fff",
    // marginHorizontal: 10,
    paddingVertical: 20,
    // paddingHorizontal: 10,
    // borderRadius: 20,
    height: "100%",
    minHeight: 200,
    // maxHeight: 700,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
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

export default History;
