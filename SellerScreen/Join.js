import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import FormInput from "../Components/FormInput";
import LoginBtn from "../Components/Loginbtn";
import Entypo from "react-native-vector-icons/Entypo";

export default function Join({ navigation }) {
  const [indexofData, setindexofData] = useState(0);
  const [buttonText, setButtonText] = useState("Join as a Client");

  const DATA = [
    {
      id: "1",
      text: "I’m a client, hiring for a project",
    },
    {
      id: "2",
      text: "I’m a Freelancer, looking for work",
    },
  ];

  const handleOptionSelect = (index, text) => {
    setindexofData(index);
    setButtonText(index === 0 ? "Join as a Client" : "Apply as a Freelancer");
    console.log(text);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 20,
        }}
      >
        <Image
          source={require("../assets/Logo.png")}
          style={{
            width: 113,
            height: 113,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontSize: 22,
            color: "#1E232C",
            alignSelf: "center",
          }}
        >
          Join as a client or freelancer
        </Text>
        <View
          style={{
            height: 30,
          }}
        />
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleOptionSelect(index, item.text)}>
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  height: 117,
                  borderColor: indexofData === index ? "#ED6D34" : "#D9D9D9",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <View style={styles.innerContainer}>
                  <Image source={require("../assets/employee.png")} style={styles.image} />
                  <View style={{
                    width: 17,
                    height: 17,
                    borderRadius: 17,
                    backgroundColor: indexofData === index ? "#ED6D34" : "#D9D9D9",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <View style={{
                      width: 11,
                      height: 11,
                      borderRadius: 11,
                      borderColor: "#fff",
                      borderWidth: 1,
                    }} />
                  </View>
                </View>
                <View style={styles.spacer} />
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={{ height: 20 }} />
        <Pressable
          style={{ width: "90%", alignSelf: 'center' }}
          onPress={() => {
            if (indexofData === 0) {
              // Navigate to the client form screen
              navigation.navigate('PostProject');
            } else {
              // Navigate to the freelancer form screen
              navigation.navigate('CompleteProfile');
            }
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
              {buttonText}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    height: 117,
    borderColor: "#ED6D34",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  innerContainer: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: 29,
    height: 29,
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 17,
    backgroundColor: "#ED6D34",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 11,
    height: 11,
    borderRadius: 11,
    borderColor: "#fff",
    borderWidth: 1,
  },
  spacer: {
    height: 20,
  },
  text: {
    fontSize: 20,
    color: "#1E232C",
  },
});
