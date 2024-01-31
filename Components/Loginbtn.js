/** @format */

import * as React from "react";
import { View, Text, Image } from "react-native";

const LoginBtn = (props) => {
  return (
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
export default LoginBtn;
