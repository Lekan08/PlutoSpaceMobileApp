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
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [nameCircleColor, setNameCircleColor] = useState("#F96D02");

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
          setCountry(`${userData.otherDetailsDTO.personal.residentialCountry}`);
          setState(`${userData.otherDetailsDTO.personal.residentialState}`);
          setCity(`${userData.otherDetailsDTO.personal.residentialCity}`);
          setAddress(`${userData.otherDetailsDTO.personal.residentialStreet}`);
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
            <Icon name="account-plus" size={28} color="#ffff" />
          </View>
          <Text style={{ color: "#454545", fontWeight: "800" }}>
            Create Client
          </Text>
          <MaterialIcons
            onPress={() => navigation.navigate("Individual")}
            name="navigate-next"
            size={30}
            color="black"
            style={{ marginHorizontal: 140 }}
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
            See All Client
          </Text>
          <MaterialIcons
            onPress={() => navigation.navigate("seeAllindividuals")}
            name="navigate-next"
            size={30}
            color="black"
            style={{ marginHorizontal: 138 }}
          />
        </View>
      </View>
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
