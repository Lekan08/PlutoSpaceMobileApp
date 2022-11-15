import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

function Loader({ animating }) {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#F96D02" animating={animating} />
    </View>
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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight,
    width: screenWidth,
    position: "absolute",
  },
});

export { Loader, InnerLoader };
