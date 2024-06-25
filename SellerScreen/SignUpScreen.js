/** @format */
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as Random from "expo-random";
import Entypo from "react-native-vector-icons/Entypo";
import Loader from "./Loader"; // Ensure this is the correct path to your Loader component
import { auth, firestore } from "../firebase/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  let navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const collectionRef = collection(firestore, "user");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const doc_id = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  };

  const CreateUser = () => {
    const newUUID = doc_id();
    const UserDocumentRef = doc(collectionRef, newUUID);
    setLoader(true);

    const newUser = {
      user_id: newUUID,
      user_name: username,
      user_email: email,
      user_phone: phone,
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Send email verification
        sendEmailVerification(userCredential.user)
          .then(() => {
            // Save user to Firestore
            setDoc(UserDocumentRef, newUser)
              .then((docRef) => {
                setLoader(false);
                alert('Verification email sent. Please check your inbox.');
                navigation.navigate("Join");
              })
              .catch((error) => {
                alert("Error adding document:", error);
                setLoader(false);
              });
          })
          .catch((error) => {
            alert("Error sending email verification:", error);
            setLoader(false);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        setLoader(false);

        if (errorCode === "auth/weak-password") {
          alert("Password should be at least 6 characters");
        } else if (errorCode === "auth/email-already-in-use") {
          alert("Please use another email, this email is already in use");
        }
      });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, height: Dimensions.get("window").height, backgroundColor: "#fff" }}>
        {loader ? (
          <Loader />
        ) : (
          <View style={{ width: 327, alignSelf: "center" }}>
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
              <Pressable>
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
                    style={{ width: 24, height: 24 }}
                  />
                </View>
              </Pressable>
            </View>
            <View style={{ height: 20 }} />
            <Text style={{ fontSize: 32, fontWeight: "400", color: "#000000" }}>
              Create Account
            </Text>
            <View style={{ height: 5 }} />
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#9B9B9B" }}>
              Create account with Email
            </Text>
            <View style={{ height: 60 }} />
            <TextInput
              label="Full Name"
              value={username}
              onChangeText={setUsername}
              style={{ backgroundColor: "rgba(58, 58, 77, 0.1)" }}
              underlineColor="transparent"
              selectionColor="#E75E31"
              activeUnderlineColor="#E75E31"
              outlineColor="rgba(58, 58, 77, 0.3)"
              textColor="#000000"
            />
            <View style={{ height: 15 }} />
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              style={{ backgroundColor: "rgba(58, 58, 77, 0.1)" }}
              underlineColor="transparent"
              selectionColor="#E75E31"
              activeUnderlineColor="#E75E31"
              outlineColor="rgba(58, 58, 77, 0.3)"
              textColor="#000000"
            />
            <View style={{ height: 15 }} />
            <TextInput
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              style={{ backgroundColor: "rgba(58, 58, 77, 0.1)" }}
              underlineColor="transparent"
              selectionColor="#E75E31"
              activeUnderlineColor="#E75E31"
              outlineColor="rgba(58, 58, 77, 0.3)"
              textColor="#000000"
              keyboardType="numeric"
            />
            <View style={{ height: 15 }} />
            <TextInput
              label="Password"
              value={password}
              secureTextEntry={!showPassword}
              right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={togglePasswordVisibility} />}
              onChangeText={setPassword}
              style={{ backgroundColor: "rgba(58, 58, 77, 0.1)" }}
              underlineColor="transparent"
              selectionColor="#E75E31"
              activeUnderlineColor="#E75E31"
              outlineColor="rgba(58, 58, 77, 0.3)"
              textColor="#000000"
            />
            <View style={{ height: 100 }} />
            <Pressable style={{ width: 327 }} onPress={CreateUser}>
              <ImageBackground
                source={require("../assets/btn.png")}
                style={{ width: "100%", height: 56, justifyContent: "center", alignItems: "center", alignSelf: "center" }}
              >
                <Text style={{ fontSize: 14, color: "#fff", fontWeight: "500", textAlign: "center" }}>
                  Sign Up
                </Text>
              </ImageBackground>
            </Pressable>
            <View style={{ height: 20 }} />
            <Pressable onPress={() => navigation.navigate("LoginScreen")}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 14, color: "#9B9B9B", fontWeight: "600", textAlign: "center" }}>
                  Have an Account?
                </Text>
                <Text style={{ fontSize: 14, color: "#E75E31", fontWeight: "600", textAlign: "center", marginLeft: 5 }}>
                  Sign In
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
