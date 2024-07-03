import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Appbar, Card, Text, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ChatbotSampleMessages from './ChatBotSampleMessages'; // Import the SampleMessages component

const App = () => {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! How can I help you today?', sender: 'bot' },
    ]);
    const [inputText, setInputText] = useState('');

    const getBotResponse = async (prompt) => {
        try {
            const apiKey = 'AIzaSyADfMVLG7qIFKXLONy1cIDbhLG3T3-EFV4';

            const url = `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${apiKey}`;

            const ai = `Your response to this prompt must be no more than 7 lines of text. You are the coach of an app like Upwork that we have names "Stoplify". You are thinking from the perspective of a chatbot helper, and the guide is what you will be giving them. Now review the following message and guide them. `;
            const requestBody = {
                prompt: {
                    text: ai + ' (' + prompt + ')'
                }
            };

            console.log(`------------------PROMT-`);
            console.log(requestBody.prompt.text);

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            };
            const response = await fetch(url, options);
            const res = await response.json();
            if (res && res?.candidates && res?.candidates[0]?.output) {
                return res?.candidates[0]?.output;
            } else {
                console.log(`-AI REQUEST FAILED--`);
                console.log(res);
                return {
                    error: true,
                    msg: 'Error: Unable to process your request.'
                }
            }
        } catch (error) {
            console.error('Error:', error);
            return {
                error: true,
                msg: 'An error occurred. Please try again later.'
            };
        }
    }

    const handleSend = async () => {
        if (inputText.trim()) {

            const newMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
            setMessages([newMessage, ...messages]);
            setInputText('');

            const res = await getBotResponse(newMessage.text);
            if (!res  || res ?.error) {
                console.log('failed ai bot');
                return;
            }
            const botResponse = { id: Date.now().toString(), text: res, sender: 'bot' };
            setMessages([botResponse, newMessage, ...messages]);
        }
    };

    const handleSamplePress = (sample) => {
        setInputText(sample);
    };

    const renderItem = ({ item }) => (
        <Card style={item.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            <Card.Content>
                <Text>{item.text}</Text>
            </Card.Content>
        </Card>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Appbar.Header>
                <Appbar.Content title="AI Chatbot" />
            </Appbar.Header>

            <ChatbotSampleMessages onSamplePress={handleSamplePress} />

            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                inverted
                contentContainerStyle={{ paddingBottom: 10 }}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 25,
        padding: 10,
    },
    botMessage: {

        alignSelf: 'flex-start',
        backgroundColor: '#E0E0E0',
        marginVertical: 5,
        marginLeft: 10,
        borderRadius: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
        marginVertical: 5,
        marginRight: 10,
        borderRadius: 10,
        color: 'white',
    },
});

export default App;
