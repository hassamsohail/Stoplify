import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';

const ChatbotSampleMessages = ({onSamplePress}) => {
    const samples = [
        'Can I set my hourly rates?',
        'Do I need to verify before selling services?',
        'How do I withdraw my earnings?',
        'What are the fees for freelancers?',
        'How do I get paid?',
        'Can I change my username?',
        'How do I contact customer support?',
        'What should I do if I encounter a problem with a client?',
        'How can I improve my profile visibility?',
        'What are the guidelines for posting a service?',
        'How do I handle revisions and refunds?',
        'How can I report inappropriate behavior?',
        'What are the payment methods available?',
        'How do I cancel an order?',
        'What is the process for dispute resolution?',
        'How do I edit or delete my services?',
        'How can I promote my services?',
        'What should I include in my portfolio?',
        'How do I manage my orders and deliveries?',
        'Can I offer multiple services?',
        'How do I handle client reviews and ratings?',
        'What are the best practices for communication with clients?',
        'How do I track my earnings and transactions?',
        'What happens if I miss a delivery deadline?',
        'How can I ensure secure transactions?',
        'What are the community guidelines?',
        'How do I link my social media accounts?',
        'Can I offer discounts or promotions?',
        'How do I update my profile information?',
        'What should I do if my account is hacked?',
    ];

    return (
        <View style={styles.sampleContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {samples.map((sample, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            onSamplePress(sample);
                        }}
                        style={styles.chip}
                    >
                        <Text
                        >
                            {sample}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    sampleContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f4f4f4',
    },
    chip: {
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    },
});

export default ChatbotSampleMessages;
