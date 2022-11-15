import React, { useState } from "react";
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
import { ScrollView } from "react-native-gesture-handler";
import { Con, Col, Row } from "../components/grid";
import { color } from "react-native-reanimated";

export default function Checkout({ navigation }) {


  
  return (
    <View style={globalStyles.dashContainer}>
      <View
        style={{
          backgroundColor: "#F96D02",
          height: "30%",
          maxHeight: "50%",
          //   borderBottomRightRadius:30,
          //   borderBottomLeftRadius:30,
        }}
      >
          <View>
          <Text
            style={{
              fontSize: 20,
              marginTop: 30,
              marginLeft: 20,
              color: "#ffff",
            }}
          >
            SubToal
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
      </View>
      <View
        style={{
          backgroundColor: "#D8D9CF",
          height: "100%",
          maxHeight: "90%",
        }}
      >
      <ScrollView>
        <View
          style={{
            backgroundColor: "#F5EDDC",
            height: "30%",
            maxHeight: "50%",
            width: "80%",
            marginTop: 30,
            margin: 40,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "left",
              padding: 10,
            }}
          >
         Gucci Jacket
          </Text>
          <Image
            source={require("../images/Gucci.jpeg")}
            style={{
              width: 80,
              height: 80,
              alignSelf: "flex-start",
              margin: 1,
              marginLeft: 20,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "300",
              alignSelf: "flex-end",
              marginRight: 10,
            }}
          >
            ₦17,000.00
          </Text>
        </View>
        
        <View
          style={{
            backgroundColor: "#F5EDDC",
            height: "30%",
            maxHeight: "50%",
            width: "80%",
            marginTop: 30,
            margin: 40,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "left",
              padding: 10,
            }}
          >
         Gucci Jacket
          </Text>
          <Image
            source={require("../images/Gucci.jpeg")}
            style={{
              width: 80,
              height: 80,
              alignSelf: "flex-start",
              margin: 1,
              marginLeft: 20,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "300",
              alignSelf: "flex-end",
              marginRight: 10,
            }}
          >
            ₦17,000.00
          </Text>
        </View>
                
        <View
          style={{
            backgroundColor: "#F5EDDC",
            height: "30%",
            maxHeight: "50%",
            width: "80%",
            marginTop: 30,
            margin: 40,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "left",
              padding: 10,
            }}
          >
         Gucci Jacket
          </Text>
          <Image
            source={require("../images/Gucci.jpeg")}
            style={{
              width: 80,
              height: 80,
              alignSelf: "flex-start",
              margin: 1,
              marginLeft: 20,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "300",
              alignSelf: "flex-end",
              marginRight: 10,
            }}
          >
            ₦17,000.00
          </Text>
        </View>
        </ScrollView>
   
        <TouchableOpacity>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>Checkout</Text>
          </View>
        </TouchableOpacity>
       
      </View>
    </View>
  );
}

// <View style={{alignItems: 'flex-end',flexDirection: 'row', justifyContent: 'flex-end'}}>
//
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40,
    backgroundColor: "#ffff",
  },
  loginText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffff",
  },
  loginButton: {
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 40,
    backgroundColor: "#3CCF4E",
    height: "30%",
    width: "80%",
    borderRadius: 20,
  },
});
