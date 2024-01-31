import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { Video } from 'expo-av';
export default function Learning_Skill() {
  const [selected, setSelected] = React.useState("");
  const React_Data = [
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2F%230%20Level%202%20React%20Intro.mp4?alt=media&token=bd7f2e6a-5576-41cf-b544-418da6804da2",
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2F%230%20Level%202%20React%20Intro.mp4?alt=media&token=bd7f2e6a-5576-41cf-b544-418da6804da2",
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2F%230%20Level%202%20React%20Intro.mp4?alt=media&token=bd7f2e6a-5576-41cf-b544-418da6804da2",
  ]
  const Flutter_Data = [
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FWhat%20Is%20Flutter%20_%20Introduction%20To%20Flutter%20_%20Flutter%20_%20Intellipaat.mp4?alt=media&token=27956a13-1949-4943-ac91-452d99ac1d68",
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FWhat%20Is%20Flutter%20_%20Introduction%20To%20Flutter%20_%20Flutter%20_%20Intellipaat.mp4?alt=media&token=27956a13-1949-4943-ac91-452d99ac1d68",
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FWhat%20Is%20Flutter%20_%20Introduction%20To%20Flutter%20_%20Flutter%20_%20Intellipaat.mp4?alt=media&token=27956a13-1949-4943-ac91-452d99ac1d68",
  ]
  const Mobile_Data = [
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FBuild%20Apps%20With%20XDK%20and%20Parse_%20Introduction.mp4?alt=media&token=fd38a4bb-493b-4bfd-afa3-7236c50287e7",
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FBuild%20Apps%20With%20XDK%20and%20Parse_%20Introduction.mp4?alt=media&token=fd38a4bb-493b-4bfd-afa3-7236c50287e7",
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FBuild%20Apps%20With%20XDK%20and%20Parse_%20Introduction.mp4?alt=media&token=fd38a4bb-493b-4bfd-afa3-7236c50287e7",
  ]
  const Cyber_Seacurity = [
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FCyber%20Security%20-%20Video%20Animation%20Services.mp4?alt=media&token=80bb1610-c5fb-4b36-8652-51544747734d",
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FCyber%20Security%20-%20Video%20Animation%20Services.mp4?alt=media&token=80bb1610-c5fb-4b36-8652-51544747734d",
    "https://firebasestorage.googleapis.com/v0/b/prolancer-403a6.appspot.com/o/videos%2FCyber%20Security%20-%20Video%20Animation%20Services.mp4?alt=media&token=80bb1610-c5fb-4b36-8652-51544747734d",
  ]
  const [Skill_Videos, SetSkill_Videos] = useState([]);
  const [loader, setloader] = useState(false)
  const data = [
    // {key:'1', value:'React', disabled:true},
    { key: '1', value: 'React', },
    { key: '2', value: 'Flutter' },
    { key: '3', value: 'Mobile' },
    // {key:'4', value:'Django', disabled:true},
    { key: '5', value: 'Cyber Seacurity' },
    // {key:'6', value:'Diary Products'},
    // {key:'7', value:'Drinks'},
  ]
  const HandleValue = (value) => {
    setloader(true)
    console.log(value);
    if (value == "React") {
      SetSkill_Videos(React_Data);
      setloader(false)
    } else if (value == "Flutter") {
      SetSkill_Videos(Flutter_Data);
      setloader(false)
    } else if (value == "Mobile") {
      SetSkill_Videos(Mobile_Data);
      setloader(false)
    } else {
      SetSkill_Videos(Cyber_Seacurity);
      setloader(false)
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ height: 40 }} />
      <View style={{ width: "90%" }}>

        <SelectList
          setSelected={(val) => HandleValue(val)}
          data={data}
          save="value"
        // placeholder='Select Options'
        />

      </View>

      {Skill_Videos.length<=0 ?
      
      
      <View  style={{flex:1,justifyContent:"center"}}>
      <Text>Please Select Skill from </Text>
      
        </View>
        :Skill_Videos.map((e) => (

        <Video
          source={{ uri: e }}
          style={{ width: 300, height: 200 }}
          useNativeControls // Enable Expo's built-in video controls
          // resizeMode="contain" // Adjust the video's aspect ratio to fit the player
        />
      ))






      }




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});