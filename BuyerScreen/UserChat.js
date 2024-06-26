import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UserChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [price, setPrice] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [currentPrice, setCurrentPrice] = useState('');
  const [image, setImage] = useState(null);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { id: messages.length.toString(), text: message, fromMe: true }]);
      setMessage('');
    }
  };

  const startCountdown = () => {
    if (countdown === null) {
      const totalSeconds =
        parseInt(days) * 86400 +
        parseInt(hours) * 3600 +
        parseInt(minutes) * 60 +
        parseInt(seconds);
  
      if (totalSeconds > 0 && !isNaN(totalSeconds) && !isNaN(parseFloat(price))) {
        setCountdown(totalSeconds);
        setCurrentPrice(price);
        setModalVisible(false); // Close the modal after starting countdown
      } else {
        Alert.alert('Invalid Input', 'Please enter valid countdown values and price.');
      }
    } else {
      Alert.alert(
        'Countdown Already Started',
        'Please cancel the current countdown before starting a new one.'
      );
    }
  };
  
  

  const cancelCountdown = () => {
    setCountdown(null);
    setCurrentPrice('');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadFile = () => {
    pickImage();
  };

  const submitReview = () => {
    // Implement submission logic here
    Alert.alert('Review Submitted!', `Rating: ${rating}, Review: ${review}`);
    setRating(0);
    setReview('');
    setReviewModalVisible(false); // Close the review modal after submission
    setCountdown(null); // Stop the countdown timer
  };

  const openReviewModal = () => {
    setModalVisible(false); // Close the previous modal if open
    setReviewModalVisible(true);
  };

  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const formatCountdown = () => {
    if (countdown === null) return 'Try to Start order';
    const d = Math.floor(countdown / 86400);
    const h = Math.floor((countdown % 86400) / 3600);
    const m = Math.floor((countdown % 3600) / 60);
    const s = countdown % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.startOrderContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text>{formatCountdown()}</Text>
        {currentPrice && <Text>Price: ${currentPrice}</Text>}
      </TouchableOpacity>

      {countdown !== null && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelCountdown}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={uploadFile}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={openReviewModal}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeButton} onPress={() => setCountdown(null)}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      )}

      {image && (
        <View style={styles.imageContainer}>
          <Text>Selected Image:</Text>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={item.fromMe ? styles.myMessageContainer : styles.otherMessageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Select Timer</Text>
            <TextInput
              placeholder="Days"
              keyboardType="numeric"
              value={days}
              onChangeText={setDays}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Hours"
              keyboardType="numeric"
              value={hours}
              onChangeText={setHours}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Minutes"
              keyboardType="numeric"
              value={minutes}
              onChangeText={setMinutes}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Seconds"
              keyboardType="numeric"
              value={seconds}
              onChangeText={setSeconds}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              style={styles.modalInput}
            />
            <TouchableOpacity
              style={styles.startButton}
              onPress={startCountdown}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={reviewModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Rate your experience</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  style={styles.starButton}
                  onPress={() => setRating(star)}
                >
                  <Text>{star} Star</Text>
                  {rating >= star && <Text>★</Text>}
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write your review..."
              value={review}
              onChangeText={setReview}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity
              style={styles.submitReviewButton}
              onPress={submitReview}
            >
              <Text style={styles.submitReviewButtonText}>Submit Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelReviewButton}
              onPress={() => setReviewModalVisible(false)}
            >
              <Text style={styles.cancelReviewButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  startOrderContainer: {
    height: 80,
    width: "90%",
    marginTop: 10,
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '70%',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '70%',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F0F0F0',
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  uploadButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginLeft: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  completeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFA500',
    marginLeft: 10,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  startButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  starButton: {
    marginHorizontal: 5,
    padding: 5,
    alignItems: 'center',
  },
  reviewInput: {
    width: '100%',
    padding: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  submitReviewButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  submitReviewButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelReviewButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  cancelReviewButtonText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
