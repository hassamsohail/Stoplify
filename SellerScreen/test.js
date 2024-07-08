import { View, Text } from 'react-native'
import React from 'react'

export default function test() {
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        return regex.test(password);
      }
      // if (!email.includes("@gmail.com")){
        //     // alert("email include @gmail.com")
        //     return;
        // }
        // if (password.length>10){
            
        // }
        // if (validatePassword(password)) {
        //     console.log("Password is valid");
        //   } else {
        //     console.log("Password does not meet the criteria");
        //   }
        // return;
  return (
    <View>
      <Text>test</Text>
    </View>
  )
}