import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";

import LoginScreen from "./components/loginPageNice";
import SignUpScreen from "./components/signUpPageNice";
import HomePage from "./components/homepage";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import LottieView from "lottie-react-native";

const Stack = createStackNavigator();

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  }, []);

  useEffect(() => {
    console.log(`USER: ${user}`);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  //! remove this
  // return <HomePage />;

  if (animation)
    return (
      <View style={styles.container}>
        <LottieView
          source={
            "https://lottie.host/7bc5020a-bad9-49a9-94ba-3655c24df2fd/x55inqPfru.json"
          }
          autoPlay
          loop
        />
      </View>
    );
  // if (user) return <HomePage />;
  // else
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "PaveDefender" }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: "PaveDefender" }}
          // initialParams={{ isLoggedIn, user }}
        />
        {/* </Stack.Navigator> */}
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: "PaveDefender" }}
        />
        {/* <Stack.Navigator> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
