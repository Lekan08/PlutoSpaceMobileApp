// import React from "react";
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import {
//   View,
//   Text,
//   Image,
//   ImageBackground,
//   TextInput,
//   StyleSheet,
//   Button,
// } from "react-native";

// export default class Home extends React.Component {
//   render() {
//     const clickHandler = () => {};
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <View
//             style={{
//               flexDirection: "row",
//               marginTop: 40,
//               alignItems: "center",
//               paddingHorizontal: 40,
//             }}
//           >
//             <Icon name="menu" size={30} color="#a2a2db" style={{ width: 20 }} />
//             <Icon
//               name="account-circle"
//               size={33}
//               color="#a2a2db"
//               style={{ marginLeft: 230 }}
//             />
//           </View>

//           <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
//             <Text
//               style={{
//                 fontSize: 50,
//                 color: "#F96D02",
//                 // fontFamily: "RobotoBold",
//               }}
//             >
//               DASHBOARD
//             </Text>

//             <Text
//               style={{
//                 fontSize: 15,
//                 paddingVertical: 10,
//                 paddingRight: 80,
//                 lineHeight: 22,
//                 // fontFamily: "RobotoRegular",
//                 color: "#F96D02",
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetuer adipscing elit.
//             </Text>

//             <View
//               style={{
//                 flexDirection: "row",
//                 backgroundColor: "#FFF",
//                 borderRadius: 40,
//                 alignItems: "center",
//                 paddingVertical: 10,
//                 paddingHorizontal: 20,
//                 marginTop: 30,
//               }}
//             >
//               <Image
//                 source={require("../images/search.png")}
//                 style={{ height: 14, width: 14 }}
//               />
//               <TextInput
//                 placeholder="Lorem ipsum"
//                 style={{
//                   paddingHorizontal: 20,
//                   fontSize: 15,
//                   color: "#ccccef",
//                 }}
//               />
//             </View>

//             <Text
//               style={{
//                 color: "#F96D02",
//                 // fontFamily: "RobotoRegular",
//                 marginTop: 50,
//                 fontSize: 17,
//               }}
//             >
//               Cosmetics
//             </Text>

//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={{ marginHorizontal: -40, marginTop: 30 }}
//             >
//               <View
//                 style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                 }}
//               >
//                 <Image
//                   source={require("../images/cart.jpeg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//                   <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>

//               <View
//                 style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                   marginHorizontal: 20,
//                 }}
//               >
//                 <Image
//                   source={require("../images/cart.jpeg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//                       <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>

//               <View
//                style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                   marginHorizontal: 20,
//                 }}
//               >
//                 <Image
//                   source={require("../images/cart.jpeg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//                        <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>

//               <View
//                 style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                 }}
//               >
//                 <Image
//                   source={require("../images/cart.jpeg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//                     <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>

//               <View style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                   marginHorizontal: 20,
//                 }}
//               >
//                 <Image
//                   source={require("../images/cart.jpeg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >

//                     <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>
//             </ScrollView>
//           </View>

//           <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
//             {/* <Text
//               style={{
//                 fontSize: 50,
//                 // fontWeight: 40,
//                 color: "#F96D02",
//                 // fontFamily: "RobotoBold",
//               }}
//             >
//                CLOTHES  DASHBOARD
//             </Text> */}

//             <Text
//               style={{
//                 color: "#F96D02",
//                 // fontFamily: "RobotoRegular",
//                 marginTop: 50,
//                 fontSize: 17,
//               }}
//             >
//               Clothes
//             </Text>

//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={{ marginHorizontal: -40, marginTop: 30 }}
//             >
//               <View
//                 style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                 }}
//               >
//                 <Image
//                   source={require("../images/cart.jpeg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//              <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>

//               <View
//                 style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                   marginHorizontal: 20,
//                 }}
//               >
//                 <Image
//                   source={require("../images/2.jpg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//                  <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>

//               <View
//                 style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                 }}
//               >
//                 <Image
//                   source={require("../images/3.jpg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//                    <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>

//               <View style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                   marginHorizontal: 20,
//                 }}
//               >
//                 <Image
//                   source={require("../images/3.jpg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//                     <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>

//               <View
//                 style={{
//                   backgroundColor: "#FEFEFE",
//                   height: 200,
//                   width: 190,
//                   borderRadius: 15,
//                   padding: 5,
//                 }}
//               >
//                 <Image
//                   source={require("../images/3.jpg")}
//                   style={{ width: 180, borderRadius: 10, height: 130 }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: 150,
//                     alignItems: "center",
//                   }}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: 5,
//                       paddingVertical: 5,
//                     }}
//                   >
//                     {/* <Text
//                     style={{
//                       fontFamily: "RobotoRegular",
//                       fontSize: 11,
//                       color: "#F96D02",
//                     }}
//                   >
//                     Lorem impsum dolor sit amet, consectetuer adipscing elit,
//                   </Text> */}

//                     <TouchableOpacity onPress={clickHandler}>
//                       <View style={styles.loginButton}>
//                         <Text style={styles.loginText}>Add To Cart</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <Icon name="cart-outline" size={25} color="#bb32fe" />
//                 </View>
//               </View>
//             </ScrollView>
//           </View>
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   backgroundColor: "#0F0F0F",
//   // },
//   // content: {
//   //   padding: 40,
//   // },
//   // list: { marginTop: 20 },
//   container: {
//     // flex: 1,
//     // backgroundColor: "#0F0F0F",
//     alignItems: "center",
//     // paddingTop: 60,
//     justifyContent: "center",
//   },
//   buttonContainer: {
//     marginTop: 20,
//     padding: 20,
//   },

//   loginButton: {
//     padding: 10,
//     marginTop: 10,
//     backgroundColor: "#F96D02",
//     marginHorizontal: 10,
//     borderRadius: 50,
//   },
//   item: {
//     padding: 30,
//     marginTop: 24,
//     backgroundColor: "#F96D02",
//     fontSize: 24,
//     marginHorizontal: 10,
//   },
//   link: {
//     marginTop: 10,
//     color: "#F96D02",
//   },
// });
