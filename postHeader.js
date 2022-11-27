import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function PHeaders() {
  // const [GenToken, setGenToken] = useState(
  //   Object.values(AsyncStorage.getItem("rexxdex1"))[2]
  // );

  async function fetchData() {
    // getting data
    try {
      const [GenToken, setGenToken] = useState("");
      let GeneToken;
      let apiToken;

      GeneToken = await AsyncStorage.getItem("rexxdex1");
      apiToken = await AsyncStorage.getItem("rexxdex");
      setGenToken(GeneToken);
      console.log(Object.values(AsyncStorage.getItem("rexxdex1")));
      console.log(Object.keys(AsyncStorage.getItem("rexxdex1")));
      console.log(AsyncStorage.getItem("rexxdex1"));
      console.log(`Geen: ${GeneToken}`);
      console.log(`Apii: ${apiToken}`);

      if (apiToken !== "null" && apiToken !== null) {
        const storeUser = async (value) => {
          try {
            await AsyncStorage.setItem("rexxdex1", apiToken);
            setGenToken(apiToken);
          } catch (error) {
            console.log(error);
          }
        };
        storeUser();
      }
      console.log(
        "tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt"
      );
      return {
        allPHeaders: {
          "Content-Type": "application/json",
          "Token-1": GenToken,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  const headerObj = fetchData();
  console.log(
    "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
  );
  console.log(headerObj);
  // console.log(`ttestig: ${GenToken}`);
  return headerObj;
}
export default PHeaders;
