import React, { useState, useEffect, useRef } from "react";
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
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PayWithFlutterwave } from "flutterwave-react-native";
// or import PayWithFlutterwave from 'flutterwave-react-native';
import { REACT_APP_TARA_URL, FLUTTER_AUTH_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loader, InnerLoader } from "../components/loader";
import { ToastAlert } from "../components/alert";
// import { printToFileAsync } from "expo-print";
import { Asset } from "expo-asset";
import { printAsync } from "expo-print";
import { manipulateAsync } from "expo-image-manipulator";
import { shareAsync } from "expo-sharing";
import { Picker } from "@react-native-picker/picker";
import AllCountriesAndStates from "../countries-states-master/countries";
import { useIsFocused } from "@react-navigation/native";
import { GHeaders } from "../getHeader";
import PHeaders from "../postHeader";

const windowWidth = Dimensions.get("screen").width;

export default function Sales({ navigation }) {
  //   const { allPHeaders: myHeaders } = PHeaders();
  //   const { allGHeaders: miHeaders } = GHeaders();
  //   const miHeaders = GHeaders();

  const popAnim0 = useRef(new Animated.Value(50)).current;
  const popAnim = useRef(new Animated.Value(50)).current;
  const popAnim2 = useRef(new Animated.Value(50)).current;

  const [commentx, setComment] = useState("");
  const [passwordx, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [input, setInput] = useState(false);
  const [toastObject, setToastObject] = useState({});

  const [passwordShown, setPasswordShown] = useState(true);

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const [firstnamex, setFirstname] = useState("");
  const [lastnamex, setLastname] = useState("");
  const [othernamex, setOthername] = useState("");
  const [titlex, setTitle] = useState("");
  const [emailx, setEmail] = useState("");
  const [cityx, setCity] = useState("");
  const [addressx, setAddress] = useState("");
  const [clientsx, setClients] = useState([]);
  const [clientx, setClientx] = useState("");
  const [userDatax, setUserData] = useState({ data: {} });
  const [bonusAmountx, setBonusAmount] = useState(0);
  // const [countryx, setCountryx] = useState("");

  const [idx, setID] = useState("");
  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState("");
  const [productBranches, setProductBranches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [productBranchID, setProductBranchID] = useState("");
  const [saleTypex, setSaleType] = useState("");
  const [pricePerUnitx, setPricePerUnit] = useState("");
  const [quantityx, setQuantity] = useState("");
  const [amountx, setAmount] = useState(0);
  const [taxAmountx, setTaxAmount] = useState(0);
  const [totalAmountx, setTotalAmount] = useState("");
  const [allSaleItem, setAllSaleItem] = useState([]);
  const [subTotalAmountx, setSubTotalAmount] = useState(0);
  const [productNamex, setProductNamex] = useState("");

  const [flutterPaidAmount, setFlutterPaidAmount] = useState("");
  const [transferPaidAmount, setTransferPaidAmount] = useState("");
  const [cashPaidAmount, setCashPaidAmount] = useState("");
  const [combinedValue, setCombinedValue] = useState("");
  const [fwRemain, setFWRemain] = useState("");
  const [tfRemain, setTFRemain] = useState("");
  const [chRemain, setCHRemain] = useState("");

  const saleTypeArray = [
    { id: "1", name: "Product" },
    { id: "2", name: "Company Service" },
    { id: "3", name: "Custom Sales" },
  ];

  const isFocused = useIsFocused();

  const data = AlCountry.map((data) => {
    return { key: data.code3, value: data.name };
  });
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

  let [name, setName] = useState("anthony");

  const [editablex, setEditable] = React.useState(false);
  const [disableFlutter, setDisableFlutter] = React.useState(false);
  const [disableTrans, setDisableTrans] = React.useState(false);
  const [disableCash, setDisableCash] = React.useState(false);
  const [disableFlutterButton, setDisableFlutterButton] = React.useState(false);
  const [disableTransButton, setDisableTransButton] = React.useState(false);
  const [disableCashButton, setDisableCashButton] = React.useState(false);
  const [showFlutter, setShowFlutter] = React.useState(false);
  const [showTransfer, setShowTransfer] = React.useState(false);
  const [showCash, setShowCash] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isSalesModalVisible, setIsSalesModalVisible] = React.useState(false);
  const [isSalesModal2Visible, setIsSalesModal2Visible] = React.useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] =
    React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const handleSalesModal = () =>
    setIsSalesModalVisible(() => !isSalesModalVisible);
  const handleSalesModal2 = () =>
    setIsSalesModal2Visible(() => !isSalesModal2Visible);

  const handlePaymentModal = () => {
    setIsPaymentModalVisible(() => !isPaymentModalVisible);
    setCashPaidAmount("");
    setTransferPaidAmount("");
    setFlutterPaidAmount("");
    setFWRemain("0");
    setTFRemain("0");
    setCHRemain("0");
    setDisableTransButton(true);
    setDisableCashButton(true);

    setShowFlutter(false);
    setDisableFlutter(false);
    Animated.timing(popAnim0, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setShowTransfer(false);
    setDisableTrans(false);
    Animated.timing(popAnim, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setShowCash(false);
    setDisableCash(false);
    Animated.timing(popAnim2, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleCloseSalesModal2 = () => {
    setSaleType("");
    setProductID("");
    setProducts([]);
    setProductBranches([]);
    setProductBranchID("");
    setPricePerUnit("");
    setQuantity("");
    setAmount("");
    setTaxAmount("");
    setTotalAmount("");
    setIsSalesModal2Visible(!isSalesModal2Visible);
  };

  const handleTransCashChange = (value, num) => {
    if (num === 1) {
      setFlutterPaidAmount(value);

      let val = parseInt(value, 10);
      if (isNaN(val)) {
        val = 0;
      }
      // let tfr = parseInt(setTransferPaidAmount, 10);
      // if (isNaN(tfr)) {
      //   tfr = 0;
      // }
      // let chr = parseInt(setCashPaidAmount, 10);
      // if (isNaN(chr)) {
      //   chr = 0;
      // }
      // const subVal = tfr + chr;
      // setCombinedValue(subVal);
      setFWRemain(`${val}`);
      if (val > 0) {
        setDisableFlutterButton(false);
      } else {
        setDisableFlutterButton(true);
      }
    } else if (num === 2) {
      setTransferPaidAmount(value);

      let val = parseInt(value, 10);
      if (isNaN(val)) {
        val = 0;
      }
      // let fwr = parseInt(setFlutterPaidAmount, 10);
      // if (isNaN(fwr)) {
      //   fwr = 0;
      // }
      // let chr = parseInt(setCashPaidAmount, 10);
      // if (isNaN(chr)) {
      //   chr = 0;
      // }
      // const subVal = fwr + chr;
      // setCombinedValue(subVal);
      setTFRemain(`${val}`);
      if (val > 0) {
        setDisableTransButton(false);
      } else {
        setDisableTransButton(true);
      }
    } else if (num === 3) {
      setCashPaidAmount(value);

      let val = parseInt(value, 10);
      if (isNaN(val)) {
        val = 0;
      }
      // let tfr = parseInt(setTransferPaidAmount, 10);
      // if (isNaN(tfr)) {
      //   tfr = 0;
      // }
      // let fwr = parseInt(setFlutterPaidAmount, 10);
      // if (isNaN(fwr)) {
      //   fwr = 0;
      // }
      // const subVal = tfr + fwr;
      // setCombinedValue(subVal);
      setCHRemain(`${val}`);
      if (val > 0) {
        setDisableCashButton(false);
      } else {
        setDisableCashButton(true);
      }
    }
  };

  function numberWithCommas(x) {
    if (x === 0 || x === "0") {
      return "0";
    }
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

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

  const generatePdf = async () => {
    setLoading1(true);
    const asset = Asset.fromModule(
      require("../images/house-of-tara-black.jpg")
    );
    const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
      base64: true,
    });

    const clientData = clientsx.filter((item) => item.id === clientx);
    const clientName = `${clientData[0].title} ${clientData[0].fname}`;
    console.log(userDatax);
    const cashierName = `${userDatax.otherDetailsDTO.personal.fname}`;

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
    <td style="border-bottom: 1px solid #0f0f0f;">${stringx.productName}</td>
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
            <th>Price</th>
            <th>Ext Price</th>
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
    await printAsync({ html, width: 303 });
    // await shareAsync(file.uri);
  };

  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

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

  useEffect(() => {
    if (isFocused) {
      setLoading1(true);
      async function fetchData() {
        console.log("nowwww");

        let ogrIDx;
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
                  setClients(result);
                } else {
                  setClients([]);
                }
              }
            }
          });
        setLoading1(true);
        await fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${ogrIDx}`, {
          headers,
        })
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
                  setBranches(result);
                } else {
                  setBranches([]);
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

  const handlePress = () => {
    async function fetchData() {
      setLoading(true);
      setDisabledButton(true);
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
        const raw = JSON.stringify([
          {
            orgID: ogrIDx,
            fname: firstnamex,
            lname: lastnamex,
            oname: othernamex,
            title: titlex,
            street: addressx,
            city: cityx,
            state: residentialStatex,
            country: residentialCountryx,
            email: emailx,
            createdBy: personalIDx,
            accountOwnerID: personalIDx,
          },
        ]);
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

      await fetch(
        `${process.env.REACT_APP_LOUGA_URL}/individual/add`,
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
          console.log(result);
          setLoading(false);
          setDisabledButton(false);
          if (result.message === "Expired Access") {
            navigation.navigate("initial");
          }
          if (result.message === "Token Does Not Exist") {
            navigation.navigate("initial");
          }
          if (result.message === "Unauthorized Access") {
            navigation.navigate("initial");
          }
          if (result.status === "SUCCESS") {
            // storing data
            setInput(!input);
            handleModal();
            setFirstname("");
            setLastname("");
            setOthername("");
            setEmail("");
            setTitle("");
            setResidentialCountry("");
            setResidentialState("");
            setCity("");
            setAddress("");
            storeUser(result.data);
            setToastObject({
              status: result.status,
              message: result.message,
              open: true,
              type: "success",
              change: Math.floor(Math.random() * 100),
            });
            navigation.navigate("Home", { replace: true });
          } else {
            // Alert.alert(result.status, result.message);
            setToastObject({
              status: result.status,
              message: result.message,
              open: true,
              type: "error",
              change: Math.floor(Math.random() * 100),
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          setDisabledButton(false);
          console.log(error);
        });
      return () => {
        isMounted = false;
      };
    }
    fetchData();
  };

  /* An example function called when transaction is completed successfully or canceled */
  const handleAddSale = () => {
    // if (data.status === "successful") {
    async function fetchData() {
      setLoading(true);
      setDisableTransButton(true);
      setDisableCashButton(true);
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
        let itemss = [];
        allSaleItem.map((item) => {
          const obj = {
            saleType: item.saleType,
            salesID: item.salesID,
            branchID: item.branchID,
            pricePerUnit: item.pricePerUnit,
            quantity: item.quantity,
            amount: item.amount,
            taxAmount: item.taxAmount,
            totalAmount: item.totalAmount,
          };
          itemss.push(obj);
        });

        let subTotalx = parseInt(subTotalAmountx, 10);
        let bonusx = parseInt(bonusAmountx, 10);
        if (isNaN(subTotalx)) {
          subTotalx = 0;
        }
        if (isNaN(bonusx)) {
          bonusx = 0;
        }
        const raw = JSON.stringify({
          orgID: ogrIDx,
          individualID: clientx,
          items: itemss,
          bonusAmount: bonusAmountx,
          subTotalAmount: subTotalAmountx,
          totalAmount: subTotalx - bonusx,
          createdBy: personalIDx,
          comment: commentx,
          receiptStatus: 1,
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

      await fetch(
        `${process.env.REACT_APP_LOUGA_URL}/sales/add`,
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
          console.log(result);
          setLoading(false);
          setDisableTransButton(false);
          setDisableCashButton(false);
          if (result.message === "Expired Access") {
            navigation.navigate("initial");
          }
          if (result.message === "Token Does Not Exist") {
            navigation.navigate("initial");
          }
          if (result.message === "Unauthorized Access") {
            navigation.navigate("initial");
          }
          if (result.status === "SUCCESS") {
            // storing data
            // setInput(!input);
            generatePdf();
            handlePaymentModal();
            setIsPaymentModalVisible(false);
            setClientx("");
            setBonusAmount("");
            setComment("");
            setSubTotalAmount("");
            setAllSaleItem([]);
            setToastObject({
              status: result.status,
              message: result.message,
              open: true,
              type: "success",
              change: Math.floor(Math.random() * 100),
            });
            // navigation.navigate("Home", { replace: true });
          } else {
            // Alert.alert(result.status, result.message);
            setToastObject({
              status: result.status,
              message: result.message,
              open: true,
              type: "error",
              change: Math.floor(Math.random() * 100),
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          setDisableTransButton(false);
          setDisableCashButton(false);
          console.log(error);
        });
      return () => {
        isMounted = false;
      };
    }
    fetchData();
    // }
  };

  const handleAddPayment = () => {
    let tfr = parseInt(transferPaidAmount, 10);
    if (isNaN(tfr)) {
      tfr = 0;
    }
    let chr = parseInt(cashPaidAmount, 10);
    if (isNaN(chr)) {
      chr = 0;
    }
    let fwr = parseInt(flutterPaidAmount, 10);
    if (isNaN(fwr)) {
      fwr = 0;
    }
    const subVal = fwr + tfr + chr;
    setCombinedValue(subVal);
  };

  const handleCheckTotalPayment = () => {
    let sta = parseInt(subTotalAmountx, 10);
    if (isNaN(sta)) {
      sta = 0;
    }
    let cov = parseInt(combinedValue, 10);
    if (isNaN(cov)) {
      cov = 0;
    }
    if (sta === 0) {
      return;
    }
    const vall = sta - cov;
    if (vall === 0) {
      handleAddSale();
    } else {
      setToastObject({
        status: "INSUFFICIENT_PAYMENT",
        message: "Please pay the complete amount",
        open: true,
        type: "failure",
        change: Math.floor(Math.random() * 100),
      });
    }
  };

  const handleOnRedirect = (data) => {
    console.log(data);
    if (data.status === "successful") {
      let sta = parseInt(subTotalAmountx, 10);
      if (isNaN(sta)) {
        sta = 0;
      }
      let cov = parseInt(combinedValue, 10);
      if (isNaN(cov)) {
        cov = 0;
      }
      const vall = sta - cov;
      if (vall === 0) {
        handleAddSale();
      } else {
        let tfr = parseInt(transferPaidAmount, 10);
        if (isNaN(tfr)) {
          tfr = 0;
        }
        let chr = parseInt(cashPaidAmount, 10);
        if (isNaN(chr)) {
          chr = 0;
        }
        let fwr = parseInt(flutterPaidAmount, 10);
        if (isNaN(fwr)) {
          fwr = 0;
        }
        const subVal = fwr + tfr + chr;
        setCombinedValue(subVal);
      }
    }
  };

  const clickHandler = () => {
    if (
      firstnamex.length === 0 ||
      firstnamex === "" ||
      lastnamex.length === 0 ||
      lastnamex === "" ||
      othernamex.length === 0 ||
      othernamex === "" ||
      titlex.length === 0 ||
      titlex === ""
    ) {
      // Alert.alert("EMPTY_TEXTFIELDS", "Fill empty textfields");
      setToastObject({
        status: "EMPTY_TEXTFIELDS",
        message: "Fill empty textfields",
        open: true,
        type: "error",
        change: Math.floor(Math.random() * 100),
      });
    } else {
      handlePress();
    }
  };

  /* An example function to generate a random transaction reference */
  const generateTransactionRef = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  //   useEffect(() => {
  //     setSaleType(saleTypex);
  //   }, [saleTypex]);

  const handlefetchPS = async (newValue) => {
    setSaleType(newValue);
    console.log(newValue);
    if (newValue !== "3" && newValue !== "") {
      setEditable(false);
      setLoading1(true);
      let endpoints;
      if (newValue === "1") {
        endpoints = "products";
      } else if (newValue === "2") {
        endpoints = "companyServices";
      }
      let ogrIDx;
      let headers;
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

      await fetch(
        `${process.env.REACT_APP_LOUGA_URL}/${endpoints}/gets/${ogrIDx}`,
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
          console.log(resultres);
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
          console.log(result.length);
          if (result.length) {
            if (result.length !== 0) {
              setProducts([]);
              setProductBranches([]);
              setProducts(result);
            } else {
              setProducts([]);
              setProductBranches([]);
              setProductBranchID("");
              setProductID("");
            }
          }
        });
    } else {
      setEditable(true);
      setPricePerUnit("");
      setProductBranches([]);
      setProductBranchID("");
      setQuantity("");
      setAmount("");
      setTaxAmount("");
    }
  };

  const handleGetProductBranches = async (id) => {
    setLoading1(true);
    // if (newValue !== "2" && newValue !== "") {
    let ogrIDx;
    let headers;
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

    await fetch(
      `${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${ogrIDx}/${id}`,
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
        console.log(resultres);
        if (resultres === null || resultres === undefined || resultres === "") {
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
        console.log(result.length);
        if (result.length) {
          if (result.length !== 0) {
            setProductBranches([]);
            setProductBranches(result);
          } else {
            setProductBranches([]);
            setProductBranchID("");
          }
        }
      });
    // }
  };

  const handleOnProductChange = (value, filteredData) => {
    setProductID(value);
    if (saleTypex === "1") {
      const filteredItems = filteredData.filter((item) => item.id === value);
      console.log(filteredItems[0]);
      setPricePerUnit(`${filteredItems[0].pricePerQuantity}`);
      handleGetProductBranches(value);
    } else if (saleTypex === "2") {
      const filteredItems = filteredData.filter((item) => item.id === value);
      setPricePerUnit(`${filteredItems[0].pricePerUnit}`);
      if (filteredItems[0].branches) {
        if (filteredItems[0].branches.length !== 0) {
          setProductBranches([]);
          setProductBranchID("");
          console.log(filteredItems[0].branches);
          setProductBranches(filteredItems[0].branches);
        } else {
          setProductBranches([]);
          setProductBranchID("");
        }
      } else {
        setProductBranches([]);
        setProductBranchID("");
      }
    } else {
      setPricePerUnit("");
      setProductBranches([]);
      setProductBranchID("");
    }
  };

  // useEffect(() => {
  //   setPricePerUnit(pricePerUnitx);
  //   setQuantity(quantityx);
  // }, [pricePerUnitx, quantityx]);

  useEffect(() => {
    console.log("amount");
    const ppu = parseInt(pricePerUnitx, 10);
    const qqq = parseInt(quantityx, 10);
    let amt = ppu * qqq;
    if (isNaN(amt)) {
      amt = 0;
    }
    console.log(amt);
    setAmount(`${amt}`);
  }, [pricePerUnitx, quantityx]);

  useEffect(() => {
    console.log("total amount");
    const ppu = parseInt(pricePerUnitx, 10);
    const qqq = parseInt(quantityx, 10);
    let txa = parseInt(taxAmountx, 10);
    const amt = ppu * qqq;
    if (isNaN(txa)) {
      txa = 0;
    }
    let tam = amt + txa;
    if (isNaN(tam)) {
      tam = 0;
    }
    console.log(tam);
    setTotalAmount(`${tam}`);
  }, [pricePerUnitx, quantityx, taxAmountx]);

  const addSaleItem = () => {
    const filteredProducts = products.filter((item) => item.id === productID);
    const filteredBranch = productBranches.filter(
      (item) => item.id === productBranchID
    );
    const filteredSaleType = saleTypeArray.filter(
      (item) => item.id === saleTypex
    );
    console.log(filteredProducts);
    console.log(filteredBranch);
    let branchNamee = "";
    if (filteredBranch.length > 0) {
      branchNamee = filteredBranch[0].branchName;
    }

    let productNamee = "";
    if (filteredProducts.length > 0) {
      productNamee = filteredProducts[0].name;
    }
    let sItem = productID;
    if (saleTypex === "3") {
      productNamee = productNamex;
      sItem = productNamex;
    }
    const saleItemObj = {
      id: `SALE${new Date().getTime() * 8 + 2}`,
      saleType: saleTypex,
      saleTypeName: filteredSaleType[0].name,
      salesID: sItem,
      productName: productNamee,
      branchID: productBranchID,
      branchName: branchNamee,
      pricePerUnit: pricePerUnitx,
      quantity: quantityx,
      amount: amountx,
      taxAmount: taxAmountx,
      totalAmount: totalAmountx,
    };
    if (allSaleItem.length === 0) {
      let bbamt = parseInt(bonusAmountx, 10);
      if (isNaN(bbamt)) {
        bbamt = 0;
      }

      let subTotalx = parseInt(totalAmountx, 10);
      setSubTotalAmount(subTotalx - bbamt);
    } else {
      let subTotalx = parseInt(totalAmountx, 10);
      allSaleItem.map((subb) => {
        const curTotal = parseInt(subb.totalAmount, 10);
        subTotalx += curTotal;
      });
      let bbamt = parseInt(bonusAmountx, 10);
      if (isNaN(bbamt)) {
        bbamt = 0;
      }
      setSubTotalAmount(subTotalx + bbamt);
    }
    setAllSaleItem([...allSaleItem, saleItemObj]);
    setSaleType("");
    setProductID("");
    setProducts([]);
    setProductBranches([]);
    setProductBranchID("");
    setPricePerUnit("");
    setQuantity("");
    setAmount("");
    setTaxAmount("");
    setTotalAmount("");
    setIsSalesModalVisible(false);
  };

  const updateSaleItem = () => {
    let newAllSaleItem = allSaleItem;
    const filteredProducts = products.filter((item) => item.id === productID);
    const filteredBranch = productBranches.filter(
      (item) => item.id === productBranchID
    );
    const filteredSaleType = saleTypeArray.filter(
      (item) => item.id === saleTypex
    );
    let branchNamee = "";
    if (filteredBranch.length > 0) {
      branchNamee = filteredBranch[0].branchName;
    }

    let productNamee = "";
    if (filteredProducts.length > 0) {
      productNamee = filteredProducts[0].name;
    }
    if (saleTypex === "3") {
      productNamee = productNamex;
    }
    const saleItemObj = {
      id: idx,
      saleType: saleTypex,
      saleTypeName: filteredSaleType[0].name,
      salesID: productID,
      productName: productNamee,
      branchID: productBranchID,
      branchName: branchNamee,
      pricePerUnit: pricePerUnitx,
      quantity: quantityx,
      amount: amountx,
      taxAmount: taxAmountx,
      totalAmount: totalAmountx,
    };
    if (allSaleItem.length === 0) {
      let bbamt = parseInt(bonusAmountx, 10);
      if (isNaN(bbamt)) {
        bbamt = 0;
      }
      let subTotalx = parseInt(totalAmountx, 10);
      setSubTotalAmount(subTotalx - bbamt);
    } else {
      let objIndex;
      //Find index of specific object using findIndex method.
      objIndex = newAllSaleItem.findIndex((obj) => obj.id == idx);

      //Update object's name property.
      newAllSaleItem[objIndex] = saleItemObj;

      let subTotalx = 0;
      newAllSaleItem.map((subb) => {
        const curTotal = parseInt(subb.totalAmount, 10);
        console.log(curTotal);
        subTotalx += curTotal;
      });
      let bbamt = parseInt(bonusAmountx, 10);
      if (isNaN(bbamt)) {
        bbamt = 0;
      }
      setSubTotalAmount(subTotalx - bbamt);
    }
    setAllSaleItem(newAllSaleItem);
    setSaleType("");
    setProductID("");
    setProducts([]);
    setProductBranches([]);
    setProductBranchID("");
    setPricePerUnit("");
    setQuantity("");
    setAmount("");
    setTaxAmount("");
    setTotalAmount("");
    setIsSalesModal2Visible(false);
  };

  const handleUpdate = (value) => {
    const filteredItems = allSaleItem.filter((item) => item.id === value);
    console.log(filteredItems[0]);
    handleGetProductBranches(filteredItems[0].salesID);
    handlefetchPS(`${filteredItems[0].saleType}`);
    setID(filteredItems[0].id);
    setSaleType(filteredItems[0].saleType);
    setProductID(filteredItems[0].salesID);
    setProductBranchID(filteredItems[0].branchID);
    setProductNamex(filteredItems[0].productName);
    setPricePerUnit(filteredItems[0].pricePerUnit);
    setQuantity(filteredItems[0].quantity);
    setAmount(filteredItems[0].amount);
    setTaxAmount(filteredItems[0].taxAmount);
    setTotalAmount(filteredItems[0].totalAmount);
    handleSalesModal2();
  };

  const removeSaleItem = (value) => {
    let newAllSaleItem = allSaleItem.filter((item) => item.id !== value);

    let subTotalx = 0;
    newAllSaleItem.map((subb) => {
      const curTotal = parseInt(subb.totalAmount, 10);
      console.log(curTotal);
      subTotalx += curTotal;
    });
    let bbamt = parseInt(bonusAmountx, 10);
    if (isNaN(bbamt)) {
      bbamt = 0;
    }
    setSubTotalAmount(subTotalx - bbamt);
    setProductNamex("");
    setAllSaleItem(newAllSaleItem);
    handleCloseSalesModal2();
  };

  const handleAddBonus = (value) => {
    setBonusAmount(value);
    if (value === "") {
      setBonusAmount(0);
    }
    // let sta = subTotalAmountx;
    // if (isNaN(sta)) {
    //   sta = 0;
    // }
    if (allSaleItem.length === 0) {
      let bbamt = parseInt(value, 10);
      if (isNaN(bbamt)) {
        bbamt = 0;
      }
      setSubTotalAmount(bbamt);
    } else {
      let subTotalx = 0;
      allSaleItem.map((subb) => {
        const curTotal = parseInt(subb.totalAmount, 10);
        subTotalx += curTotal;
      });
      let bbamt = parseInt(value, 10);
      if (isNaN(bbamt)) {
        bbamt = 0;
      }
      setSubTotalAmount(subTotalx - bbamt);
    }
  };

  const flutterSlideIn = (easing) => {
    setShowFlutter(true);
    setDisableFlutter(true);
    Animated.timing(popAnim0, {
      toValue: 200,
      duration: 500,
      easing,
      useNativeDriver: false,
    }).start();
    // }).start();
  };

  const flutterSlideOut = (easing) => {
    setShowFlutter(false);
    setDisableFlutter(false);
    Animated.timing(popAnim0, {
      toValue: 50,
      easing,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const transSlideIn = (easing) => {
    setShowTransfer(true);
    setDisableTrans(true);
    Animated.timing(popAnim, {
      toValue: 200,
      duration: 500,
      easing,
      useNativeDriver: false,
    }).start();
    // }).start();
  };

  const transSlideOut = (easing) => {
    setShowTransfer(false);
    setDisableTrans(false);
    Animated.timing(popAnim, {
      toValue: 50,
      easing,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const cashSlideIn = (easing) => {
    setShowCash(true);
    setDisableCash(true);
    Animated.timing(popAnim2, {
      toValue: 200,
      duration: 500,
      easing,
      useNativeDriver: false,
    }).start();
    // }).start();
  };

  const cashSlideOut = (easing) => {
    setShowCash(false);
    setDisableCash(false);
    Animated.timing(popAnim2, {
      toValue: 50,
      duration: 500,
      easing,
      useNativeDriver: false,
    }).start();
  };

  return (
    // <Sandbox />
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderColor: "#f96d02",
            padding: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              color: "#F96D02",
              paddingHorizontal: 10,
              // fontFamily: "serif",
              width: 300,
            }}
          >
            Make a sale
          </Text>
        </View>
        {/* <Text style={{ color: "#F96D02" }}>
          Meeting the perfect one shouldn’t be a hassle.
        </Text> */}
        <View style={{ paddingTop: 10, justifyContent: "center" }}>
          <Text style={styles.inputText}>Client:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={{
                color: "#777",
                margin: -5,
                width: "95%",
              }}
              itemStyle={{
                backgroundColor: "#F96D02",
                color: "#000",
                fontFamily: "Ebrima",
                fontSize: 19,
              }}
              selectedValue={clientx}
              onValueChange={(newValue) => setClientx(newValue)}
            >
              <Picker.Item label="Select Client" value="" />
              {clientsx.map((apic) => (
                <Picker.Item
                  label={`${apic.fname} ${apic.lname}`}
                  key={apic.id}
                  value={apic.id}
                />
              ))}
            </Picker>
            <Icon name="add" size={35} onPress={handleModal} color="#f96d02" />
          </View>
          <Text style={styles.inputText}>Bonus Amount:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Bonus Amount"
            value={bonusAmountx}
            onChangeText={(value) => handleAddBonus(value)}
            style={styles.input}
            placeholderTextColor={"#777"}
          />
          <Text style={styles.inputText}>Comment:</Text>
          <TextInput
            keyboardType="default"
            // placeholder="Comment"
            value={commentx}
            multiline
            numberOfLines={5}
            onChangeText={(value) => setComment(value)}
            style={styles.txAInput}
            placeholderTextColor={"#777"}
          />
          {/* <View style={{ marginVertical: 30, height: 1, width: "80%" }} />
          <Button title="button" onPress={handleModal} /> */}
          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={styles.modalView}>
                <View
                  style={{
                    alignItems: "flex-start",
                    backgroundColor: "#fff",
                    // borderBottomWidth: 1,
                    borderColor: "#f96d02",
                    // padding: 2,
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="highlight-remove"
                    size={30}
                    onPress={handleModal}
                    color="#f96d02"
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "#f96d02",
                      padding: 20,
                      borderRadius: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
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
                        fontSize: 20,
                        color: "#fff",
                      }}
                    >
                      Add Client
                    </Text>
                  </View>
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>
                    First Name:
                  </Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="First Name"
                    value={firstnamex}
                    onChangeText={(value) => setFirstname(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Last Name:
                  </Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="Last Name"
                    value={lastnamex}
                    onChangeText={(value) => setLastname(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Other Name:
                  </Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="Other Name"
                    value={othernamex}
                    onChangeText={(value) => setOthername(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Title:
                  </Text>
                  <View style={styles.pickerContainer2}>
                    <Picker
                      style={{
                        color: "#777",
                        margin: -5,
                      }}
                      selectedValue={titlex}
                      onValueChange={(newValue) => setTitle(newValue)}
                    >
                      <Picker.Item label="Select Title" value="" />
                      {titlez.map((tit) => (
                        <Picker.Item
                          label={tit.value}
                          value={tit.value}
                          key={tit.key}
                        />
                      ))}
                    </Picker>
                  </View>
                  <Text style={styles.inputText}>Email:</Text>
                  <TextInput
                    keyboardType="default"
                    placeholder="Email"
                    value={emailx}
                    onChangeText={(value) => setEmail(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>Country:</Text>
                  <View style={styles.pickerContainer2}>
                    <Picker
                      style={{
                        color: "#777",
                        margin: -5,
                      }}
                      itemStyle={{
                        backgroundColor: "#F96D02",
                        color: "#000",
                        fontFamily: "Ebrima",
                        fontSize: 19,
                      }}
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
                  <View style={styles.pickerContainer2}>
                    <Picker
                      style={{
                        color: "#777",
                        margin: -5,
                      }}
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
                  <TouchableOpacity
                    disabled={disabledButton}
                    onPress={clickHandler}
                  >
                    <View
                      style={[
                        styles.loginButton,
                        { flexDirection: "row", justifyContent: "center" },
                      ]}
                    >
                      <Text style={styles.loginText}>SAVE</Text>
                      <InnerLoader
                        animating={loading}
                        color="#fff"
                        size="small"
                      />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <View>
            <TouchableOpacity onPress={handleSalesModal}>
              <View
                style={{
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: "#F96D02",
                  marginHorizontal: 10,
                  borderRadius: 5,
                  width: 100,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  ADD ITEM
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            transparent={true}
            animationType="slide"
            visible={isSalesModalVisible}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={styles.modalView}>
                <View
                  style={{
                    alignItems: "flex-start",
                    backgroundColor: "#fff",
                    // borderBottomWidth: 1,
                    borderColor: "#f96d02",
                    // padding: 2,
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="highlight-remove"
                    size={30}
                    onPress={handleSalesModal}
                    color="#f96d02"
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "#f96d02",
                      padding: 20,
                      borderRadius: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
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
                        fontSize: 20,
                        color: "#fff",
                      }}
                    >
                      Sales Item
                    </Text>
                  </View>
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Sale Type:
                  </Text>
                  <View style={styles.pickerContainer2}>
                    <Picker
                      style={{
                        color: "#777",
                        margin: -5,
                      }}
                      selectedValue={saleTypex}
                      onValueChange={(newValue) => handlefetchPS(newValue)}
                    >
                      <Picker.Item label="Select Type" value="" />
                      <Picker.Item value="1" label="Product" />
                      <Picker.Item value="2" label="Company Service" />
                      <Picker.Item value="3" label="Custom Sales" />
                    </Picker>
                  </View>
                  {saleTypex !== "" && saleTypex !== "3" && (
                    <>
                      {saleTypex === "1" && (
                        <>
                          <Text style={styles.inputText}>
                            <Text style={{ color: "red" }}>* </Text>
                            Product:
                          </Text>
                          <View style={styles.pickerContainer2}>
                            <Picker
                              style={{
                                color: "#777",
                                margin: -5,
                              }}
                              itemStyle={{
                                backgroundColor: "#F96D02",
                                color: "#000",
                                fontFamily: "Ebrima",
                                fontSize: 19,
                              }}
                              selectedValue={productID}
                              onValueChange={(newValue) =>
                                handleOnProductChange(newValue, products)
                              }
                            >
                              <Picker.Item label="Select Product" value="" />
                              {products.map((apic) => (
                                <Picker.Item
                                  label={apic.name}
                                  key={apic.id}
                                  value={apic.id}
                                />
                              ))}
                            </Picker>
                          </View>
                          <Text style={styles.inputText}>
                            <Text style={{ color: "red" }}>* </Text>
                            Branch:
                          </Text>
                          <View style={styles.pickerContainer2}>
                            <Picker
                              style={{
                                color: "#777",
                                margin: -5,
                              }}
                              itemStyle={{
                                backgroundColor: "#F96D02",
                                color: "#000",
                                fontFamily: "Ebrima",
                                fontSize: 19,
                              }}
                              selectedValue={productBranchID}
                              onValueChange={(newValue) =>
                                setProductBranchID(newValue)
                              }
                            >
                              <Picker.Item label="Select Branch" value="" />
                              {productBranches.map((apic) => (
                                <Picker.Item
                                  label={apic.branchName}
                                  key={apic.id}
                                  value={apic.id}
                                />
                              ))}
                            </Picker>
                          </View>
                        </>
                      )}
                      {saleTypex === "2" && (
                        <>
                          <Text style={styles.inputText}>
                            <Text style={{ color: "red" }}>* </Text>
                            Company Services:
                          </Text>
                          <View style={styles.pickerContainer2}>
                            <Picker
                              style={{
                                color: "#777",
                                margin: -5,
                              }}
                              itemStyle={{
                                backgroundColor: "#F96D02",
                                color: "#000",
                                fontFamily: "Ebrima",
                                fontSize: 19,
                              }}
                              selectedValue={productID}
                              onValueChange={(newValue) =>
                                handleOnProductChange(newValue, products)
                              }
                            >
                              <Picker.Item label="Select Service" value="" />
                              {products.map((apic) => (
                                <Picker.Item
                                  label={apic.name}
                                  key={apic.id}
                                  value={apic.id}
                                />
                              ))}
                            </Picker>
                          </View>
                          <Text style={styles.inputText}>
                            <Text style={{ color: "red" }}>* </Text>
                            Branch:
                          </Text>
                          <View style={styles.pickerContainer2}>
                            <Picker
                              style={{
                                color: "#777",
                                margin: -5,
                              }}
                              itemStyle={{
                                backgroundColor: "#F96D02",
                                color: "#000",
                                fontFamily: "Ebrima",
                                fontSize: 19,
                              }}
                              selectedValue={productBranchID}
                              onValueChange={(newValue) =>
                                setProductBranchID(newValue)
                              }
                            >
                              <Picker.Item label="Select Branch" value="" />
                              {productBranches.map((apic) => (
                                <Picker.Item
                                  label={apic.name}
                                  key={apic.id}
                                  value={apic.id}
                                />
                              ))}
                            </Picker>
                          </View>
                        </>
                      )}
                    </>
                  )}
                  {saleTypex === "3" && (
                    <>
                      <Text style={styles.inputText}>
                        <Text style={{ color: "red" }}>* </Text>Name:
                      </Text>
                      <TextInput
                        keyboardType="default"
                        placeholder="Name"
                        value={productNamex}
                        onChangeText={(value) => setProductNamex(value)}
                        style={styles.input}
                        placeholderTextColor={"#777"}
                      />
                      <Text style={styles.inputText}>
                        <Text style={{ color: "red" }}>* </Text>
                        Branch:
                      </Text>
                      <View style={styles.pickerContainer2}>
                        <Picker
                          style={{
                            color: "#777",
                            margin: -5,
                          }}
                          itemStyle={{
                            backgroundColor: "#F96D02",
                            color: "#000",
                            fontFamily: "Ebrima",
                            fontSize: 19,
                          }}
                          selectedValue={productBranchID}
                          onValueChange={(newValue) =>
                            setProductBranchID(newValue)
                          }
                        >
                          <Picker.Item label="Select Branch" value="" />
                          {branches.map((apic) => (
                            <Picker.Item
                              label={apic.name}
                              key={apic.id}
                              value={apic.id}
                            />
                          ))}
                        </Picker>
                      </View>
                    </>
                  )}
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Price Per
                    Unit/Quantity:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Price Per Unit/Quantity"
                    value={pricePerUnitx}
                    editable={editablex}
                    onChangeText={(value) => setPricePerUnit(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Quantity:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Quantity"
                    value={quantityx}
                    onChangeText={(value) => setQuantity(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Amount:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Amount"
                    value={amountx}
                    editable={false}
                    onChangeText={(value) => setAmount(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Tax Amount:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Tax Amount"
                    value={taxAmountx}
                    onChangeText={(value) => setTaxAmount(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Total Amount:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Total Amount"
                    value={totalAmountx}
                    editable={false}
                    onChangeText={(value) => setTotalAmount(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />

                  <TouchableOpacity onPress={addSaleItem}>
                    <View
                      style={[
                        styles.loginButton,
                        { flexDirection: "row", justifyContent: "center" },
                      ]}
                    >
                      <Text style={styles.loginText}>ADD</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
          {/* update modal */}

          <Modal
            transparent={true}
            animationType="slide"
            visible={isSalesModal2Visible}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={styles.modalView}>
                <View
                  style={{
                    alignItems: "flex-start",
                    backgroundColor: "#fff",
                    // borderBottomWidth: 1,
                    borderColor: "#f96d02",
                    // padding: 2,
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="highlight-remove"
                    size={30}
                    onPress={handleCloseSalesModal2}
                    color="#f96d02"
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableOpacity onPress={() => removeSaleItem(idx)}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        backgroundColor: "red",
                        padding: 15,
                        borderRadius: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
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
                          fontSize: 20,
                          color: "#fff",
                        }}
                      >
                        REMOVE ITEM
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Sale Type:
                  </Text>
                  <View style={styles.pickerContainer2}>
                    <Picker
                      style={{
                        color: "#777",
                        margin: -5,
                      }}
                      selectedValue={saleTypex}
                      onValueChange={(newValue) => handlefetchPS(newValue)}
                    >
                      <Picker.Item label="Select Type" value="" />
                      <Picker.Item value="1" label="Product" />
                      <Picker.Item value="2" label="Company Service" />
                      <Picker.Item value="3" label="Custom Sales" />
                    </Picker>
                  </View>
                  {saleTypex !== "" && saleTypex !== "3" && (
                    <>
                      {saleTypex === "1" && (
                        <>
                          <Text style={styles.inputText}>
                            <Text style={{ color: "red" }}>* </Text>
                            Product:
                          </Text>
                          <View style={styles.pickerContainer2}>
                            <Picker
                              style={{
                                color: "#777",
                                margin: -5,
                              }}
                              itemStyle={{
                                backgroundColor: "#F96D02",
                                color: "#000",
                                fontFamily: "Ebrima",
                                fontSize: 19,
                              }}
                              selectedValue={productID}
                              onValueChange={(newValue) =>
                                handleOnProductChange(newValue, products)
                              }
                            >
                              <Picker.Item label="Select Product" value="" />
                              {products.map((apic) => (
                                <Picker.Item
                                  label={apic.name}
                                  key={apic.id}
                                  value={apic.id}
                                />
                              ))}
                            </Picker>
                          </View>
                          <Text style={styles.inputText}>
                            <Text style={{ color: "red" }}>* </Text>
                            Branch:
                          </Text>
                          <View style={styles.pickerContainer2}>
                            <Picker
                              style={{
                                color: "#777",
                                margin: -5,
                              }}
                              itemStyle={{
                                backgroundColor: "#F96D02",
                                color: "#000",
                                fontFamily: "Ebrima",
                                fontSize: 19,
                              }}
                              selectedValue={productBranchID}
                              onValueChange={(newValue) =>
                                setProductBranchID(newValue)
                              }
                            >
                              <Picker.Item label="Select Branch" value="" />
                              {productBranches.map((apic) => (
                                <Picker.Item
                                  label={apic.branchName}
                                  key={apic.id}
                                  value={apic.id}
                                />
                              ))}
                            </Picker>
                          </View>
                        </>
                      )}
                      {saleTypex === "2" && (
                        <>
                          <Text style={styles.inputText}>
                            <Text style={{ color: "red" }}>* </Text>
                            Company Services:
                          </Text>
                          <View style={styles.pickerContainer2}>
                            <Picker
                              style={{
                                color: "#777",
                                margin: -5,
                              }}
                              itemStyle={{
                                backgroundColor: "#F96D02",
                                color: "#000",
                                fontFamily: "Ebrima",
                                fontSize: 19,
                              }}
                              selectedValue={productID}
                              onValueChange={(newValue) =>
                                handleOnProductChange(newValue, products)
                              }
                            >
                              <Picker.Item label="Select Service" value="" />
                              {products.map((apic) => (
                                <Picker.Item
                                  label={apic.name}
                                  key={apic.id}
                                  value={apic.id}
                                />
                              ))}
                            </Picker>
                          </View>
                          <Text style={styles.inputText}>
                            <Text style={{ color: "red" }}>* </Text>
                            Branch:
                          </Text>
                          <View style={styles.pickerContainer2}>
                            <Picker
                              style={{
                                color: "#777",
                                margin: -5,
                              }}
                              itemStyle={{
                                backgroundColor: "#F96D02",
                                color: "#000",
                                fontFamily: "Ebrima",
                                fontSize: 19,
                              }}
                              selectedValue={productBranchID}
                              onValueChange={(newValue) =>
                                setProductBranchID(newValue)
                              }
                            >
                              <Picker.Item label="Select Branch" value="" />
                              {productBranches.map((apic) => (
                                <Picker.Item
                                  label={apic.name}
                                  key={apic.id}
                                  value={apic.id}
                                />
                              ))}
                            </Picker>
                          </View>
                        </>
                      )}
                    </>
                  )}
                  {saleTypex === "3" && (
                    <>
                      <Text style={styles.inputText}>
                        <Text style={{ color: "red" }}>* </Text>Name:
                      </Text>
                      <TextInput
                        keyboardType="default"
                        placeholder="Name"
                        value={productNamex}
                        onChangeText={(value) => setProductNamex(value)}
                        style={styles.input}
                        placeholderTextColor={"#777"}
                      />
                      <Text style={styles.inputText}>
                        <Text style={{ color: "red" }}>* </Text>
                        Branch:
                      </Text>
                      <View style={styles.pickerContainer2}>
                        <Picker
                          style={{
                            color: "#777",
                            margin: -5,
                          }}
                          itemStyle={{
                            backgroundColor: "#F96D02",
                            color: "#000",
                            fontFamily: "Ebrima",
                            fontSize: 19,
                          }}
                          selectedValue={productBranchID}
                          onValueChange={(newValue) =>
                            setProductBranchID(newValue)
                          }
                        >
                          <Picker.Item label="Select Branch" value="" />
                          {branches.map((apic) => (
                            <Picker.Item
                              label={apic.name}
                              key={apic.id}
                              value={apic.id}
                            />
                          ))}
                        </Picker>
                      </View>
                    </>
                  )}
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Price Per
                    Unit/Quantity:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Price Per Unit/Quantity"
                    value={pricePerUnitx}
                    editable={editablex}
                    onChangeText={(value) => setPricePerUnit(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Quantity:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Quantity"
                    value={quantityx}
                    onChangeText={(value) => setQuantity(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Amount:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Amount"
                    value={amountx}
                    editable={false}
                    onChangeText={(value) => setAmount(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Tax Amount:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Tax Amount"
                    value={taxAmountx}
                    onChangeText={(value) => setTaxAmount(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />
                  <Text style={styles.inputText}>
                    <Text style={{ color: "red" }}>* </Text>Total Amount:
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Total Amount"
                    value={totalAmountx}
                    editable={false}
                    onChangeText={(value) => setTotalAmount(value)}
                    style={styles.input}
                    placeholderTextColor={"#777"}
                  />

                  <TouchableOpacity onPress={updateSaleItem}>
                    <View
                      style={[
                        styles.loginButton,
                        { flexDirection: "row", justifyContent: "center" },
                      ]}
                    >
                      <Text style={styles.loginText}>UPDATE</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <Modal
            transparent={true}
            animationType="slide"
            visible={isPaymentModalVisible}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View style={styles.modalViewHF}>
                <View
                  style={{
                    alignItems: "flex-start",
                    backgroundColor: "#fff",
                    // borderBottomWidth: 1,
                    borderColor: "#f96d02",
                    // padding: 2,
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="highlight-remove"
                    size={30}
                    onPress={handlePaymentModal}
                    color="#f96d02"
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                  // style={{
                  //   flex: 1,
                  //   justifyContent: "space-evenly",
                  // }}
                  >
                    <TouchableOpacity
                      style={{ margin: 10 }}
                      onPress={() => flutterSlideIn(Easing.ease)}
                      disabled={disableFlutter}
                    >
                      <View
                        style={{
                          backgroundColor: "#f5f5f5",
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Animated.View
                          style={{
                            minHeight: popAnim0,
                          }}
                        >
                          <Text
                            style={{
                              color: "#000",
                              margin: 5,
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            Pay with Flutterwave
                          </Text>
                          <Image
                            source={require("../images/flutterwave.png")}
                            style={{
                              height: 25,
                              width: 159,
                              alignSelf: "flex-end",
                            }}
                          />
                          {showFlutter && (
                            <View>
                              <View>
                                {subTotalAmountx && (
                                  <Text style={{ color: "green" }}>
                                    Total Amount: ₦
                                    {numberWithCommas(subTotalAmountx)}
                                    .00
                                  </Text>
                                )}
                                {combinedValue && (
                                  <Text
                                    style={{
                                      color: "#0F0F0F",
                                    }}
                                  >
                                    Paid Amount: ₦
                                    {numberWithCommas(combinedValue)}
                                    .00
                                  </Text>
                                )}
                                {fwRemain && (
                                  <Text
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    Paying amount: ₦{numberWithCommas(fwRemain)}
                                    .00
                                  </Text>
                                )}
                              </View>
                              <Text style={styles.inputText}>
                                <Text style={{ color: "red" }}>* </Text>
                                Amount:
                              </Text>
                              <TextInput
                                keyboardType="numeric"
                                placeholder="Amount"
                                value={flutterPaidAmount}
                                onChangeText={(value) =>
                                  handleTransCashChange(value, 1)
                                }
                                style={styles.input}
                                placeholderTextColor={"#777"}
                              />
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    flutterSlideOut(Easing.ease);
                                    // handleTransCashChange("0", 1);
                                  }}
                                >
                                  <View
                                    style={{
                                      padding: 10,
                                      marginTop: 10,
                                      backgroundColor: "red",
                                      marginHorizontal: 10,
                                      borderRadius: 5,
                                      width: 80,
                                    }}
                                  >
                                    <Text style={styles.loginText}>CLOSE</Text>
                                  </View>
                                </TouchableOpacity>
                                <PayWithFlutterwave
                                  onRedirect={handleOnRedirect}
                                  options={{
                                    tx_ref: generateTransactionRef(10),
                                    authorization: `${FLUTTER_AUTH_KEY}`,
                                    customer: {
                                      email: userDatax.data.email,
                                    },
                                    amount: flutterPaidAmount,
                                    currency: "NGN",
                                    payment_options: "card",
                                  }}
                                  customButton={(props) => (
                                    <TouchableOpacity
                                      // style={{ margin: 10 }}
                                      onPress={props.onPress}
                                      isBusy={props.isInitializing}
                                      disabled={disableFlutterButton}
                                    >
                                      <View
                                        style={{
                                          padding: 10,
                                          marginTop: 10,
                                          backgroundColor: "#F96D02",
                                          marginHorizontal: 10,
                                          borderRadius: 5,
                                          width: 80,
                                          flexDirection: "row",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Text style={styles.loginText}>
                                          PAY
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  )}
                                />
                              </View>
                            </View>
                          )}
                        </Animated.View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ margin: 10 }}
                      onPress={() => transSlideIn(Easing.ease)}
                      disabled={disableTrans}
                    >
                      <View
                        style={{
                          backgroundColor: "#f5f5f5",
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Animated.View
                          style={{
                            minHeight: popAnim,
                          }}
                        >
                          <Text
                            style={{
                              color: "#000",
                              margin: 5,
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            Pay with Transfer
                          </Text>
                          <MaterialCommunityIcons
                            style={{ alignSelf: "flex-end" }}
                            name="bank"
                            size={36}
                            color="black"
                          />
                          {showTransfer && (
                            <View>
                              <View>
                                {subTotalAmountx && (
                                  <Text style={{ color: "green" }}>
                                    Total Amount: ₦
                                    {numberWithCommas(subTotalAmountx)}
                                    .00
                                  </Text>
                                )}
                                {combinedValue && (
                                  <Text
                                    style={{
                                      color: "#0F0F0F",
                                    }}
                                  >
                                    Paid Amount: ₦
                                    {numberWithCommas(combinedValue)}
                                    .00
                                  </Text>
                                )}
                                {tfRemain && (
                                  <Text
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    Paying Amount: ₦{numberWithCommas(tfRemain)}
                                    .00
                                  </Text>
                                )}
                              </View>
                              <Text style={styles.inputText}>
                                <Text style={{ color: "red" }}>* </Text>
                                Amount:
                              </Text>
                              <TextInput
                                keyboardType="numeric"
                                placeholder="Amount"
                                value={transferPaidAmount}
                                onChangeText={(value) =>
                                  handleTransCashChange(value, 2)
                                }
                                style={styles.input}
                                placeholderTextColor={"#777"}
                              />
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    transSlideOut(Easing.ease);
                                    // handleTransCashChange("0", 2);
                                  }}
                                >
                                  <View
                                    style={{
                                      padding: 10,
                                      marginTop: 10,
                                      backgroundColor: "red",
                                      marginHorizontal: 10,
                                      borderRadius: 5,
                                      width: 80,
                                    }}
                                  >
                                    <Text style={styles.loginText}>CLOSE</Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  disabled={disableTransButton}
                                  onPress={handleAddPayment}
                                >
                                  <View
                                    style={{
                                      padding: 10,
                                      marginTop: 10,
                                      backgroundColor: "#F96D02",
                                      marginHorizontal: 10,
                                      borderRadius: 5,
                                      width: 80,
                                      flexDirection: "row",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Text style={styles.loginText}>PAY</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        </Animated.View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ margin: 10 }}
                      onPress={() => cashSlideIn(Easing.ease)}
                      disabled={disableCash}
                    >
                      <View
                        style={{
                          backgroundColor: "#f5f5f5",
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Animated.View
                          style={{
                            minHeight: popAnim2,
                          }}
                        >
                          <Text
                            style={{
                              color: "#000",
                              margin: 5,
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            Pay with Cash
                          </Text>
                          <MaterialCommunityIcons
                            style={{ alignSelf: "flex-end" }}
                            name="cash"
                            size={36}
                            color="black"
                          />
                          {showCash && (
                            <View>
                              <View>
                                {subTotalAmountx && (
                                  <Text style={{ color: "green" }}>
                                    Total Amount: ₦
                                    {numberWithCommas(subTotalAmountx)}
                                    .00
                                  </Text>
                                )}
                                {combinedValue && (
                                  <Text
                                    style={{
                                      color: "#0F0F0F",
                                    }}
                                  >
                                    Paid Amount: ₦
                                    {numberWithCommas(combinedValue)}
                                    .00
                                  </Text>
                                )}
                                {chRemain && (
                                  <Text
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    Paying Amount: ₦{numberWithCommas(chRemain)}
                                    .00
                                  </Text>
                                )}
                              </View>
                              <Text style={styles.inputText}>
                                <Text style={{ color: "red" }}>* </Text>
                                Amount:
                              </Text>
                              <TextInput
                                keyboardType="numeric"
                                placeholder="Amount"
                                value={cashPaidAmount}
                                onChangeText={(value) =>
                                  handleTransCashChange(value, 3)
                                }
                                style={styles.input}
                                placeholderTextColor={"#777"}
                              />

                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    cashSlideOut(Easing.ease);
                                    // handleTransCashChange("0", 3);
                                  }}
                                >
                                  <View
                                    style={{
                                      padding: 10,
                                      marginTop: 10,
                                      backgroundColor: "red",
                                      marginHorizontal: 10,
                                      borderRadius: 5,
                                      width: 80,
                                    }}
                                  >
                                    <Text style={styles.loginText}>CLOSE</Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  disabled={disableCashButton}
                                  onPress={handleAddPayment}
                                >
                                  <View
                                    style={{
                                      padding: 10,
                                      marginTop: 10,
                                      backgroundColor: "#F96D02",
                                      marginHorizontal: 10,
                                      borderRadius: 5,
                                      width: 80,
                                      flexDirection: "row",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Text style={styles.loginText}>PAY</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        </Animated.View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
                <TouchableOpacity
                  // style={{ margin: 10 }}
                  onPress={handleCheckTotalPayment}
                >
                  <View
                    style={{
                      padding: 15,
                      marginTop: 10,
                      backgroundColor: "#F96D02",
                      marginHorizontal: 10,
                      borderRadius: 5,
                      // width: 80,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={[styles.loginText, {}]}>COMPLETE PAYMENT</Text>
                    <InnerLoader
                      animating={loading}
                      color="#fff"
                      size="small"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View
            style={{
              marginTop: 10,
              paddingTop: 20,
              marginHorizontal: 5,
              borderTopWidth: 1,
              borderColor: "#777",
            }}
          >
            <View
              style={{
                marginTop: 10,
                borderTopWidth: 1,
                borderColor: "#0f0f0f",
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  borderLeftWidth: 1,
                  borderColor: "#0f0f0f",
                }}
              >
                <Text
                  style={[
                    styles.salesItemTitle,
                    {
                      width: "35%",
                    },
                  ]}
                >
                  Item
                </Text>
                <Text
                  style={[
                    styles.salesItemTitle,
                    {
                      width: "10%",
                    },
                  ]}
                >
                  Qty
                </Text>
                <Text
                  style={[
                    styles.salesItemTitle,
                    {
                      width: "10%",
                    },
                  ]}
                >
                  Tax (₦)
                </Text>
                <Text
                  style={[
                    styles.salesItemTitle,
                    {
                      width: "15%",
                    },
                  ]}
                >
                  Price (₦)
                </Text>
                <Text
                  style={[
                    styles.salesItemTitle,
                    {
                      width: "15%",
                    },
                  ]}
                >
                  Amount (₦)
                </Text>
                <Text
                  style={[
                    styles.salesItemTitle,
                    {
                      width: "15%",
                    },
                  ]}
                >
                  Total Amount (₦)
                </Text>
              </View>
            </View>
          </View>
          {allSaleItem.map((sItem) => {
            return (
              <TouchableOpacity
                key={sItem.id}
                onPress={() => handleUpdate(sItem.id)}
              >
                <View
                  style={{
                    marginHorizontal: 5,
                  }}
                >
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderColor: "#0f0f0f",
                    }}
                  />
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        borderLeftWidth: 1,
                        borderColor: "#0f0f0f",
                      }}
                    >
                      <View
                        style={[
                          styles.salesItemBody,
                          {
                            width: "35%",
                          },
                        ]}
                      >
                        <Text>
                          <Text style={{ fontWeight: "500" }}>Type: </Text>
                          {sItem.saleTypeName}
                        </Text>
                        <Text>
                          <Text style={{ fontWeight: "500" }}>Name: </Text>
                          {sItem.productName}
                        </Text>
                        <Text>
                          <Text style={{ fontWeight: "500" }}>Branch: </Text>
                          {sItem.branchName}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.salesItemBody,
                          {
                            width: "10%",
                          },
                        ]}
                      >
                        {numberWithCommas(sItem.quantity)}
                      </Text>
                      <Text
                        style={[
                          styles.salesItemBody,
                          {
                            width: "10%",
                          },
                        ]}
                      >
                        {numberWithCommas(sItem.taxAmount)}
                      </Text>
                      <Text
                        style={[
                          styles.salesItemBody,
                          {
                            width: "15%",
                          },
                        ]}
                      >
                        {numberWithCommas(sItem.pricePerUnit)}
                      </Text>
                      <Text
                        style={[
                          styles.salesItemBody,
                          {
                            width: "15%",
                          },
                        ]}
                      >
                        {numberWithCommas(sItem.amount)}
                      </Text>
                      <Text
                        style={[
                          styles.salesItemBody,
                          {
                            width: "15%",
                          },
                        ]}
                      >
                        {numberWithCommas(sItem.totalAmount)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <View
            style={{
              marginHorizontal: 5,
              minHeight: 30,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#0f0f0f",
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  borderLeftWidth: 1,
                  borderColor: "#0f0f0f",
                }}
              >
                <View
                  style={[
                    styles.salesItemBody,
                    {
                      width: "70%",
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.salesItemTitle,
                    {
                      width: "15%",
                    },
                  ]}
                >
                  Bonus Amount (₦):
                </Text>
                <Text
                  style={[
                    styles.salesItemBody,
                    {
                      width: "15%",
                    },
                  ]}
                >
                  {numberWithCommas(bonusAmountx)}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#0f0f0f",
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  borderLeftWidth: 1,
                  borderColor: "#0f0f0f",
                }}
              >
                <View
                  style={[
                    styles.salesItemBody,
                    {
                      width: "70%",
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.salesItemTitle,
                    {
                      width: "15%",
                    },
                  ]}
                >
                  Subtotal(₦):
                </Text>
                <Text
                  style={[
                    styles.salesItemBody,
                    {
                      width: "15%",
                    },
                  ]}
                >
                  {numberWithCommas(subTotalAmountx)}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#0f0f0f",
              }}
            />
          </View>
          {/* <Button title="print" onPress={generatePdf} /> */}
          {/* <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: `${FLUTTER_AUTH_KEY}`,
              customer: {
                email: "user@gmail.com",
              },
              amount: 2000,
              currency: "NGN",
              payment_options: "card",
            }}
          />
          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: `${FLUTTER_AUTH_KEY}`,
              customer: {
                email: "customer-email@example.com",
              },
              amount: 2000,
              currency: "NGN",
              payment_options: "card",
            }}
            customButton={(props) => (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={props.onPress}
                isBusy={props.isInitializing}
                disabled={props.disabled}
              >
                <Text style={styles.loginText}>Pay $500</Text>
              </TouchableOpacity>
            )}
          /> */}
          <View>
            <TouchableOpacity
              onPress={handlePaymentModal}
              disabled={subTotalAmountx === 0 && true}
            >
              <View
                style={[
                  styles.loginButton,
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 5,
                  },
                ]}
              >
                <Text style={styles.loginText}>PAY</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* <Loader animating={true} /> */}
      {/* <ToastAlert /> */}
      {/* </TouchableWithoutFeedback> */}

      <ToastAlert
        status={toastObject.status}
        message={toastObject.message}
        open={toastObject.open}
        type={toastObject.type}
        change={toastObject.change}
      />
      <Loader animating={loading1} color="#fff" size="small" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // paddingTop: 5,
    // justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    padding: 20,
  },
  txAInput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    // width: "90%",
    // marginHorizontal: 10,
    height: 100,
    textAlignVertical: "top",
    color: "#777",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    // width: "90%",
    // marginHorizontal: 10,
    textAlignVertical: "top",
    color: "#777",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#777",
    // maxHeight: 40,
    margin: 5,
    width: windowWidth - 10,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  pickerContainer2: {
    borderWidth: 1,
    borderColor: "#777",
    // maxHeight: 40,
    margin: 5,
    // width: windowWidth - 10,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 5,
    // flexDirection: "row",
    // justifycontent: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 5,
    width: windowWidth - 10,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: "90%",
    color: "#777",
  },
  loginButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F96D02",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  loginText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  inputText: {
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#333",
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
  modalView: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: "70%",
    minHeight: 200,
    maxHeight: 700,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  modalViewHF: {
    backgroundColor: "#fff",
    // marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: "90%",
    minHeight: 200,
    maxHeight: 900,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
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
// {
//   <View>
//       {people.map((item) => {
//         return (
//           <View key={item.key}>
//             <Text style={styles.item}>{item.name}</Text>
//           </View>
//         );
//       })}
//     </View>
// }
