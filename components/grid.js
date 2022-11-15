import { View } from "react-native";

// Styles
const styles = {
    app: {
      flex: 4, // the number of columns you want to devide the screen into
      marginHorizontal: "auto",
      width: "100%",
    },
    row: {
      flexDirection: "row",
      marginVertical: 5
    },
    "1col":  {
      padding: 5,
      margin:5,
      flex:  1
    },
    "2col":  {
        padding: 5,
        margin:5,
      flex:  2
    },
    "3col":  {
        padding: 5,
        margin:5,
      flex:  3
    },
    "4col":  {
        padding: 5,
        margin:5,
      flex:  4
    }
  };

   // RN Code
   const Con = ({ children }) => {
    return  (
      <View style={styles.app}>{children}</View>
    )
  }
  
  // RN Code
  const Col = ({ numRows, children }) => {
    return  (
      <View style={styles[`${numRows}col`]}>{children}</View>
    )
  }
  
  const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
  )
 
  export {Con, Col, Row};