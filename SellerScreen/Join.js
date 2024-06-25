import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  Pressable,
  Image,
} from "react-native"; // Import ScrollView
import React, { useState } from "react";
import FormInput from "../Components/FormInput";
import LoginBtn from "../Components/Loginbtn";
import Entypo from "react-native-vector-icons/Entypo";

export default function Join() {
  const [indexofData, setindexofData] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          //   alignItems: 'center', // You can change this based on your content alignment needs
          paddingVertical: 20, // Optional, add padding if required
        }}
      >
        <Image
          source={require("../assets/Logo.png")}
          style={{
            width: 113,
            height: 113,
            alignSelf: "center",
          }}
        ></Image>
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
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            height: 117,
            borderColor: "#ED6D34",
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 1,
      padding:15,
      justifyContent:"center",
      alignItems:"center"
      
          }}
        >
<View
style={{
  width:"90%",
  alignSelf:"center",
  justifyContent:"space-between",
  flexDirection:"row"
}}
>

<Image
          source={require("../assets/employee.png")}
          style={{
            width: 29,
            height: 29,
            // alignSelf: "center",
          }}
        ></Image>

<View

style={{
  width:17, height:17, borderRadius:17, backgroundColor:"#ED6D34",
  justifyContent:"center", alignItems:"center"
}}
>
<View
style={{
  width:11, height:11, borderRadius:11, borderColor:"#fff", borderWidth:1
}}
>

</View>

</View>
</View>
<View
style={{
  height:20
}}
/>

<Text
          style={{
            fontSize: 20,
            color: "#1E232C",
            // alignSelf: "center",
          }}
        >
          I’m a client, hiring for a project
        </Text>
        </View>
      </ScrollView>
    </View>
  );
}
