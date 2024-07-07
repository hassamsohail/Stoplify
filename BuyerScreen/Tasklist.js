
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation, useRoute } from '@react-navigation/native';
import FormInput from '../Components/FormInput';
import LoginBtn from '../Components/Loginbtn';
import { doc_id } from '../SellerScreen/UUID';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

function Tasklist() {
  const [focusedTab, setFocusedTab] = useState('Dashboard');
  let route=useRoute()
  const {status,owner_email,project_id,user_id}=route.params
  const [loader,setloader]=useState(false)
  const [Task,SetTask]=useState("")
  console.log("This is Status"+status);
  console.log("This is Owner:"+owner_email);
  console.log("This is Project Id:"+project_id);
  console.log("This user place the bid:"+user_id);
  let navigation=useNavigation();
  const [Jobs,SetJobs]=useState("")
  const collectionRef = collection(firestore, 'tasklist');
  const BidUploaded = () => {
    setloader(true)

    const usersRef = collection(firestore, 'tasklist');
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

  const UploadPost = () => {
    const document_id = doc_id()
    const userdocumentref = doc(collectionRef, document_id)

    const Data = {
        "doc_id": document_id,
        "project_id": project_id,
        "user_id": user_id,
        "project_owner_email": owner_email,
        "task":Task,
        "task_status":"pending"
    }
    setloader(true)
    setDoc(userdocumentref,Data).then(()=>{
        Alert.alert("Post Success","Task Are Uploaded")
        setloader(false)
        navigation.goBack();
    }).catch(()=>{
        setloader(false)
        Alert.alert("Opps","Something went wrong")

    })


}
useEffect(()=>{
    navigation.addListener("focus",()=>{

        BidUploaded()
    })
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
            marginLeft:5
          }}
        >
                    
      
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-thin-left" size={30} />
          </TouchableOpacity>
          </View>
     
    <Text
    style=
    {{
      fontSize:20,
      fontWeight:"bold",
      alignSelf:"center",
      color:"#000000"
    }}
    >

Tasklist
    </Text> 


    <FormInput
                    // style={styles.input}
                    onChangeText={(PostProject) => SetTask(PostProject)}
                    // value={text}
                    labelValue={Task}
                    // secureTextEntry={true}
                    // keyboardType="email-address"
                    placeholder="Write Task"
                    autoCapitalize="none"
                    autocorrect={false}
                />
    <View
        style={{
          width: '90%',
          alignSelf: 'center',
        marginBottom:10,
        height:"80%"
        }}>
        <FlatList
          data={Jobs}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <>
            <TouchableOpacity
            onPress={() => navigation.navigate("TaskDetail",{
                Tasktitle:item.task,
                Task_id:item.doc_id
            })}
            
            >

            <View
              style={{
                width: '100%',
        marginBottom:10
             ,
                backgroundColor: '#F1F1F1',
                borderRadius: 10,
                marginTop: 10,
                padding:20,
              
               
         
              }}>
            
                <Text
                  style={{
                    fontSize: 17,
                    color: '#000000',
                    // fontWeight: 'bold',
                  }}>
                  {item.task}
                </Text>
              
                
                
                 
            
            </View>
            </TouchableOpacity>
            <View  style={{left:10}}>
                 <Text>Task Status:{item.task_status}</Text>

            </View>
            {/* <Text></Text> */}
            </>

          )}
        />
{status?



        <TouchableOpacity style={{height:50,alignItems:"center"}}
        
        onPress={UploadPost}
        >
     
        <LoginBtn
            color="#003399"
            textcolor="#fff"
            textfontsize={23}
            name="Add Task"
            />
         
          </TouchableOpacity>:null

}
          <View  style={{height:40}} />
      </View>



      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 10,
          // postion:"absoulte",
          width:"100%",
          position:"absolute",
          bottom: 0, 
          backgroundColor: '#ffffff', // Customize tab bar background color
        }}
      >
        <TouchableOpacity 
        
        onPress={() => navigation.navigate('Tasklist',{
            status:  status,
            owner_email:owner_email,
            project_id:project_id,
            user_id:user_id
        
          })}
        
        style={{ alignItems: 'center' }}>
          <Ionicons
            name={focusedTab === 'Dashboard' ? 'ios-list' : 'ios-list'}
            size={24}
            color={focusedTab === 'Dashboard' ? '#000000' : '#000000'}
          />
          <Text style={{ color: focusedTab === 'Dashboard' ? '#000000' : '#000000' }}>Tasklist</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity 
//         onPress={() =>{

// // navigation.navigate("Chat")

//       }} 
onPress={() => navigation.navigate('Chat',{
    status:  status,
    owner_email:owner_email,
    project_id:project_id,
    user_id:user_id

  })}
      
      style={{ alignItems: 'center' }}>
          <Ionicons
            name={focusedTab === 'BuyerChat' ? 'chatbubble' : 'chatbubble'}
            size={24}
            color={focusedTab === 'BuyerChat' ? '#000000' : '#000000'}
          />
          <Text style={{ color: focusedTab === 'BuyerChat' ? '#000000' : '#000000' }}>Chat</Text>
        </TouchableOpacity> */}

        <TouchableOpacity 
      onPress={() => navigation.navigate('FileUpload',{
        status:  status,
        owner_email:owner_email,
        project_id:project_id,
        user_id:user_id
    
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
      <Modal  visible={loader}   transparent>
        <View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<ActivityIndicator  size={"large"}  color={"black"} />
        </View>

      </Modal>
    </View>
  );
}

export default Tasklist;