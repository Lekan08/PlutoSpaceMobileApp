import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import AnimatedLoader from "react-native-animated-loader";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

function Loader({ animating }) {
  // const [visible, setVisible] = useState(true);
  // useEffect(() => {
  //   setInterval(() => {
  //     setVisible(!visible);
  //   }, 2000);
  // }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const popAnim = useRef(new Animated.Value(windowWidth * 1)).current;
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: "#333",
    //     opacity: 0.5,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: screenHeight,
    //     width: screenWidth,
    //     position: "absolute",
    //   }}
    // >
    //   <ActivityIndicator size="large" color="#F96D02" animating={animating} />
    // </View>
    <AnimatedLoader
      visible={animating}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}
      source={require("./assets/LOADER1.json")}
      s
    />
  );
}

function InnerLoader({ animating, color, size }) {
  return (
    <View>
      {animating && (
        <ActivityIndicator
          style={{ marginLeft: 5 }}
          size={size}
          color={color}
          animating={animating}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight,
    width: screenWidth,
    position: "absolute",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export { Loader, InnerLoader };
