import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    Pressable,
    Image,
    ImageBackground,
    ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { Formik } from "formik";

import {
    query,
    where,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import Loader from "./Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import * as yup from "yup";

const projectId = Constants.expoConfig.extra.eas.projectId;

const LoginScreen = () => {
    let navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [loader, setLoader] = useState(false);
    const [Device_token, SetDevice_token] = useState("");

    useEffect(() => {
        const checkStoredCredentials = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                const storedPassword = await AsyncStorage.getItem('password');
                const storedEmail = await AsyncStorage.getItem('user_email');
                const storedName = await AsyncStorage.getItem('user_name');
                const storedId = await AsyncStorage.getItem('user_id');

                if (storedUsername && storedPassword) {
                    // console.log("this is a ", st)
                    await attemptSignIn(storedUsername, storedPassword);
                }
            } catch (error) {
                console.error('Error retrieving stored credentials:', error);
            }
        };

        checkStoredCredentials();
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const attemptSignIn = async (username, password) => {
        setLoader(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const user = userCredential.user;
            if (true) {
                console.log("User's email is verified");
                const usersRef = collection(firestore, "user");
                const q = query(usersRef, where("user_email", "==", username));
                const Data = { device_token: Device_token };
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (doc1) => {
                    const documentRef = doc(firestore, "user", doc1.id);
                    const userData = doc1.data(); // Get the user data
                    const userEmail = userData.user_email;
                    const userName = userData.user_name;
                    const role = userData.role || 'client';
                    const userId = userData.user_id;
                    console.log("This is a user data email", userEmail)
                    await updateDoc(documentRef, Data);
                    console.log("Document updated successfully.");

                    await AsyncStorage.multiSet([
                        ['username', username],
                        ['password', password],
                        ['user_email', userEmail],
                        ['user_name', userName],
                        ['user_id', userId],
                        ['role', role],
                    ]);
                    console.log('User details stored successfully');
                    setLoader(false);
                    if (role === 'seller') {
                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: "CompleteProfile"
                                }
                            ]
                        })
                    } else {
                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: "BuyerProjectlist"
                                }
                            ]
                        })
                    }
                });
            } else {
                console.log("User's email is not verified");
                alert("Please verify your email before signing in.");
                setLoader(false);
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            setLoader(false);
        }
    };

    const validationSchema = yup.object().shape({
        username: yup.string().email('Please enter a valid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    return (
        <ScrollView>
            <View style={{ flex: 1, height: Dimensions.get("window").height, backgroundColor: "#fff" }}>
                {loader ? (
                    <Loader />
                ) : (
                    <View style={{ width: 327, alignSelf: "center" }}>
                        <View style={{ height: 20 }} />
                        <Text style={{ fontSize: 32, fontWeight: "400", color: "#000000" }}>
                            Hello Save Time
                        </Text>
                        <View style={{ height: 5 }} />
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#9B9B9B" }}>
                            Login to continue
                        </Text>
                        <View style={{ height: 60 }} />

                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                attemptSignIn(values.username, values.password);
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <TextInput
                                        label="Email Address"
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        style={{ backgroundColor: "rgba(58, 58, 77, 0.1)" }}
                                        underlineColor="transparent"
                                        underlineColorAndroid="rgba(58, 58, 77, 0.1)"
                                        selectionColor="#E75E31"
                                        activeUnderlineColor="#E75E31"
                                        outlineColor="rgba(58, 58, 77, 0.1)"
                                        textColor="#000000"
                                    />
                                    {errors.username && touched.username && (
                                        <Text style={{ color: 'red' }}>{errors.username}</Text>
                                    )}
                                    <View style={{ height: 15 }} />
                                    <TextInput
                                        label="Password"
                                        value={values.password}
                                        secureTextEntry={!showPassword}
                                        // right={
                                        //     <TextInput.Icon
                                        //         icon={({ size, color }) => <View></View>}
                                        //         onPress={togglePasswordVisibility}
                                        //     />
                                        // }
                                        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={togglePasswordVisibility} />}

                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        style={{ backgroundColor: "rgba(58, 58, 77, 0.1)" }}
                                        underlineColor="transparent"
                                        underlineColorAndroid="rgba(58, 58, 77, 0.3)"
                                        selectionColor="#E75E31"
                                        activeUnderlineColor="#E75E31"
                                        outlineColor="rgba(58, 58, 77, 0.3)"
                                        textColor="#000000"
                                    />
                                    {errors.password && touched.password && (
                                        <Text style={{ color: 'red' }}>{errors.password}</Text>
                                    )}
                                    <View style={{ height: 10 }} />
                                    <View style={{ height: 100 }} />
                                    <Pressable style={{ width: 327 }} onPress={handleSubmit}>
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
                                </View>
                            )}
                        </Formik>

                        <View style={{ height: 20 }} />
                        <Pressable
                            onPress={() => {
                                navigation.navigate("Join");
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
                )}
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
