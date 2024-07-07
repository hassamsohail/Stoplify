
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

export default function Bids() {
  let navigation = useNavigation();
  const [Jobs, SetJobs] = useState([]);
  const [allData, setallData] = useState([]);
  let email = useSelector((state) => state.counter.useremail)

  useEffect(() => {
    navigation.addListener('focus', () => {
      GetAllDocs();
    })
  }, [])
  const GetAllDocs = async() => {
    try {
      const userId = await AsyncStorage.getItem("user_id");

    getDocs(query(collection(firestore, 'Bids'), where('user_id', '==', userId)))
      .then((querySnapshot) => {
        let temparray = [];

        querySnapshot.forEach((doc1) => {
          temparray.push(doc1.data());
        });

        SetJobs(temparray);
        setallData(temparray);
      })
      .catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "95%",
          height: 30,
          marginTop: 20
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

        Bids
      </Text>
{Jobs<=0?
<View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<Text>Data has not Found</Text>
  </View>

:
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginBottom: 10,
          height: "80%"
        }}>
        <FlatList
          data={Jobs}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
      
            <TouchableOpacity
              onPress={() => navigation.navigate("BidDetail", {

                JobDetail: item.JobDetail,
                Username: item.Username,
                Skill: item.Skills,
                Bid:item.bid,
                project_id:item.project_id,
                user_id:item.user_id,
                bid_id:item.bid_id,
                status:item.purposal_status,
                owner_id:item.owner_id

              })}
            >

              <View
                style={{
                  width: '100%',
                  marginBottom: 10
                  ,
                  backgroundColor: '#F1F1F1',
                  borderRadius: 10,
                  marginTop: 10,
                  padding: 20,



                }}>

                <Text
                  style={{
                    fontSize: 17,
                    color: '#000000',
                    // fontWeight: 'bold',
                  }}>
                  {item.bid.slice(0,100)+"..."}
                </Text>

                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    color: '#5B5B5B',
                    // fontWeight:"bold"
                  }}>
                  {item.Username}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    color: '#5B5B5B',
                    // fontWeight:"bold"
                  }}>
                  Status :  {item.purposal_status}
                </Text>
              </View>
            </TouchableOpacity>

          )}
        />
      </View>
}

    </View>
  )
}


const styles = StyleSheet.create({
  activityIndicatorContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  input: {
    // borderWidth: 1,
    borderColor: '#FFB800',
    borderRadius: 5,
    // padding: 10,
    //   margin: 10,

    // height: 53,
    height: 44,

    width: '100%',
    marginLeft: 5,
    color: '#000000',
  },
});