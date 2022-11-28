import { useState, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// try tomorrow use the .then method u thought of

function GHeaders() {
  AsyncStorage.getItem("rexxdex1").then((rexxdex1) => {
    AsyncStorage.getItem("rexxdex").then((rexxdex) => {
      console.log("first Render");
      console.log("second Render");
      console.log(rexxdex);
      console.log(rexxdex1);
      // getting data

      let GeneToken;
      let apiToken;

      GeneToken = rexxdex1;
      apiToken = rexxdex;
      if (apiToken !== "null" && apiToken !== null) {
        const storeUser = async () => {
          try {
            await AsyncStorage.setItem("rexxdex1", apiToken);
          } catch (error) {
            console.log(error);
          }
        };
        storeUser();
      }
      const allGHeaders = {
        "Content-Type": "application/json",
        "Token-1": GeneToken,
      };
      // console.log(`ttestig: ${GenToken}`);
      return allGHeaders;
    });
  });
  const allGHeaders = {
    "Content-Type": "application/json",
    "Token-1": AsyncStorage.getItem("rexxdex1").then((rexxdex1) => {
      return rexxdex1;
    }),
  };
  // console.log(`ttestig: ${GenToken}`);
  return allGHeaders;
}

export { GHeaders };
