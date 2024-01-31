/** @format */
import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
// import ax
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image, ImageBackground, ScrollView
} from "react-native";
import { TextInput } from "react-native-paper";

import {
  NotificationPermissionsStatus,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
} from "expo-notifications";
import FormInput from "../Components/FormInput";
import LoginBtn from "../Components/Loginbtn";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  query,
  where,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  changeemail,
  changeuserid,
  changeuserusername,
} from "../Redux/counterSlice";
import { useDispatch } from "react-redux";
const projectId = Constants.expoConfig.extra.eas.projectId;
const LoginScreen = ({ navigation }) => {
  let dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [username, setuserName] = React.useState();
  const [password, setPassword] = React.useState();
  const [loader, setloader] = useState(false);
  const [Device_token, SetDevice_token] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((val) => {
      SetDevice_token(val);
    });
  }, []);
  const Signin = () => {
    setloader(true);
    const usersRef = collection(firestore, "user");
    const q = query(usersRef, where("user_email", "==", username));
    console.log("Errj");
    const Data = {
      device_token: Device_token,
    };
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        console.log("Singined");
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc1) => {
              console.log("Document ID:", doc1.id);
              const documentRef = doc(firestore, "user", doc1.id);
              // console.log();
              dispatch(changeuserusername(doc1.data()["user_name"]));
              dispatch(changeemail(username));
              dispatch(changeuserid(doc1.id));
              // console.log('Document data:', doc.data());
              updateDoc(documentRef, Data)
                .then(() => {
                  console.log("Document updated successfully.");
                  setloader(false);
                  navigation.replace("Tab");
                })
                .catch((error) => {
                  console.error("Error updating document:", error);
                  setloader(false);
                });
            });
          })
          .catch((err) => {
            console.log(err);
            setloader(false);
          });
      })
      .catch((err) => {
        setloader(false);

        console.log(err);
      });
  };

  return (
   
    <ScrollView>
      <View
        style={{
          height: Dimensions.get("window").height,
          backgroundColor: "#ffffff",
        }}
      >
        <View
          style={{
            width: 327,
            alignSelf: "center",
          }}
        >
          <View style={{ height: 20 }} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              height: 40,
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("CreateAccount");
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  borderRadius: 12,
                  backgroundColor: "#E75E31",
                }}
              >
                <Image
                  source={require("../assets/Cross.png")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
            </Pressable>
          </View>
          <View style={{ height: 20 }} />
          <Text
            style={{
              fontSize: 32,
              fontWeight: "400",
              color: "#000000",
            }}
          >
            Hello Mate
          </Text>
          <View style={{ height: 5 }} />

          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#9B9B9B",
            }}
          >
            Login to continue
          </Text>

          <View style={{ height: 60 }} />

          <TextInput
            label="Email Address"
            value={username}
            onChangeText={(Email) => setuserName(Email)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
          />
          <View style={{ height: 15 }} />
          <TextInput
            label="Password"
            value={password}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={({ size, color }) => (
                  // <Entypo
                  //   name={showPassword ? 'eye-with-line' : 'eye'}
                  //   size={size}
                  //   color={color}
                  // />
                  <View></View>
                )}
                onPress={togglePasswordVisibility}
              />
            }
            // right={<TextInput.Icon icon="eye" />}
            onChangeText={(Password) => setPassword(Password)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
              // borderWidth: 1,

              // borderColor: 'rgba(58, 58, 77, 0.3)',
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.3)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.3)"
            textColor="#000000"
            underlineStyle={{
              borderColor: "#fff",
            }}
          />
          <View style={{ height: 10 }} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
          
          </View>
          <View style={{ height: 100 }} />
          <Pressable
            style={{
              width: 327,
            }}
            onPress={() => {
            Signin()
            // navigation.navigate("Tab")
            }}
          >
            <ImageBackground
              source={require("../assets/btn.png")}
              style={{
                width: "100%",
                height: 56,

                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Sign In
              </Text>
            </ImageBackground>
          </Pressable>

          <View style={{ height: 20 }} />
          <Pressable
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#9B9B9B",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Don’t have an Account?
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#E75E31",
                  fontWeight: "600",
                  textAlign: "center",
                  marginLeft: 5,
                }}
              >
                Sign Up
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
