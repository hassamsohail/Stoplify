import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
    ImageBackground,
    TextInput,
    Modal,
    ActivityIndicator,
    Alert,
} from "react-native";
import React, {useEffect, useState} from "react";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation, useRoute} from "@react-navigation/native";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import {firestore} from "../firebase/firebase";
import {doc_id} from "../SellerScreen/UUID";
import {useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function JobDetail() {
    let navigation = useNavigation();
    let route = useRoute();
    const {
        job_title,
        work_skills,
        experience_level,
        project_scope,
        time_taken,
        budget_status,
        budget_rate,
        job_description,
        Username,
        project_id,
        project_email,
    } = route.params;
    const collectionRef = collection(firestore, "Bids");
    const [loader, setloader] = useState(false);
    const [userRole, setRole] = useState(null);
    let user_id = useSelector((state) => state.counter.user_id);
    //   console.log(project_email);
    const [proposalText, setProposalText] = useState("");


    useEffect(() => {
        onGetUser();
    }, []);

    const onGetUser = async () => {
        const userId = await AsyncStorage.getItem('role');
        if (userId) {
            setRole(userId);
        }
    }

    const Post = async () => {
        const document_id = doc_id();
        const userdocumentref = doc(collectionRef, document_id);
        const userId = await AsyncStorage.getItem('user_id');

        const Data = {
            project_id: project_id,
            bid_id: document_id,
            user_id: userId,
            bid: proposalText,
            job_title: job_title,
            work_skills: work_skills,
            project_scope: project_scope,
            time_taken: time_taken,
            budget_status: budget_status,
            budget_rate: budget_rate,
            job_description: job_description,
            purposal_status: "pending",
            project_owner_email: project_email,
        };

        setDoc(userdocumentref, Data)
            .then(() => {
                Alert.alert("Post Success", "Bid Are Uploaded");
                setloader(false);
                navigation.goBack();
            })
            .catch((error) => {
                console.log(error);
                setloader(false);
                Alert.alert("Opps", "Something went wrong");
            });
    };
    const BidUploaded = () => {
        setloader(true);

        const usersRef = collection(firestore, "Bids");
        const q = query(
            usersRef,
            where("project_id", "==", project_id),
            where("user_id", "==", user_id)
        );
        getDocs(q)
            .then((querySnapshot) => {
                if (querySnapshot.docs.length >= 1) {
                    Alert.alert("Bid", "Purposal Already Submited");
                    setloader(false);
                } else {
                    Post();
                }
            })
            .catch((err) => {
                console.log(err);
                setloader(false);
                Alert.alert("Opps", "Something went wrong");
            });
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            <View style={{width: "95%", height: 30, marginTop: 20}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-thin-left" size={30}/>
                </TouchableOpacity>
            </View>

            <View style={{width: "90%", alignSelf: "center"}}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        alignSelf: "center",
                        // marginTop:15,
                        color: "#000000",

                        marginTop: -30,
                    }}
                >
                    Job Details
                </Text>
                <View style={{height: 30}}/>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#000000",
                        fontWeight: "bold",
                    }}
                >
                    {job_title}
                </Text>

                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 14,
                        color: "#000000",
                        fontWeight: "300",
                    }}
                >
                    Posted 21 hours ago
                </Text>
                <View
                    style={{
                        marginTop: 25,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D9D9D9",
                    }}
                />
                <Text
                    style={{
                        fontSize: 16,
                        marginTop: 10,

                        color: "#000000",
                        // fontWeight: "bold",
                    }}
                >
                    {job_description}
                </Text>
                <View
                    style={{
                        marginTop: 25,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D9D9D9",
                    }}
                />
                <Text
                    style={{
                        fontSize: 15,
                        marginTop: 15,

                        color: "#000000",
                        fontWeight: "500",
                    }}
                >
                    {budget_status}: {budget_rate}
                </Text>
                <View
                    style={{
                        marginTop: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D9D9D9",
                    }}
                />
                <Text
                    style={{
                        fontSize: 15,
                        marginTop: 15,

                        color: "#000000",
                        fontWeight: "500",
                    }}
                >
                    Experience_level: {experience_level}
                </Text>
                <View
                    style={{
                        marginTop: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D9D9D9",
                    }}
                />
                <Text
                    style={{
                        fontSize: 15,
                        marginTop: 15,

                        color: "#000000",
                        fontWeight: "500",
                    }}
                >
                    Project Type: {project_scope}
                </Text>
                <View
                    style={{
                        marginTop: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D9D9D9",
                    }}
                />
                <Text
                    style={{
                        fontSize: 15,
                        marginTop: 15,

                        color: "#000000",
                        fontWeight: "500",
                    }}
                >
                    Skills: {work_skills}
                </Text>
                <View
                    style={{
                        marginTop: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D9D9D9",
                    }}
                />
                {/* <Text style={styles.skill}>{Skill}</Text> */}
                <View style={{height: 25}}/>
                {userRole === 'seller' && <>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        // alignSelf: "center",
                        color: "#000000",
                    }}>Write your Purposal</Text>
                    <View style={styles.proposalTextContainer}>
                        <TextInput
                            style={styles.proposalText}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Write your proposal here..."
                            value={proposalText}
                            onChangeText={(text) => setProposalText(text)}
                        />
                    </View>
                    <Pressable
                        style={{
                            width: 327,
                            marginTop: 20,
                            marginBottom: 50
                        }}
                        onPress={() => {
                            BidUploaded()
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
                                Apply
                            </Text>
                        </ImageBackground>
                    </Pressable>
                </>}


            </View>
            <Modal visible={loader} transparent>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size={"large"} color={"black"}/>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000000",
    },
    subText: {
        fontSize: 14,
        color: "grey",
    },
    jobDetail: {
        fontSize: 16,
        alignSelf: "center",
        color: "#000000",
    },
    proposalTextContainer: {
        borderWidth: 1,
        borderColor: "#EAEAEA",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    proposalText: {
        fontSize: 16,
        color: "#000000",
        height: 70, // Set the height of the TextInput
    },
    skill: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "bold",
    },

    proposalText: {
        fontSize: 16,
        color: "#000000",
    },
    dashboardButton: {
        backgroundColor: "#000000",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: "center",
        alignItems: "center",

        width: "50%",
        marginTop: 20,
        marginBottom: 20,
    },
    dashboardButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
