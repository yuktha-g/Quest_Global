import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";

import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const logo = require("../assets/road_logo-removebgf.png");
const google = require("../assets/google.png");
const twitter = require("../assets/twitter.png");
const instagram = require("../assets/instagram.png");

export default function SignupForm({ navigation }) {
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      ToastAndroid.show("You are successfully registered", ToastAndroid.SHORT);
      console.log("You are successfully registered");
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      console.log("Something went wrong" + error);
    }
  }

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        ToastAndroid.show("You are successfully logged in", ToastAndroid.SHORT);
        console.log("You are successfully logged in");
        navigation.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        });
      } else {
        ToastAndroid.show("Something went wrong" + user, ToastAndroid.LONG);
        console.log("Something went wrong" + user);
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      console.log("Something went wrong" + error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Sign-up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{ true: "green", false: "gray" }}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Text style={styles.optionsText}>OR SIGN-UP WITH</Text>
      </View>

      <View style={styles.mediaIcons}>
        <TouchableOpacity>
          <Image source={google} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={twitter} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={instagram} style={styles.icons} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          setEmail("");
          setPassword("");
          navigation.navigate("LoginScreen");
        }}
      >
        <Text style={styles.footerText}>
          Have an Account?
          <Text style={styles.signup}> Login</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 50,
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "#cb513c",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#cb513c",
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "#cb513c",
  },
  button: {
    backgroundColor: "#cb513c",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    marginTop: 30,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "#cb513c",
    fontSize: 13,
  },
});
