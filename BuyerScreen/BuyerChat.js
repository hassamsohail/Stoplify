import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {collection, getDocs} from "firebase/firestore";
import {firestore} from "../firebase/firebase";

const BuyChat = ({navigation, route}) => {
    // Placeholder array for chat data
    const placeholderChats = [
        {id: '1', username: 'User1'},
        {id: '2', username: 'User2'},
        {id: '3', username: 'User3'},
        // Add more data as needed
    ];

    useEffect(() => {
        onGetUsers();
    }, []);

    const onGetUsers = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) {
            return;
        }
        try {
            // Reference to the "Rooms" collection
            const roomsRef = collection(firestore, 'Rooms');

            // Get all documents in the "Rooms" collection
            const querySnapshot = await getDocs(roomsRef);

            // Extract rooms from the query snapshot
            const rooms = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(`----------------------------START-`)
            console.log(rooms)
            console.log(`----------------------------END-`)
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    }

    const users = placeholderChats.map(chat => chat.username);

    return (
        <View style={styles.container}>

            <Text
                style=
                    {{
                        fontSize: 20,
                        fontWeight: "bold",
                        alignSelf: "center",
                        color: "#000000"
                    }}
            >
                Chat
            </Text>
            <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.userItem}
                        onPress={() => navigation.navigate('UserChat', {username: item})}
                    >
                        <Text style={styles.username}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    userItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    username: {
        fontSize: 16,
    },
});

export default BuyChat;
