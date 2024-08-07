import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    Pressable,
    ImageBackground,
    Alert,
    ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const { width } = Dimensions.get("window");

export default function CompleteProfile({ navigation }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTagPress = (label) => {
        setSelectedTags((prevSelectedTags) => {
            const newSelectedTags = prevSelectedTags.includes(label)
                ? prevSelectedTags.filter((tagLabel) => tagLabel !== label)
                : [...prevSelectedTags, label];

            console.log('Selected Labels:', newSelectedTags);

            return newSelectedTags;
        });
    };

    const tags = [
        { id: '1', label: 'React Native' },
        { id: '2', label: 'JavaScript' },
        { id: '3', label: 'Expo' },
        { id: '4', label: 'Node.js' },
        { id: '5', label: 'Python' },
        { id: '6', label: 'TypeScript' },
        { id: '7', label: 'CSS' },
        { id: '8', label: 'HTML' },
        { id: '9', label: 'Redux' },
        { id: '10', label: 'GraphQL' },
        { id: '11', label: 'REST API' },
        { id: '12', label: 'SQLite' },
    ];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log("ImagePicker result:", result);

        if (!result.canceled) {
            setSelectedImage(result.assets[0]?.uri);
            const localUri = result.assets[0].uri;
            let filename = localUri?.split('/')?.pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            const file = { uri: localUri, name: filename, type };
            if (file) {
                const imgRes = await imageUploader(file);
                if (imgRes?.status === 'false' || imgRes?.status === false) {
                    Alert.alert('Failed', imgRes?.msg);
                    return;
                }
                const newImg = `https://i.ibb.co/${(imgRes?.msg ? imgRes?.msg : 'gZMk5Jc')}/ha.png`;
                setSelectedImage(newImg);
            }
        }
    };

    const [professional, setProfessional] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [experience, setExperience] = useState('');

    const renderItem = ({ item }) => {
        const isSelected = selectedTags.includes(item.label);
        return (
            <TouchableOpacity
                style={[
                    styles.tagView,
                    isSelected && styles.selectedTagView
                ]}
                onPress={() => handleTagPress(item.label)}
            >
                <Text style={[styles.tagText, isSelected && styles.selectedTagText]}>
                    {item.label}
                </Text>
                <View style={styles.iconSpacing} />
                <Ionicons
                    name={isSelected ? "remove" : "add"}
                    size={24}
                    color={isSelected ? "white" : "black"}
                />
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }

            const userId = await AsyncStorage.getItem('user_id');
            if (!userId) {
                return;
            }

            const userRef = doc(firestore, 'user', userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists() && userDoc.data().tags && userDoc.data().tags.length > 0) {
                navigation.navigate("Tab");
            }
        })();
    }, []);

    const onUpdateProfile = async () => {
      if (!selectedImage) {
        Alert.alert("Validation Error", "Please select an image.");
        return;
    }
    if (!professional) {
        Alert.alert("Validation Error", "Please add your professional role.");
        return;
    }
    if (!experience) {
        Alert.alert("Validation Error", "Please add your experience.");
        return;
    }
    if (selectedTags.length === 0) {
        Alert.alert("Validation Error", "Please select at least one skill.");
        return;
    }
    if (!country) {
        Alert.alert("Validation Error", "Please add your country.");
        return;
    }
    if (!city) {
        Alert.alert("Validation Error", "Please add your city.");
        return;
    }


        setLoading(true);
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            const obj = {
                country,
                city,
                tags: selectedTags,
                experience,
                professional,
                profileImage: selectedImage
            };
            const userRef = doc(firestore, 'user', userId);
            await updateDoc(userRef, obj);
            console.log("User updated successfully!");
            Alert.alert("Success", "Profile completed successfully!", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("Tab"),
                },
            ]);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                <View style={{width: "90%", alignSelf: "center"}}>
                    <Image
                        source={require("../assets/Logo.png")}
                        style={{width: 113, height: 113, alignSelf: "center"}}
                    />
                    <Text style={{fontSize: 14, color: "#666666"}}>Create Your Profile</Text>
                    <View style={{height: 10}}/>
                    <Text style={{fontSize: 24, fontWeight: "500", color: "#1E232C"}}>
                        A few last details, then you can check and publish your profile.
                    </Text>
                    <View style={{height: 10}}/>
                    <Text style={{fontSize: 14, color: "#666666"}}>
                        A professional photo helps you build trust with your clients. To keep things safe and
                        simple, they’ll pay you through us - which is why we need your personal information.
                    </Text>
                    <View style={{height: 20}}/>
                    <TouchableOpacity onPress={pickImage}>
                        {selectedImage ? (
                            <Image
                                source={{uri: selectedImage}}
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
                            marginTop: 20
                        }}
                    >
                        <TextInput
                            label="Your professional role"
                            value={professional}
                            onChangeText={(professional) => setProfessional(professional)}
                            style={{backgroundColor: "rgba(58, 58, 77, 0.1)"}}
                            underlineColor="transparent"
                            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
                            selectionColor="#E75E31"
                            activeUnderlineColor="#E75E31"
                            outlineColor="rgba(58, 58, 77, 0.1)"
                            textColor="#000000"
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 20
                        }}
                    >
                        <TextInput
                            label="Add experience year"
                            value={experience}
                            onChangeText={(experience) => setExperience(experience)}
                            style={{backgroundColor: "rgba(58, 58, 77, 0.1)"}}
                            underlineColor="transparent"
                            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
                            selectionColor="#E75E31"
                            activeUnderlineColor="#E75E31"
                            outlineColor="rgba(58, 58, 77, 0.1)"
                            textColor="#000000"
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 14,
                            marginTop: 20,
                            fontWeight: "400",
                            color: "#8D8D8D",
                        }}
                    >
                        Select your skills
                    </Text>
                    <View
                        style={{
                            height: 10,
                        }}
                    />

                    <FlatList
                        data={tags}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        horizontal={false}
                        numColumns={2}
                    />
                    <View
                        style={{
                            marginTop: 20
                        }}
                    >
                        <TextInput
                            label="Country"
                            value={country}
                            onChangeText={(country) => setCountry(country)}
                            style={{backgroundColor: "rgba(58, 58, 77, 0.1)"}}
                            underlineColor="transparent"
                            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
                            selectionColor="#E75E31"
                            activeUnderlineColor="#E75E31"
                            outlineColor="rgba(58, 58, 77, 0.1)"
                            textColor="#000000"
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 20
                        }}
                    >
                        <TextInput
                            label="City"
                            value={city}
                            onChangeText={(city) => setCity(city)}
                            style={{backgroundColor: "rgba(58, 58, 77, 0.1)"}}
                            underlineColor="transparent"
                            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
                            selectionColor="#E75E31"
                            activeUnderlineColor="#E75E31"
                            outlineColor="rgba(58, 58, 77, 0.1)"
                            textColor="#000000"
                        />
                    </View>
                    <View

                        style={{
                            height: 20
                        }}
                    />
                    <Pressable
                        style={{width: "100%"}}
                        onPress={() => {
                            onUpdateProfile();
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
                                Complete Profile
                            </Text>
                        </ImageBackground>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    slide: {
        flex: 1,
        alignItems: "center",
        width,
    },
    image: {
        width: 260,
        height: 260,
        marginBottom: 20,
        alignSelf: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 10,
        paddingHorizontal: 30,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#A1A1AC",
        textAlign: "center",
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignSelf: "center",
        width: "90%",
    },
    skipButton: {
        width: "100%",
        borderRadius: 10,
    },
    nextButton: {
        width: "100%",
        borderRadius: 10,
        margin: 20,
    },
    buttonText: {
        color: "#858597",
        fontSize: 14,
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    tagView: {
        height: 37,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        flexDirection: 'row',
        margin: 5,
        backgroundColor: 'white',
    },
    selectedTagView: {
        backgroundColor: 'black',
    },
    tagText: {
        fontSize: 14,
        color: "#000000",
    },
    selectedTagText: {
        color: 'white',
    },
    iconSpacing: {
        width: 10,
    },
});