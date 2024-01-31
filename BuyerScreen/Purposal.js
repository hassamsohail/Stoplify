
import { View, Text, TextInput, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function Purposal() {
  let navigation = useNavigation()
  const [search, setsearch] = React.useState();
  const [data, setdata] = React.useState([]);
  const [originalData, setoriginalData] = React.useState([]);
  let user_id = useSelector((state) => state.counter.user_id)
  const [loader, setloader] = useState(true)
  const searchFilter = text => {
    if (text) {
      const newdata = Jobs.filter(item => {
        const itemdata = item.bid
          ? item.bid.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemdata.indexOf(textData) > -1;
      });
      setJobs(newdata);
      setsearch(text);
    } else {
      setJobs(tempJobs);
      setsearch(text);
    }
  };
  const [Jobs, setJobs] = useState("");
  const [tempJobs, settempJobs] = useState("");
  const BidUploaded = () => {
    setloader(true)

    const usersRef = collection(firestore, 'Bids');
    const q = query(usersRef,
      where('user_id', '==', user_id)
    );
    getDocs(q).then((querySnapshot) => {
      console.log(querySnapshot.docs.length);
      let temp = []
      querySnapshot.forEach((data) => {
        console.log(data.id);
        temp.push(data.data())
      })
      setJobs(temp)
      settempJobs(temp)

    }).catch(() => {
      setloader(false)
      Alert.alert("Opps", "Something went wrong")

    })

  }
  useEffect(() => {
    navigation.addListener("focus", () => {
      BidUploaded()

    })
  }, [])
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
          height: "6%",
        }}
      />
      <Text
        style=
        {{
          fontSize: 20,
          fontWeight: "bold",
          alignSelf: "center",
          color: "#000000"
        }}
      >

        Purposal Lists
      </Text>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '100%',
            height: 44,
            backgroundColor: '#EEEEEE',
            borderRadius: 8,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>

          <TextInput
            style={styles.input}
            onChangeText={text => searchFilter(text)}
            placeholderTextColor="#969696"
            value={search}
            placeholder="Search Purposal"
            autocorrect={false}
            autoCapitalize="none"
          />
        </View>

      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginBottom: 10,
          height: "80%"
        }}>
        {Jobs.length <= 0 ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>No Data Found</Text>
          </View>

          :



          <FlatList
            data={Jobs}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity

                onPress={() => navigation.navigate("SellerDetail", {

                  JobDetail: item.JobDetail,
                  Username: item.Username,
                  Skill: item.Skills,
                  Bid: item.bid,
                  project_id: item.project_id,
                  user_id: item.user_id,
                  bid_id: item.bid_id,
                  status: item.purposal_status,
                  item:item

                })}
                // onPress={() => navigation.navigate("BidDetail", {

                //   JobDetail: item.JobDetail,
                //   Username: item.Username,
                //   Skill: item.Skills,
                //   Bid:item.bid,
                //   project_id:item.project_id,
                //   user_id:item.user_id,
                //   bid_id:item.bid_id,
                //   status:item.purposal_status
  
                // })}

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
                    {item.bid.slice(0, 50) + "  ..."}
                  </Text>

                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      color: 'red',
                      // fontWeight:"bold"
                    }}>
                    Status of Bid:<Text>  {item.purposal_status}</Text>
                  </Text>




                </View>
              </TouchableOpacity>
            )}
          />
        }
      </View>

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
