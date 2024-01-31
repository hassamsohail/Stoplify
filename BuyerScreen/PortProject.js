import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  Pressable,
  ImageBackground
} from "react-native"; // Import ScrollView
import React, { useState } from "react";
import FormInput from "../Components/FormInput";
import LoginBtn from "../Components/Loginbtn";
import Entypo from "react-native-vector-icons/Entypo";
import { doc_id } from "../SellerScreen/UUID";
import {
  CollectionReference,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { TextInput } from "react-native-paper";

import { firestore } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function PostProject() {
  let navigation = useNavigation();
  let email = useSelector((state) => state.counter.useremail);
  let username = useSelector((state) => state.counter.username);
  let user_id = useSelector((state) => state.counter.user_id);
  const [PostProject, setPostProject] = React.useState();
  const [Budget, setBudget] = React.useState();
  const [PostProjectDes, setPostProjectDes] = React.useState();
  const collectionRef = collection(firestore, "projects");
  const [loader, setloader] = useState(false);
  const radioOptions = [
    { label: "Android", value: "Android" },
    { label: "Ios", value: "Ios" },
    { label: "Both", value: "Both" },
    // Add more options as needed
  ];
  const Price = [
    { label: "Pay by hours", value: "option1" },
    { label: "Pay Fixed Price", value: "option2" },

    // Add more options as needed
  ];
  const [radioValue, setRadioValue] = useState(radioOptions[0].value);
  const [jobtitle, setjobtitle] = useState('');
  const [workskills, setworkskills] = useState('');
  const [projectscope, setprojectscope] = useState('');
  const [timetaken, settimetaken] = useState('');
  const [experiencelevel, setexperiencelevel] = useState('');
  const [budgetstatus, setbudgetstatus] = useState('');
  const [budgetrate, setbudgetrate] = useState('');
  const [jobdescription, setjobdescription] = useState('');

  //   console.log("This is UUID",doc_id());

  const UploadPost = () => {
    // Validation check for empty fields
    if (!jobtitle || !workskills || !projectscope || !timetaken || !experiencelevel || !budgetstatus || !budgetrate || !jobdescription) {
      Alert.alert("Incomplete Fields", "Please fill in all the fields");
      return;
    }
  
    const document_id = doc_id();
    const userdocumentref = doc(collectionRef, document_id);
  
    const Data = {
      doc_id: document_id,
      job_title: jobtitle,
      work_skills: workskills,
      project_scope: projectscope,
      time_taken: timetaken,
      experience_level: experiencelevel,
      budget_status: budgetstatus,
      budget_rate: budgetrate,
      job_description: jobdescription,
      user_id: user_id,
      user_name: username,
      user_email: email,
    };
  
    setloader(true);
    setDoc(userdocumentref, Data)
      .then(() => {
        Alert.alert("Post Success", "Post Are Uploaded");
        setloader(false);
        navigation.goBack();
      })
      .catch(() => {
        setloader(false);
        Alert.alert("Opps", "Something went wrong");
      });
  };
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          //   alignItems: 'center', // You can change this based on your content alignment needs
          paddingVertical: 20, // Optional, add padding if required
        }}
      >
        <View
          style={{
            width: "95%",
            height: 30,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-thin-left" size={30} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginTop: -30,
            fontWeight: "bold",
            alignSelf: "center",
            marginBottom:20
          }}
        >
          Post a Project
        </Text>
<View
style={{
    width:"90%",
    alignSelf:"center"
}}
>
<View style={{ height: 15 }} />

        <TextInput
            label="Project Title"
            value={jobtitle}
            onChangeText={(jobtitle) => setjobtitle(jobtitle)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
          />
<View style={{ height: 15 }} />
<TextInput
            label="Skills Required"
            value={workskills}
            onChangeText={(workskills) => setworkskills(workskills)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
          />
<View style={{ height: 15 }} />
<TextInput
            label="Project Scope"
            value={projectscope}
            onChangeText={(projectscope) => setprojectscope(projectscope)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
          />
<View style={{ height: 15 }} />
<TextInput
            label="Time Taken"
            value={timetaken}
            onChangeText={(timetaken) => settimetaken(timetaken)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
          />
          <View style={{ height: 15 }} />
<TextInput
            label="Experience Level"
            value={experiencelevel}
            onChangeText={(experiencelevel) => setexperiencelevel(experiencelevel)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
          />
             <View style={{ height: 15 }} />
<TextInput
            label="Budget Status"
            value={budgetstatus}
            onChangeText={(budgetstatus) => setbudgetstatus(budgetstatus)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
          />
             <View style={{ height: 15 }} />
<TextInput
            label="Budget Rate"
            value={budgetrate}
            onChangeText={(budgetrate) => setbudgetrate(budgetrate)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
            keyboardType="numeric"
          />
           <View style={{ height: 15 }} />
<TextInput
            label="Project Description"
            value={jobdescription}
            onChangeText={(jobdescription) => setjobdescription(jobdescription)}
            style={{
              backgroundColor: "rgba(58, 58, 77, 0.1)",
            }}
            underlineColor="transparent" // Active border color
            underlineColorAndroid="rgba(58, 58, 77, 0.1)"
            selectionColor="#E75E31" // Set selection color
            activeUnderlineColor="#E75E31"
            outlineColor="rgba(58, 58, 77, 0.1)"
            textColor="#000000"
          />
     
        <View
          style={{
            height: 30,
          }}
        />
      <Pressable
            style={{
              width: 327,
            }}
            onPress={() => {
            // Signin()
            // navigation.navigate("Tab")
            UploadPost()
            }}
          >
            <ImageBackground
              source={require("../assets/btn.png")}
              style={{
                width: "100%",
                height: 56,

                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
               Project Post
              </Text>
            </ImageBackground>
          </Pressable>
</View>
       

       

      </ScrollView>
      <Modal visible={loader} transparent>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      </Modal>
    </View>
  );
}
