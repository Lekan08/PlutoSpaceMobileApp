import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import { horizontalScale, moderateScale, verticalScale } from "../../Metrics";
const slides = [
  {
    key: "one",
    title: "JUST TRAVEL",
    text: "The best things is to look natural, but it takes make-up to look natural.",
    image: require("../images/appslider1.png"),
  },
  {
    key: "two",
    title: "TAKE A BREAK",
    text: "Joy is the best make-up. But a little lipstick is a close runner-up",
    image: require("../images/perfume.jpeg"),
  },
  {
    key: "three",
    title: "ENJOY YOUR JOURNEY",
    text: "Beauty, to me , is about being comfortable in your own skin. That, a kik-ass red lipsick.",
    image: require("../images/makeup.jpeg"),
  },
];

export default function Appintro({ navigation }) {
  const [showHomePage, setshowHomePage] = useState(false);
  const _renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Image
          source={item.image}
          style={{
            resizeMode: "cover",
            height: "70%",
            width: "100%",
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
          }}
        />
        <Text
          style={{
            paddingTop: 25,
            paddingBottom: 10,
            fontSize: moderateScale(23),
            fontWeight: "bold",
            color: "#F96D02",
            alignSelf: "center",
          }}
        >
          {item.title}
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: "#0f0f0f",
            fontSize: moderateScale(16),
            paddingHorizontal: 30,
          }}
        >
          {item.text}
        </Text>
        {/* {item.key === "three" && (
          <TouchableOpacity
            style={{ width: 300, paddingTop: 10 }}
            onPress={() => navigation.navigate("Login")}
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>LOGIN</Text>
            </View>
          </TouchableOpacity>
        )} */}
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialIcons name="done" size={24} color="black" />
      </View>
    );
  };
  const _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialIcons name="navigate-before" size={24} color="black" />
      </View>
    );
  };
  const _renderSkipButton = () => {
    return (
      <View>
        <Text
          style={{
            color: "#777",
            fontWeight: "700",
            fontSize: moderateScale(20),
            letterSpacing: 1,
          }}
        >
          skip
        </Text>
      </View>
    );
  };

  if (showHomePage) {
    return <App />;
  } else
    return (
      <AppIntroSlider
        onDone={() => navigation.navigate("Login")}
        renderItem={_renderItem}
        data={slides}
        doneLabel="Continue"
        skipLabel="Skip"
        renderPrevButton={_renderPrevButton}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        showSkipButton={true}
        showPrevButton={true}
        dotStyle={{
          backgroundColor: "#0f0f0f",
        }}
        activeDotStyle={{
          backgroundColor: "#F96D02",
          width: 30,
        }}
      />
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  loginButton: {
    padding: 15,
    marginTop: verticalScale(30),
    marginLeft: 45,
    backgroundColor: "#F96D02",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: moderateScale(15),
  },
  loginText: {
    textAlign: "center",
    color: "#fff",
  },
  buttonCircle: {
    width: horizontalScale(40),
    height: verticalScale(40),
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  textSquare: {
    width: horizontalScale(40),
    height: verticalScale(40),
    backgroundColor: "#f96d02",
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
});
