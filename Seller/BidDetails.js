import { collection, getDoc, getDocs, query, where,updateDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { firestore } from '../firebase/firebase';
import axios from 'axios';
export default function  SellerDetail({ route, navigation }) {
    const { Skill, Bid, project_id, user_id,bid_id,status ,item} = route.params;
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [Username, setUsername] = useState("")
    const [JobDetail, setJobDetail] = useState("")
    const [loader,setloader]=useState(false)
    const [ProjectOwnerEmail,SetProjectOwnerEmail]=useState('')
    const [DashboardCheck,setDashboardCheck]=useState(status)
    console.log("This is Project Id", project_id);
    console.log("This is User Id", user_id);

    const handleButtonPress = (status) => {
        // if(status)==""
        setSelectedStatus(status);
    };
    useEffect(() => {
        GetAllDocs()
    }, [])
    const GetAllDocs = () => {

        getDocs(query(collection(firestore, 'projects'), where('doc_id', '==', project_id)))
            .then((querySnapshot) => {
                //   let temparray = [];
                const doc = querySnapshot.docs[0];
                console.log(doc.data()["user_email"]);
                setUsername(doc.data()["user_name"])
                setJobDetail(doc.data()["description"])
            })
            .catch((err) => {
                console.log(err);
            });

    }
    const SendNotification = (val, title, body) => {
        let data = JSON.stringify({
            "to": val,
            "title": title,
            "body": body
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://exp.host/--/api/v2/push/send',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setloader(false)
            })
            .catch((error) => {
                console.log(error);
                 setloader(false)
                Alert.alert("Error","Something went wrong")
            });

    }

    const AllocateProject = async (token,username,body) => {
      const bidDocRef = doc(firestore, 'Bids',bid_id );
    
      try {
        await updateDoc(bidDocRef, {
          "purposal_status": 'active'
          // Update other fields as needed
        });
        SendNotification(token,username,body);
        
      } catch (error) {
        console.error('Error updating document:', error);
      }
    };
    
    const AllocateProject2 = async (token,username,body) => {
      const bidDocRef = doc(firestore, 'Bids',bid_id );
    
      try {
        await updateDoc(bidDocRef, {
          "purposal_status": 'Rejected'
          // Update other fields as needed
        });
        SendNotification(token,username,body);
        
      } catch (error) {
        console.error('Error updating document:', error);
         setloader(false)
                Alert.alert("Error","Something went wrong")
      }
    };
      
    const Acept = () => {
     setloader(true)
        getDocs(query(collection(firestore, 'user'), where('user_id', '==', user_id)))
            .then((querySnapshot) => {
                //   let temparray = [];
                const doc = querySnapshot.docs[0];
                //   SendNotification(doc.data()["device_token"],doc.data()["user_name"],"You'r Bid are Acepted");
                // console.log(doc.data()[""]);
                // setUsername(doc.data()["user_name"])
                // setJobDetail(doc.data()["description"])
                AllocateProject(doc.data()["device_token"],doc.data()["user_name"],"You'r Bid are Acepted")
            })
            .catch((err) => {
                setloader(false)
                Alert.alert("Error","Something went wrong")
                console.log(err);
            });

    }
       const Reject = () => {

        getDocs(query(collection(firestore, 'user'), where('user_id', '==', user_id)))
            .then((querySnapshot) => {
                //   let temparray = [];
                const doc = querySnapshot.docs[0];
                //   SendNotification(doc.data()["device_token"],doc.data()["user_name"],"You'r Bid are Acepted");
                // console.log(doc.data()[""]);
                // setUsername(doc.data()["user_name"])
                // setJobDetail(doc.data()["description"])
                AllocateProject2(doc.data()["device_token"],doc.data()["user_name"],"You'r Bid are Rejected")
            })
            .catch((err) => {
                console.log(err);
            });

    }
    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                backgroundColor: 'white',
            }}
        >
            <View style={{ width: '95%', height: 30, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-thin-left" size={30} />
                </TouchableOpacity>
            </View>

            <View style={{ width: '90%', alignSelf: 'center' }}>
                <Text style={styles.heading}>Bid Detail</Text>
                <View style={{ height: 30 }} />

                <Text style={styles.subText}>{Username}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.jobDetail}>{JobDetail}</Text>
                <View style={{ height: 20 }} />

                <Text style={styles.skill}>{Skill}</Text>
                <View style={{ height: 30 }} />

                <Text style={styles.heading}>Proposal</Text>
                <View style={styles.proposalTextContainer}>
                    <Text style={styles.proposalText}>
                        {Bid}
                    </Text>
                </View>

                {DashboardCheck=="pending" && (
                    <View  style={{height:100,justifyContent:"center"}}>
                     <Text>Project Status:{'\t'}{DashboardCheck}</Text>
                    </View>
                )}

                {DashboardCheck === 'active' && (
                    <TouchableOpacity
                        style={styles.dashboardButton}
                        // onPress={() => navigation.navigate('Tasklist')}
                        onPress={() => navigation.navigate('Tasklist',{
                            status:false,
                            owner_email:item.project_owner_email,
                            project_id:item.project_id,
                            user_id:user_id
  
  
                          })}
                    >
                        <Text style={styles.dashboardButtonText}>Dashboard</Text>
                    </TouchableOpacity>
                )}

              

            </View>  
            <Modal  visible={loader}  transparent >
   <View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<ActivityIndicator size={"large"}  color={"black"} />
   </View>
            </Modal>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000000',
    },
    subText: {
        fontSize: 14,
        color: 'grey',
    },
    jobDetail: {
        fontSize: 16,
        alignSelf: 'center',
        color: '#000000',
    },
    dashboardButton3: {
        backgroundColor: '#FF0000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: "center",
        width: "50%",
        marginTop: 20,
        marginBottom: 20
    },
    dashboardButtondisable: {
        backgroundColor: 'lightgrey',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: "center",
        width: "50%",
        marginTop: 20,
        marginBottom: 20
    },
    skill: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
    },
    proposalTextContainer: {
        borderWidth: 1,
        borderColor: '#EAEAEA',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    proposalText: {
        fontSize: 16,
        color: '#000000',
    },
    dashboardButton: {
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: "center",

        width: "50%",
        marginTop: 20,
        marginBottom: 20
    },
    dashboardButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});