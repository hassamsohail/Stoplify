import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from "react-native-vector-icons/Entypo";
import FormInput from "../Components/FormInput";
import LoginBtn from "../Components/Loginbtn";

export default function Support({navigation}) {
      const [Email, setEmail] = React.useState();
      const [PostProjectDes, setPostProjectDes] = React.useState();

  return (
    <View
    style={{
      flex: 1,
    alignItems:"center",
      backgroundColor: "white",
    }}
  >

    <View
          style={{
            width: "95%",
            height: 25,
            marginTop:20
          }}
        >
                    
      
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-thin-left" size={30} />
          </TouchableOpacity>
        </View>
       
    <Text
    style=
    {{
      fontSize:20,
      fontWeight:"bold",
      alignSelf:"center",
      color:"#000000"
    }}
    >

      Support
    </Text>
   
      
      <FormInput
           // style={styles.input}
           onChangeText={(Email) => setEmail(Email)}
           // value={text}
           labelValue={Email}
           // secureTextEntry={true}
           // keyboardType="email-address"
           placeholder="Enter Email"
           autoCapitalize="none"
           autocorrect={false}
         />
    <View
style={{
    height:10
}}

    />        
      <FormInput
           // style={styles.input}
           onChangeText={(PostProjectDes) => setPostProjectDes(PostProjectDes)}
           // value={text}
           labelValue={PostProjectDes}
           // secureTextEntry={true}
           // keyboardType="email-address"
           placeholder="Enter Your Query here"
           autoCapitalize="none"
           autocorrect={false}
         />
         <View
          style={{
            height: "10%",
          }}
        />
            <TouchableOpacity
          style={{
            width: "100%",
            height: 46,
            alignItems: "center",
          }}
          onPress={() => {
        
            navigation.navigate("Tab");
          }}
        >
          <LoginBtn
            color="#003399"
            textcolor="#fff"
            textfontsize={23}
            name="Send Query"
          />
        </TouchableOpacity>
    </View>
  )
}