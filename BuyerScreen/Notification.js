import {
    View,
    Text,
    StatusBar,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  // import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from "react-native-vector-icons/Entypo";
  
  export default function DeviceNotificatin({navigation}) {
   
      const data=[
   
      {
        Notification:
          'Lorem ipsum is placeholderefwrg text commonly used kidwhihe',
        time: '2 hours ago',
      },
      {
        Notification:
          'Lorem ipsum is placeholderefwrg text commonly used kidwhihe',
        time: '2 hours ago',
      },
      {
        Notification:
          'Lorem ipsum is placeholderefwrg text commonly used kidwhihe',
        time: '2 hours ago',
      },
      {
        Notification:
          'Lorem ipsum is placeholderefwrg text commonly used kidwhihe',
        time: '2 hours ago',
      },
           
    ]
    
    // const GetNotification=()=>{
    //   console.log("dsvh");
    //   AsyncStorage.getItem('notification')
    //   .then(arrayString => {
    //     // console.log(arrayString);
    //     const retrievedArray = JSON.parse(arrayString);
    //     setdata(retrievedArray);
    //   })
    // }
    
    // useEffect(()=>{
    //  GetNotification();
    // },[])
  
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          // marginTop:"10%",
        }}>
        {/* <StatusBar backgroundColor={'#FFB800'} /> */}
       
        <View
          style={{
            width: "95%",
            height: 30,
            marginTop:20
          }}
        >
                    
      
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-thin-left" size={30} />
          </TouchableOpacity>
        </View>
          
            <Text
              style={{
                fontSize: 19,
                color: '#000000',
                alignSelf: 'center',
                textAlign: 'center',
                // marginTop:30
              }}>
              Notification
            </Text>
      
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    // textAlign:"center"
                    marginTop: 20,
                    paddingHorizontal: 20,
                  }}>
                  {item.Notification}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'grey',
                    paddingHorizontal: 20,
                  }}>
                  {item.time}
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#EEEEEE',
                    marginTop: 10,
                  }}
                />
              </View>
            )}
          />
          
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    zeroContainer: {
      height: 0,
      flex: 0,
    },
    scannedData: {
      alignSelf: 'center',
      marginTop: 20,
      fontSize: 16,
    },
  });