import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Video } from 'expo-av';

export default function Learning_Skill() {
  const [selected, setSelected] = useState("");
  const [skillVideos, setSkillVideos] = useState([]);
  const [loader, setLoader] = useState(false);

  const reactData = [
    "https://firebasestorage.googleapis.com/v0/b/stoplify.appspot.com/o/y2mate.com%20-%20React%20Native%20in%20100%20Seconds_480p.mp4?alt=media&token=7177d7e4-7c7d-4d8c-b4f6-03511dd0034e"
  ];

  const flutterData = [
    "https://firebasestorage.googleapis.com/v0/b/stoplify.appspot.com/o/y2mate.com%20-%20Expo%20in%20100%20Seconds_480p.mp4?alt=media&token=ba30ac8f-7384-44e9-a9dc-a5a07a15d42d"
  ];

  const mobileData = [
    "https://firebasestorage.googleapis.com/v0/b/stoplify.appspot.com/o/y2mate.com%20-%20TypeScript%20in%20100%20Seconds_480p.mp4?alt=media&token=09994204-6ab0-48c9-a221-c4e17d7485ba"
  ];

  const Flutter = [
    "https://firebasestorage.googleapis.com/v0/b/stoplify.appspot.com/o/y2mate.com%20-%20Futurewait%20Technique%20of%20the%20Week_480p.mp4?alt=media&token=5f690366-e0c2-4aff-97d2-9a11c8f9c0ff"
  ];

  const handleValue = (value) => {
    setLoader(true);
    setSelected(value);
    switch (value) {
      case "React_Native":
        setSkillVideos(reactData);
        break;
      case "Expo":
        setSkillVideos(flutterData);
        break;
      case "Type_Script":
        setSkillVideos(mobileData);
        break;
      case "Flutter":
        setSkillVideos(Flutter);
        break;
      default:
        setSkillVideos([]);
    }
    setLoader(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 40 }} />
      <View style={{ width: "90%" }}>
        <SelectList
          setSelected={(val) => handleValue(val)}
          data={[
            { key: '1', value: 'React_Native' },
            { key: '2', value: 'Expo' },
            { key: '3', value: 'Type_Script' },
            { key: '4', value: 'Flutter' }
          ]}
          save="value"
        />
      </View>

      {loader ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : skillVideos.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Please select a skill from the dropdown.</Text>
        </View>
      ) : (
        skillVideos.map((video, index) => (
          <Video
            key={index}
            source={{ uri: video }}
            resizeMode="contain"
            style={{ width: 300, height: 200 }}
            useNativeControls
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
