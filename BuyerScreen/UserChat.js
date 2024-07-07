import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  addDoc,
  query,
  getDocs,
  orderBy,
  deleteDoc,
  updateDoc,
  setDoc,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import CountdownTimer from "./CountDownTimer";
import { createdAt } from "expo-updates";

export default function UserChat(params) {
  const data = params?.route?.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentOrder, setAllOrders] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [price, setPrice] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [currentPrice, setCurrentPrice] = useState("");
  const [image, setImage] = useState(null);
  const [roomID, setRoomId] = useState(null);
  const collectionRef = collection(firestore, "chats");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    onManageUser();
  }, []);

  const onManageUser = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    const roomId = await getUniqueID(userId, data?.userId);
    if (userId && data?.userId) {
      fetchMessages(roomId);
      fetchOrders(roomId);
      setRoomId(roomId);
    }
  };

  const getUniqueID = (id1, id2) => {
    const sortedIDs = [id1, id2].sort();
    return sortedIDs.join("");
  };

  const fetchMessages = async (room) => {
    // if (!room) {
    //     return;
    console.log("Hello");
    // }

    try {
      const userId = await AsyncStorage.getItem("user_id");

      if (!userId) {
        throw new Error("User ID not found in AsyncStorage");
      }

      const chatter = data?.userId;

      if (!chatter) {
        throw new Error("Chatter ID is missing");
      }

      const conversation_id = userId + chatter;
      console.log(conversation_id);

      const messagesRef = collection(firestore, "chats");
      const messagesQuery = query(
        messagesRef,
        where("conversation_id", "==", conversation_id),
        orderBy("createdAt")
      );
     

    
      
      const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          temp.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setMessages(temp.reverse());
      });

      // Clean up the subscription on unmount
      return () => unsubscribe();

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchOrders = async (room) => {
    if (!room) {
      return;
    }

    try {
      const messagesRef = collection(firestore, "Orders", room, "Services");

      const messagesQuery = query(messagesRef, orderBy("timestamp"));

      const querySnapshot = await getDocs(messagesQuery);

      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let newOrders = null;
      const today = new Date();
      for (let i = 0; i < orders?.length; i++) {
        const status = orders[i]?.status;
        const expiry = orders[i]?.orderTime?.expiry;
        if (expiry && status !== "finish") {
          const expiryDate = new Date(expiry);
          const timeDifferenceInSeconds = (expiryDate - today) / 1000;
          if (timeDifferenceInSeconds > 0) {
            setCountdown(timeDifferenceInSeconds);
            setCurrentPrice(orders[i]?.price);
            newOrders = {
              ...orders[i],
              timeDifferenceInSeconds,
            };
            i = orders.length;
          }
        }
      }

      setAllOrders(newOrders);
      console.log(`---------------------------NEw or-`);
      console.log(newOrders);
      console.log(`---------------------------orders-`);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!roomID) {
      return;
    }
    const userId = await AsyncStorage.getItem("user_id");
    const chatter = data?.userId;
    if (message.trim() !== "") {
      try {
        const messageId1 = doc(collection(firestore, "chats")).id;
        const messageId2 = doc(collection(firestore, "chats")).id;
        const userdocumentref1 = doc(collectionRef, messageId1);
        const userdocumentref2 = doc(collectionRef, messageId2);
        const messageObj1 = {
          id: messageId1,
          text: message,
          fromMe: userId,
          timestamp: new Date().toString(),
          sender_id: userId,
          receiver_id: chatter,
          conversation_id: userId + chatter,
          createdAt: serverTimestamp(),
        };
        const messageObj2 = {
          id: messageId2,
          text: message,
          fromMe: userId,
          timestamp: new Date().toString(),
          sender_id: userId,
          receiver_id: chatter,
          conversation_id: chatter + userId,
          createdAt: serverTimestamp(),
        };

        await setDoc(userdocumentref1, messageObj1);
        await setDoc(userdocumentref2, messageObj2);
        if (messages == null) {
          let temp = [];
          temp.push(messageObj1);
          setMessages(temp);
        } else {
          messages.unshift(messageObj1);
          setMessages(messages);
          setMessage("")
        }

        // setMessage('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const makeOrder = async (orderDetail) => {
    if (!roomID) {
      return;
    }
    const userId = await AsyncStorage.getItem("user_id");
    const chatter = data?.userId;
    const orderObj = {
      fromMe: userId,
      orderWith: chatter,
      timestamp: new Date().toString(),
      status: "started",
      ...orderDetail,
    };

    const roomRef = doc(firestore, "Orders", roomID);
    const messagesRef = collection(roomRef, "Services");

    await addDoc(messagesRef, orderObj);
    await fetchOrders(roomID);
  };

  const startCountdown = () => {
    if (!currentOrder) {
      const totalSeconds =
        parseInt(days) * 86400 +
        parseInt(hours) * 3600 +
        parseInt(minutes) * 60 +
        parseInt(seconds);

      if (
        totalSeconds > 0 &&
        !isNaN(totalSeconds) &&
        !isNaN(parseFloat(price))
      ) {
        setCountdown(totalSeconds);
        setCurrentPrice(price);
        const expiryDate = new Date();
        expiryDate.setSeconds(expiryDate?.getSeconds() + totalSeconds);
        makeOrder({
          totalSeconds,
          price,
          orderTime: {
            days: parseInt(days),
            hours: parseInt(hours),
            minutes: parseInt(minutes),
            seconds: parseInt(seconds),
            expiry: expiryDate?.toString(),
          },
        });
        setModalVisible(false); // Close the modal after starting countdown
      } else {
        Alert.alert(
          "Invalid Input",
          "Please enter valid countdown values and price."
        );
      }
    } else {
      Alert.alert(
        "Countdown Already Started",
        "Please cancel the current countdown before starting a new one."
      );
    }
  };

  const cancelCountdown = () => {
    if (!currentOrder) {
      return;
    }
    Alert.alert("Confirm Action", "Are you sure you want to proceed?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            const roomRef = doc(firestore, "Orders", roomID);
            const services = collection(roomRef, "Services");
            const docRes = doc(services, currentOrder?.id);

            deleteDoc(docRes)
              .then(() => {
                console.log("Order deleted successfully!");
                fetchOrders(roomID);
              })
              .catch((error) => {
                console.error("Error deleting order:", error);
              });
          } catch (error) {
            console.error("Error deleting order--:", error);
          }
        },
      },
    ]);

    // setCountdown(null);
    // setCurrentPrice('');
  };

  const onMarkComplete = (status) => {
    if (!currentOrder) {
      return;
    }
    Alert.alert("Confirm Action", "Are you sure you want to proceed?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            updateOrderValue({ status });
          } catch (error) {
            console.error("Error completing order--:", error);
          }
        },
      },
    ]);

    // setCountdown(null);
    // setCurrentPrice('');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      updateOrderValue({ status: "uploaded" });
    }
  };

  const updateOrderValue = (obj) => {
    if (currentOrder && currentOrder?.id) {
      console.log("currentOrder: " + currentOrder?.id);
      const roomRef = doc(firestore, "Orders", roomID);
      const services = collection(roomRef, "Services");
      const docRes = doc(services, currentOrder?.id);

      updateDoc(docRes, obj)
        .then(() => {
          console.log("Document updated successfully!");
          fetchOrders(roomID);
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
    }
  };

  const uploadFile = () => {
    pickImage();
  };

  const submitReview = () => {
    // Implement submission logic here
    Alert.alert("Review Submitted!", `Rating: ${rating}, Review: ${review}`);
    updateOrderValue({ status: "finish", rating, review });
    setRating(0);
    setReview("");
    setReviewModalVisible(false);
    setCountdown(null);
    fetchOrders(roomID);
  };

  const openReviewModal = () => {
    setModalVisible(false); // Close the previous modal if open
    setReviewModalVisible(true);
  };

  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const formatCountdown = () => {
    if (!currentOrder) return "Try to Start order";
    /*const d = Math.floor(countdown / 86400);
        const h = Math.floor((countdown % 86400) / 3600);
        const m = Math.floor((countdown % 3600) / 60);
        const s = countdown % 60;*/
    // return `${d}d ${h}h ${m}m ${s}s`;
    return <CountdownTimer initialSeconds={countdown} />;
  };

  if (roomID) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.startOrderContainer}
          onPress={() => {
            // fetchMessages(roomID);
            setModalVisible(true);
          }}
        >
          <Text>{formatCountdown()}</Text>
          {currentOrder && <Text>Price: ${currentOrder?.price}</Text>}
        </TouchableOpacity>

        {currentOrder && (
          <View style={styles.buttonContainer}>
            {currentOrder?.status !== "finish" && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelCountdown}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
            {currentOrder?.status === "started" && (
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadButtonText}>Upload Work</Text>
              </TouchableOpacity>
            )}
            {currentOrder?.status === "uploaded" && (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => onMarkComplete("completed")}
              >
                <Text style={styles.completeButtonText}>Mark as Completed</Text>
              </TouchableOpacity>
            )}
            {currentOrder?.status === "completed" && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => setReviewModalVisible(!reviewModalVisible)}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            )}
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={
                item.sender_id !== data?.userId
                  ? styles.myMessageContainer
                  : styles.otherMessageContainer
              }
            >
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

        <Modal transparent={true} visible={modalVisible} animationType="slide">
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
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  style={[styles.startButton, { marginRight: 10 }]}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.startButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={startCountdown}
                >
                  <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
              </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    alignItems: "center",
  },
  myMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: "70%",
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: "70%",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F0F0F0",
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#007AFF",
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
  },
  uploadButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    marginLeft: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  completeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFA500",
    marginLeft: 10,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  startButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  starButton: {
    marginHorizontal: 5,
    padding: 5,
    alignItems: "center",
  },
  reviewInput: {
    width: "100%",
    padding: 10,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  submitReviewButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  submitReviewButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelReviewButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
  },
  cancelReviewButtonText: {
    color: "white",
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
