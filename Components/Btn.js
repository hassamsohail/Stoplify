/** @format */

// import React from "react";
import * as React from "react";

// import react from "react";
import { View, Text, Image } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
const Btn = (props) => {
  return (
    // <View>
    <View
      style={{
        width: "85%",
        height: 46,
        borderRadius: 10,
        backgroundColor: props.color,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: props.imageheight ? "70%" : "50%",
          width: props.imagewidth ? "5%" : "7%",
        }}
      >
        <Image
          source={props.image}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </View>
      <View
        style={{
          width: "3%",
        }}
      />
      <Text
        style={{
          fontSize: props.textfontsize,
          color: props.textcolor,
        }}
      >
        {props.name}
      </Text>
    </View>
  );
};
export default Btn;
