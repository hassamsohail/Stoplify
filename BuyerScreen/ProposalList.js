import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs, deleteDoc, doc, getDoc} from "firebase/firestore";
import {firestore} from "../firebase/firebase";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BottomSheet, ListItem} from 'react-native-elements'; // Example library for bottom sheet
import {Ionicons} from '@expo/vector-icons'; // Expo vector icons


export default function ProposalList() {

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
        projectId,
        project_email,
    } = route.params;
    console.warn(projectId);

    const [search, setsearch] = React.useState();
    const [allData, setallData] = useState([]);
    const [data, setdata] = React.useState([]);
    const [originalData, setoriginalData] = React.useState([]);
    let navigation = useNavigation();
    const searchFilter = (text) => {
        console.log(text);
        if (text) {
            const newdata = Jobs.filter((item) => {
                const itemdata = item.description
                    ? item.description.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemdata.indexOf(textData) > -1;
            });
            SetJobs(newdata);
            setsearch(text);
        } else {
            SetJobs(allData);
            console.log(allData);
            setsearch(text);
        }
    };
    const clearText = () => {
        setsearch("");
    };
    const [Jobs, SetJobs] = useState([]);
    useEffect(() => {
        navigation.addListener("focus", () => {
            GetAllDocs();
            GetAllBids();
        });
    }, []);

    /*const GetAllBids = async (projectId, SetJobs) => {
        try {
            const bidsSnapshot = await getDocs(collection(firestore, "Bids"));
            let temparray = [];

            for (const doc1 of bidsSnapshot.docs) {
                const bidData = doc1.data();
                temparray.push(bidData);
                /!*if (bidData.project_id === projectId) {
                    const userRef = doc(firestore, "Users", bidData.user_id);
                    const userSnapshot = await getDoc(userRef);
                    console.warn('User exist: ' + userSnapshot.exists());
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        temparray.push({...bidData, user: userData});
                    }
                }*!/
            }

            console.log("---------------data-");
            console.log(temparray);
            // SetJobs(temparray);
            console.log("---------------end-");
        } catch (err) {
            console.error(err);
        }
    };*/

    const GetAllBids = () => {
        getDocs(collection(firestore, "Bids"))
            .then((querySnapshot) => {
                let temparray = [];

                querySnapshot.forEach((doc1) => {
                    if (
                        doc1?.data()?.project_id === projectId
                    ) {
                        temparray.push(doc1.data());
                        // doc1?.data()?.user_id
                    }
                });

                SetJobs(temparray);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const GetAllDocs = () => {
        getDocs(collection(firestore, "projects"))
            .then((querySnapshot) => {
                let temparray = [];

                querySnapshot.forEach((doc1) => {
                    temparray.push(doc1.data());
                });

                // SetJobs(temparray);
                setallData(temparray);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedJobItem, setSelectedJobItem] = useState(null);

    const openBottomSheet = (item) => {
        setSelectedJobItem(item);
        setBottomSheetVisible(true);
    };

    const closeBottomSheet = () => {
        setBottomSheetVisible(false);
    };
    const removeJobItem = async () => {
        if (selectedJobItem) {
            try {
                await deleteDoc(doc(firestore, 'projects', selectedJobItem.doc_id));
                // Update state to remove the job item from Jobs array
                SetJobs(Jobs.filter(job => job.doc_id !== selectedJobItem.doc_id));
                closeBottomSheet(); // Close bottom sheet after successful removal
            } catch (error) {
                console.error('Error removing document: ', error);
            }
        }
    };
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}
        >

            <Image
                source={require("../assets/Logo.png")}
                style={{
                    width: 113,
                    height: 113,
                    alignSelf: "center"
                }}
            ></Image>
            <View
                style={{
                    flexDirection: "row",
                    width: "90%",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    marginTop: 10,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        // flexDirection: "row",
                        // alignItems: "center",
                    }}
                >

                    <Text
                        style={{
                            fontSize: 22,
                            color: "#000000",
                            fontWeight: "bold",
                            //   marginLeft: 10,
                        }}
                    >
                        {job_title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "400",
                            color: "#8D8D8D",
                        }}
                    >
                        All Proposals
                    </Text>
                </View>

            </View>

            <View
                style={{
                    width: "90%",
                    alignSelf: "center",
                    marginBottom: 10,
                    height: "80%",
                }}
            >
                <FlatList
                    data={Jobs}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (

                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                marginTop: 20,
                                //   padding: 20,
                            }}
                        >
                            <View

                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"

                                }}
                            >

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >


                                    <Image
                                        source={require("../assets/man.png")}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            alignSelf: "center"
                                        }}
                                    ></Image>

                                    <View

                                        style={{
                                            width: 10
                                        }}
                                    />
                                    <View


                                    >

                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: "#000000",
                                                // fontWeight: 'bold',
                                            }}
                                        >
                                            {item?.job_title}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#000000",
                                                // fontWeight: 'bold',
                                            }}
                                        >
                                            hassam sohail
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("UserChat", {
                                        Username: Username,
                                        userId: item?.user_id
                                    })
                                }

                                }>
                                    <View
                                        style={{
                                            width: 87,
                                            height: 38,
                                            borderRadius: 5,
                                            backgroundColor: "#ED6D34",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >

                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: "#fff",
                                                // fontWeight: 'bold',
                                            }}
                                        >
                                            Message
                                        </Text>
                                    </View>


                                </TouchableOpacity>
                            </View>


                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 14,
                                    color: "#5B5B5B",
                                    // fontWeight:"bold"
                                }}
                            >
                                {item?.purposal_status}
                            </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 14,
                                    color: "#5B5B5B",
                                    // fontWeight:"bold"
                                }}
                            >
                                {item?.job_description}
                            </Text>
                            <View
                                style={{
                                    marginTop: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#D9D9D9",
                                }}
                            />
                        </View>

                    )}
                />
            </View>
            <BottomSheet
                isVisible={bottomSheetVisible}
                containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}
            >
                <View style={styles.bottomSheetHeader}>
                    <Text style={styles.bottomSheetTitle}>Select</Text>
                    <TouchableOpacity onPress={closeBottomSheet}>
                        <Ionicons name="close" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
                <ListItem onPress={() => {
                    closeBottomSheet();
                    navigation.navigate('ViewProposals', {projectId: selectedJobItem.doc_id});
                }} containerStyle={{backgroundColor: '#FFFFFF'}}>
                    <ListItem.Content>
                        <ListItem.Title>View Proposals</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem onPress={() => {
                    closeBottomSheet();
                    navigation.navigate('JobDetail', {projectId: selectedJobItem.doc_id});
                }} containerStyle={{backgroundColor: '#FFFFFF'}}>
                    <ListItem.Content>
                        <ListItem.Title>View Job Posting</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem onPress={() => {
                    closeBottomSheet();
                    navigation.navigate('EditPosting', {projectId: selectedJobItem.doc_id});
                }} containerStyle={{backgroundColor: '#FFFFFF'}}>
                    <ListItem.Content>
                        <ListItem.Title>Edit Posting</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem onPress={removeJobItem} containerStyle={{backgroundColor: '#FFFFFF'}}>
                    <ListItem.Content>
                        <ListItem.Title>Remove Posting</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        ...StyleSheet.absoluteFill,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
    },

    input: {
        // borderWidth: 1,
        borderColor: "#FFB800",
        borderRadius: 5,
        // padding: 10,
        //   margin: 10,

        // height: 53,
        height: 44,

        width: "100%",
        marginLeft: 5,
        color: "#000000",
    },
    header: {
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        color: "#000000",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#8D8D8D",
    },
    postButton: {
        height: 48,
        width: 117,
        backgroundColor: "#ED6D34",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    postButtonText: {
        fontSize: 14,
        color: "#fff",
    },
    searchContainer: {
        width: "90%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center",
    },
    searchInputContainer: {
        width: "83%",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        height: 46,
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    searchIcon: {
        width: 22,
        height: 22,
    },
    input: {
        height: 44,
        width: "100%",
        marginLeft: 5,
        color: "#000000",
    },
    clearIcon: {
        width: 20,
        height: 20,
    },
    filterButton: {
        width: 56,
    },
    filterButtonContent: {
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 46,
        backgroundColor: "#FFD1C1",
        borderRadius: 16,
    },
    filterIcon: {
        width: 18,
        height: 18,
    },
    listContainer: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 10,
        height: "80%",
    },
    jobItem: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
    },
    jobItemHeader: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    jobTitle: {
        fontSize: 18,
        color: "#000000",
    },
    menuIcon: {
        width: 20,
        height: 20,
    },
    jobDetails: {
        marginTop: 10,
        fontSize: 13,
        color: "#5B5B5B",
    },
    jobFooter: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    proposals: {
        marginTop: 10,
        fontSize: 16,
        color: "#5B5B5B",
    },
    proposalsText: {
        marginTop: 10,
        fontSize: 16,
        color: "#5B5B5B",
    },
    hired: {
        marginTop: 10,
        fontSize: 16,
        color: "#5B5B5B",
    },
    separator: {
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
