import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

function Toast({ status, message, type, open, change, onPress }) {
  //   const screenHeight = Dimensions.get("screen").height;
  //   const screenWidth = Dimensions.get("screen").width;
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  //   const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowWidth * 1)).current;
  const popAnimH = useRef(new Animated.Value(windowHeight * 1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "You pressed the success button";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "You pressed the fail button";

  const [width, setWidth] = useState(200);
  const [dropdown, setDropdown] = React.useState(false);
  const animatedvalue = useRef(new Animated.Value(0)).current;
  //   const slidedown = () => {
  //     setDropdown(true);
  //     Animated.timing(animatedvalue, {
  //       toValue: 200,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start();
  //   };
  //   const slideup = () => {
  //     Animated.timing(animatedvalue, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start(() => setDropdown(false));
  //   };

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowWidth * 0.35 * 0,
      duration: 300,
      useNativeDriver: true,
    }).start(popOut());
    // }).start();
  };

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: windowWidth * 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      if (onPress) {
        onPress();
      }
    }, 10000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    if (onPress) {
      onPress();
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      popIn();
      setDropdown(open);
      //   slidedown();
      //   setTimeout(() => {
      //     slideup();
      //   }, 10000);
    }

    return () => {
      isMounted = false;
    };
  }, [change]);
  console.log(change);
  useEffect(() => {
    console.log("is it working now");
    popIn();
  }, [open]);

  return (
    <>
      {dropdown ? (
        <Animated.View
          style={{
            flex: 1,
            transform: [
              { translateX: popAnim, translateY: windowHeight * 0.3 * -1 },
            ],
          }}
        >
          <View style={styles.toastContainer}>
            <View style={styles.toastRow}>
              <AntDesign
                name={type === "success" ? "checkcircleo" : "closecircleo"}
                size={24}
                color={type === "success" ? successColor : failColor}
              />
              <View style={styles.toastText}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {status}
                </Text>
                <Text style={{ fontSize: 12 }}>{message}</Text>
              </View>
              <TouchableOpacity onPress={instantPopOut}>
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>
              {onPress && (
                <TouchableOpacity onPress={onPress}>
                  <Entypo name="arrow-long-right" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      ) : null}
    </>
  );
}

function Sweet({ status, message, color }) {
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
  toastContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: "auto",
    width: "auto",
    padding: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // height: screenHeight,
    // width: screenWidth,
  },
  toastRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  toastText: {
    width: "70%",
    padding: 2,
  },
});

export { Toast, Sweet };
