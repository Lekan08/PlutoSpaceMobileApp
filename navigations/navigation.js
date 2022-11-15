import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Registration from "../screens/registration";
import Login from "../screens/login";
import ForgotPassword from "../screens/forgotPassword";
// import Home from "../screens/home";
import BottomTabs from "./bottomNavigation";
import Home from "../screens/home";
import Welcome from "../screens/welcome";
import Checkout from "../screens/checkout";
import Dashboard from "../screens/dashboard";
import kpurkish from "../screens/kpurkish";
import Profile from "../screens/profile";
import EditProfile from "../screens/editprofile";
import { ColorSpace } from "react-native-reanimated";
import Appintro from "../screens/Appintro";
import Dashboard2 from "../screens/dashboard2";
import ChangePassword from "../screens/changePassword";
import Cart from "../screens/cart";
import ProductDetails from "../screens/productDetails";

const Stack = createStackNavigator();

function NavigationStack() {
  return (
    <NavigationContainer theme={{ colors: { background: "#0f0f0f" } }}>
      <Stack.Navigator
        initialRouteName="Appintro"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { height: 0 },
        }}
      >
        {/* <Stack.Screen
          name="Dashboard2"
          component={Dashboard2}
          options={{ title: "Dashboard2" }}
        /> */}
        <Stack.Screen
          name="Appintro"
          component={Appintro}
          options={{ title: "Appintro" }}
        />
        {/*       
      <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile" }}
        /> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            headerTintColor: "white",
            title: "Login",
            //   headerStyle: { backgroundColor: "tomato" },
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: "Welcome",
            headerTintColor: "white",
            //   headerStyle: { backgroundColor: "tomato" },
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            title: "Create An Account",
            //   headerStyle: { backgroundColor: "tomato" },
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: "Forgot Password" }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={{
            title: "Home",
            headerShown: false,
            //   headerStyle: { backgroundColor: "tomato" },
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ title: "Checkout" }}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{ title: "Change your password" }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: "Edit Your Profile" }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            title: "Cart",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#F96D02", height: 80 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default NavigationStack;
