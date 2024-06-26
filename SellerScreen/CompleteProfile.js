import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CompleteProfile({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("ImagePicker result:", result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Image
            source={require("../assets/Logo.png")}
            style={{ width: 113, height: 113, alignSelf: "center" }}
          />
          <Text style={{ fontSize: 14, color: "#666666" }}>Create Your Profile</Text>
          <View style={{ height: 10 }} />
          <Text style={{ fontSize: 24, fontWeight: "500", color: "#1E232C" }}>
            A few last details, then you can check and publish your profile.
          </Text>
          <View style={{ height: 10 }} />
          <Text style={{ fontSize: 14, color: "#666666" }}>
            A professional photo helps you build trust with your clients. To keep things safe and
            simple, they’ll pay you through us - which is why we need your personal information.
          </Text>
          <View style={{ height: 20 }} />
          <TouchableOpacity onPress={pickImage}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{
                  width: 113,
                  height: 113,
                  alignSelf: "center",
                  borderRadius: 10,
                }}
                onError={(error) => console.log("Image load error:", error.nativeEvent.error)}
              />
            ) : (
              <Image
                source={require("../assets/Upload.png")}
                style={{
                  width: 113,
                  height: 113,
                  alignSelf: "center",
                }}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              width: 163,
              height: 47,
              borderWidth: 1,
              borderColor: "#ED6D34",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#ED6D34" }}>
              Upload photo
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
