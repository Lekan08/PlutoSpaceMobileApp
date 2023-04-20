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
import Initial from "../screens/initial";
import Individual from "../screens/individual";
import seeAllindividuals from "../screens/seeAllindividuals";
import sales from "../screens/sales";
import editprofile from "../screens/editprofile";
const Stack = createStackNavigator();

function NavigationStack() {
  return (
    <NavigationContainer theme={{ colors: { background: "#0f0f0f" } }}>
      <Stack.Navigator
        initialRouteName="initial"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { height: 0 },
        }}
      >
        <Stack.Screen
          name="initial"
          component={Initial}
          options={{ title: "Initial" }}
        />
        <Stack.Screen
          name="seeAllindividuals"
          component={seeAllindividuals}
          options={{
            title: "All Individuals ",
            headerTitleAlign: "center",
            headerTintColor: "#ffff",
            headerStyle: { backgroundColor: "#F96D02", height: 70 },
          }}
        />
        {/* <Stack.Screen
          name="editprofile"
          component={editprofile}
          options={{
            headerShown: false,
            title: "Make a trip",
            headerTintColor: "#ffff",
            headerBackVisible: false,`
            // headerStyle: { backgroundColor: "#FFFFFF", height: 80 },
          }}
        /> */}
        {/* <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile" }}
        /> */}
        <Stack.Screen
          name="Individual"
          component={Individual}
          options={{
            title: "Create Idividual  Client",
            headerTitleAlign: "center",
            headerTintColor: "#ffff",
            headerStyle: { backgroundColor: "#F96D02", height: 70 },
          }}
        />
        <Stack.Screen
          name="sales"
          component={sales}
          options={{ title: "sales" }}
        />
        <Stack.Screen
          name="Appintro"
          component={Appintro}
          options={{ title: "Appintro" }}
        />
        {/* <Stack.Screen
          name="Dashboard2"
          component={Dashboard2}
          options={{ title: "Dashboard2" }}
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
          options={{
            title: "Change Your Password",
            headerTitleAlign: "center",
            headerTintColor: "#ffff",
            headerStyle: { backgroundColor: "#F96D02", height: 80 },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: " Edit Profile",
            headerTitleAlign: "center",
            headerTintColor: "#ffff",
            headerStyle: { backgroundColor: "#F96D02", height: 80 },
          }}
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
