import React, { useState } from 'react';
import { ActivityIndicator,TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Entypo from "react-native-vector-icons/Entypo";
import LoginBtn from "../Components/Loginbtn";


export default function SelectSkill() {
 
  const [textValue, setTextValue] = useState('');
  
  const [Skilled,SetSkilled]=useState([])
  const data = [
    { key: '1', value: 'React' },
    { key: '2', value: 'Flutter' },
    { key: '3', value: 'Mobile' },
    { key: '5', value: 'Cyber Security' },
  ];

  const HandleValue = (value) => {
     SetSkilled((Skilled)=>[...Skilled,value])
    setTextValue(value); // Set the selected skill in the text box.
  };
const Remove=(val)=>{
SetSkilled((Skilled)=>Skilled.filter((e)=>e!=val));
}
  return (
    <View style={styles.container}>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 25, color: '#3E4A59', fontWeight: '800' }}>
        Select the Skill
      </Text>

      <View style={{ height: '2%' }} />
      <Text style={{ fontSize: 15, color: '#8B959A' }}>
        Please Select your Relevant Skill
      </Text>

      <View style={{ height: '2%' }} />
      <View style={{ width: '90%' }}>
        <SelectList setSelected={(val) => HandleValue(val)} data={data} save="value" />
      </View>
      <View style={{ marginTop: 20, width: '90%', height: "40%", borderWidth: 1, borderColor: '#000000' }}>
  <View style={{ backgroundColor: 'lightGrey' }}>
    {/* <Text>{textValue}</Text> Display the selected skill */}
    <FlatList 
    data={Skilled}
    renderItem={({item})=>(
        <View style={{flexDirection:"row",
        padding:10,
        justifyContent:"space-between"}}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={()=>Remove(item)}>
            <Entypo name="cross" size={30} color="black" />
          </TouchableOpacity>
        </View>
    )}
    
    
     />

   
  </View>
</View>
<View

    style={{
        height:20
    }}
/>
<TouchableOpacity
          style={{
            width: "100%",
            height: 46,
            
            alignItems: "center",
          }}
          onPress={() => {
            // API(); 
            navigation.navigate("Tab");
          }}
        >
          <LoginBtn
            color="#003399"
            textcolor="#fff"
            textfontsize={23}
            name="Next"
          />
        </TouchableOpacity>
        <View

    style={{
        height:10
    }}
/>
<TouchableOpacity
          style={{
            width: "100%",
            height: 46,
            
            alignItems: "center",
          }}
          onPress={() => {
            // API(); 
            // navigation.navigate("SelectSkill");
          }}
        >
          <LoginBtn
            color="#003399"
            textcolor="#fff"
            textfontsize={23}
            name="Skip"
          />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});





