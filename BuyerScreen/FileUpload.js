

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from "react-native-vector-icons/Entypo";
import { useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import LoginBtn from '../Components/Loginbtn';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage, firebase, firestore } from '../firebase/firebase';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { doc_id } from '../SellerScreen/UUID';
import * as Linking from 'expo-linking';
function FileUpload({ navigation }) {
  const collectionRef = collection(firestore, 'files');
const [loader,setloader]=useState(false)
    const UploadPost = (fileName,downloadURL) => {
        console.log("This is Project id:"+project_id);
        console.log("This is Filename Name:"+fileName);
        console.log("This is Download url:"+downloadURL);
        const document_id = doc_id()
        const userdocumentref = doc(collectionRef, document_id)
    
        const Data = {
           "filename":fileName,
           "project_id":project_id,
           "file_link":downloadURL,

        }
        // setloader(true)
        setDoc(userdocumentref,Data).then(()=>{
            Alert.alert("Uploaded Successfully","File Are Uploaded")
            setloader(false)
            // navigation.goBack();
        }).catch(()=>{
            setloader(false)
            Alert.alert("Opps","Something went wrong")
    
        })
    };    
    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
          type: "*/*", // Allows picking all file types
        });
      console.log(result);
        if (result.canceled === false) {
          const metadata = {
            contentType: result.assets[0].mimeType, // Use the actual content type of the picked file
          };
          console.log("This is Name of:"+result.assets[0].name);
          const storageRef = ref(storage, 'files/' + Date.now() + '/' + result.assets[0].name);
          const fileBlob = await getBlobFroUri(result.assets[0].uri);
      
          const uploadTask = uploadBytesResumable(storageRef, fileBlob, metadata);
          setloader(true)
          uploadTask.on('state_changed',
            (snapshot) => {
              // Handle upload progress here
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              // Handle unsuccessful upload here
              alert('Upload error:', error);
              setloader(false)
            },
            async () => {
              // Handle successful upload here
              console.log('Upload completed successfully');
              try {
                const downloadURL = await getDownloadURL(storageRef);
                console.log('Download URL:', downloadURL);
                UploadPost(result.assets[0].name,downloadURL)
              } catch (error) {
                setloader(false)
                alert('Error getting download URL:', error);
              }
            }
          );
        }
      };
      

    const getBlobFroUri = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        return blob;
    };


    const [focusedTab, setFocusedTab] = useState('Dashboard');
    let route = useRoute()
    const { status, owner_email, project_id, user_id } = route.params
    const [Jobs,SetJobs] = useState([]);
    const BidUploaded = () => {
        setloader(true)
    
        const usersRef = collection(firestore, 'files');
        const q = query(usersRef,
          where('project_id', '==', project_id)
        );
        getDocs(q).then((querySnapshot) => {
          console.log(querySnapshot.docs.length);
          let temp = []
          querySnapshot.forEach((data) => {
            console.log(data.id);
            temp.push(data.data())
          })
          SetJobs(temp)
        //   settempJobs(temp)
        setloader(false)
    
        }).catch(() => {
          setloader(false)
          Alert.alert("Opps", "Something went wrong")
    
        })
    
      }
      useEffect(()=>{
        BidUploaded();
      },[])

    return (
        <View
            style={{
                flex: 1,
                // alignItems:"center",
                backgroundColor: "white",
            }}
        >
            <View
                style={{
                    width: "95%",
                    height: 30,
                    marginLeft: 5
                }}
            >


                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-thin-left" size={30} />
                </TouchableOpacity>
            </View>
            <Text
                style=
                {{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                    color: "#000000"
                }}
            >

                FileUpload
            </Text>

            <View
                style={{
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 10,
                    height: "80%"
                }}
            >
                <FlatList
                    data={Jobs}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (

                        <View
                            style={{
                                width: '100%',
                                marginBottom: 10,
                                backgroundColor: '#F1F1F1',
                                borderRadius: 10,
                                marginTop: 10,
                                padding: 20,
                                flexDirection: "row",
                                justifyContent: "space-between", // Adjust spacing
                                alignItems: "center" // Align vertically
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: '#000000',
                                }}
                            >
                                {item.filename.slice(0, 20) + "  ..."}
                            </Text>
                            <TouchableOpacity
onPress={()=>Linking.openURL(item.file_link)}
                            >

                                <Entypo name="download" size={24} color="#000000" />
                            </TouchableOpacity>
                        </View>
                    )}
                />


                <TouchableOpacity style={{ height: 30, alignItems: "center" }}

                    onPress={pickFile}
                >

                    <LoginBtn
                        color="#003399"
                        textcolor="#fff"
                        textfontsize={23}
                        name="Upload Document"
                    />

                </TouchableOpacity>
                <View style={{ height: 10 }} />
            </View>





            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingVertical: 10,
                    // postion:"absoulte",
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: '#ffffff', // Customize tab bar background color
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Tasklist', {
                        status: status,
                        owner_email: owner_email,
                        project_id: project_id,
                        user_id: user_id

                    })}

                    style={{ alignItems: 'center' }}>
                    <Ionicons
                        name={focusedTab === 'Dashboard' ? 'ios-list' : 'ios-list'}
                        size={24}
                        color={focusedTab === 'Dashboard' ? '#000000' : '#000000'}
                    />
                    <Text style={{ color: focusedTab === 'Dashboard' ? '#000000' : '#000000' }}>Tasklist</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Chat', {
                        status: status,
                        owner_email: owner_email,
                        project_id: project_id,
                        user_id: user_id

                    })}


                    style={{ alignItems: 'center' }}>
                    <Ionicons
                        name={focusedTab === 'BuyerChat' ? 'chatbubble' : 'chatbubble'}
                        size={24}
                        color={focusedTab === 'BuyerChat' ? '#000000' : '#000000'}
                    />
                    <Text style={{ color: focusedTab === 'BuyerChat' ? '#000000' : '#000000' }}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity

                    onPress={() => navigation.navigate('FileUpload', {
                        status: status,
                        owner_email: owner_email,
                        project_id: project_id,
                        user_id: user_id

                    })}

                    style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name={focusedTab === 'FileUpload' ? 'file-upload' : 'file-upload'}
                        size={24}
                        color={focusedTab === 'FileUpload' ? '#000000' : '#000000'}
                    />
                    <Text style={{ color: focusedTab === 'FileUpload' ? '#000000' : '#000000' }}>File Upload</Text>
                </TouchableOpacity>
            </View>



            <Modal   visible={loader} transparent>
        <View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<ActivityIndicator  size={"large"}  color={"black"} />
        </View>
      </Modal>



        </View>
    );
}

export default FileUpload;