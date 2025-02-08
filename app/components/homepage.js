import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const logo = require("../assets/road_logo-removebgf.png");
const gallery = require("../assets/imageUpload.png");
const camera = require("../assets/camera.png");

const BACKEND_URL=null //! add backend url

const Homepage = ({ navigation }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
      exif: true,
    }).catch((error) => {
      console.log(error);
    });

    console.log(Object.keys(result.assets[0]));
    console.log(result.assets[0].exif);

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      sendImageToBackend(result.assets[0].base64);
    }
  };
  const launchCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      exif: true,
    }).catch((error) => {
      console.log(error);
    });

    console.log(Object.keys(result.assets[0]));
    console.log(result.assets[0].exif);
    // console.log(Object.keys(result.assets));

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      // sendImageToBackend(result.assets[0].base64);
      sendImageToBackend(result.assets[0].base64);
    }
  };

  const sendImageToBackend = async (base64) => {
    console.log("sending image to backend..");
    ToastAndroid.show("sending image to backend..", ToastAndroid.SHORT);

    if(BACKEND_URL==null)return;
    
    const resp = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64, latitude:"",longitude:"" }), //!giving random values for now...
    }).catch((error) => {
      console.log("Error occured while sending image to backend", error);
      ToastAndroid.show("Invalid url:" + error, ToastAndroid.SHORT);
    });

    if (resp){

      ToastAndroid.show("image sent successfully", ToastAndroid.SHORT);
      console.log("image sent successfully")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.title}>Report Damaged Roads</Text>
      </View>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.imageUpload}
          onPress={() => {
            pickImage();
          }}
        >
          <Image
            source={gallery}
            style={styles.image}
            resizeMode="center"
          ></Image>
          <Text style={styles.uploadTitle}>Choose Image from mobile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.imageUpload}
          onPress={() => {
            launchCamera();
          }}
        >
          <Image
            source={camera}
            style={styles.cameraImage}
            resizeMode="center"
          ></Image>
          <Text style={styles.cameraUploadTitle}>Use Camera instead</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    height: 200,
    width: 200,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  box: {
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    width: 340,
    height: 270,
    borderWidth: 1,
    borderColor: "#cb513c",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  imageUpload: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    height: 200,
    width: 200,
  },
  uploadTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 10,
  },
  cameraImage: {
    marginTop: 10,
    marginLeft: 10,
    height: 180,
  },
  width: 180,
  cameraUploadTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 28,
  },
});

export default Homepage;
