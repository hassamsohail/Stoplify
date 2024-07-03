import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Alert,
    Pressable,
    ImageBackground,
    StyleSheet,
    Image,
    FlatList,
    Dimensions,
} from "react-native"; // Import ScrollView
import AsyncStorage from '@react-native-async-storage/async-storage'; // Updated import

import React, {useState, useRef, useEffect} from "react";
import FormInput from "../Components/FormInput";
import LoginBtn from "../Components/Loginbtn";
import Entypo from "react-native-vector-icons/Entypo";
import {doc_id} from "../SellerScreen/UUID";
import {
    CollectionReference,
    collection,
    doc,
    setDoc,
    updateDoc
} from "firebase/firestore";
import {TextInput} from "react-native-paper";
import {AntDesign, Ionicons} from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons

import {firestore} from "../firebase/firebase";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

const {width} = Dimensions.get("window");
export default function PostProject({route}) {

    const projectId = route?.params ? route?.params?.projectId : null;
    const jobItem = route?.params ? route?.params?.jobItem : null;
    console.log(`-1-------------------------BuyerProjectlist-`);
    console.log(jobItem);

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
        {label: "Android", value: "Android"},
        {label: "Ios", value: "Ios"},
        {label: "Both", value: "Both"},
        // Add more options as needed
    ];
    const Price = [
        {label: "Pay by hours", value: "option1"},
        {label: "Pay Fixed Price", value: "option2"},

        // Add more options as needed
    ];
    const [radioValue, setRadioValue] = useState(radioOptions[0].value);
    const [jobtitle, setjobtitle] = useState(jobItem?.job_title || "");
    const [workskills, setworkskills] = useState("");
    const [projectscope, setprojectscope] = useState("");
    const [timetaken, settimetaken] = useState("");
    const [experiencelevel, setexperiencelevel] = useState("");
    const [budgetstatus, setbudgetstatus] = useState(jobItem?.budget_rate || "");
    const [budgetrate, setbudgetrate] = useState(jobItem?.budget_rate || "");
    const [jobdescription, setjobdescription] = useState(jobItem?.job_description || "");

    //   console.log("This is UUID",doc_id());
    const [selectedTags, setSelectedTags] = useState(jobItem?.work_skills || []);

    const tags = [
        {id: '1', label: 'React Native'},
        {id: '2', label: 'JavaScript'},
        {id: '3', label: 'Expo'},
        {id: '4', label: 'Node.js'},
        {id: '5', label: 'Python'},
        {id: '6', label: 'TypeScript'},
        {id: '7', label: 'CSS'},
        {id: '8', label: 'HTML'},
        {id: '9', label: 'Redux'},
        {id: '10', label: 'GraphQL'},
        {id: '11', label: 'REST API'},
        {id: '12', label: 'SQLite'},
        // Add more tags as needed
    ];
    const handleTagPress = (label) => {
        setSelectedTags((prevSelectedTags) => {
            const newSelectedTags = prevSelectedTags.includes(label)
                ? prevSelectedTags.filter((tagLabel) => tagLabel !== label)
                : [...prevSelectedTags, label];

            // Log the labels of selected tags to the console
            console.log('Selected Labels:', newSelectedTags);

            return newSelectedTags;
        });
    };

    const renderItem = ({item}) => {
        const isSelected = selectedTags.includes(item.label);
        return (
            <TouchableOpacity
                style={[
                    styles.tagView,
                    isSelected && styles.selectedTagView
                ]}
                onPress={() => handleTagPress(item.label)}
            >
                <Text style={[styles.tagText, isSelected && styles.selectedTagText]}>
                    {item.label}
                </Text>
                <View style={styles.iconSpacing}/>
                <Ionicons
                    name={isSelected ? "remove" : "add"}
                    size={24}
                    color={isSelected ? "white" : "black"}
                />
            </TouchableOpacity>
        );
    };
    const RadioButton = ({selected, onPress}) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#1E232C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                }}>
                    {selected ? (
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#1E232C',
                        }}/>
                    ) : null}
                </View>
            </TouchableOpacity>
        );
    };
    const [selectedOption, setSelectedOption] = useState(jobItem?.project_scope || 'Large'); // State to manage selected option

    const handleRadioButtonPress = (option) => {
        setSelectedOption(option);
        console.log("Selected option:", option); // Log selected option to console
    };
    const [selectedOptionmonths, setSelectedOptionmonths] = useState(jobItem?.time_taken || '6months'); // State to manage selected option

    const handleRadioButtonPressmonths = (option) => {
        setSelectedOptionmonths(option);
        console.log("Selected months:", option); // Log selected option to console
    };
    const [selectedOptionrate, setSelectedOptionrate] = useState(jobItem?.budget_status || 'Hourly'); // State to manage selected option

    const handleRadioButtonPressrate = (option) => {
        setSelectedOptionrate(option);
        console.log("Selected rate:", option); // Log selected option to console
    };
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('user_id');
                const userName = await AsyncStorage.getItem('user_name');
                const userEmail = await AsyncStorage.getItem('user_email');

                if (userId !== null) setUserId(userId);
                if (userName !== null) setUserName(userName);
                if (userEmail !== null) setUserEmail(userEmail);
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        fetchData();
    }, []);
    const UploadPost = () => {
        // Validation check for empty fields
        if (
            !jobtitle ||
            !selectedTags ||
            !selectedOption ||
            !selectedOptionmonths ||
            !selectedOptionrate ||
            !budgetrate ||
            !jobdescription
        ) {
            Alert.alert("Incomplete Fields", "Please fill in all the fields");
            return;
        }

        const document_id = projectId || doc_id();
        const userdocumentref = doc(collectionRef, document_id);

        const Data = {
            doc_id: projectId || document_id,
            job_title: jobtitle,
            work_skills: selectedTags,
            project_scope: selectedOption,
            time_taken: selectedOptionmonths,
            budget_status: selectedOptionrate,
            budget_rate: budgetrate,
            job_description: jobdescription,
            user_id: userId,
            user_name: userName,
            user_email: userEmail,
            project_id: projectId || document_id
        };

        setloader(true);
        setCurrentSlideIndex(0);
        setDoc(userdocumentref, Data, {merge: true})
            .then(() => {
                Alert.alert("Post Success", "Post Are Uploaded");
                setloader(false);
                navigation.navigate("BuyerProjectlist");
            })
            .catch(() => {
                setloader(false);
                Alert.alert("Opps", "Something went wrong");
            });
    };
    const scrollViewRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const totalSlides = 5;

    const handleContinue = () => {
        const nextSlideIndex = currentSlideIndex + 1;

        if (nextSlideIndex < totalSlides) {
            scrollViewRef.current.scrollTo({
                x: nextSlideIndex * width,
                animated: true,
            });
            setCurrentSlideIndex(nextSlideIndex);
        } else {
            // Navigate to the login screen when on the last slide
            navigation.navigate("BuyerProjectlist");
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    // paddingVertical: 20, // Optional, add padding if required
                }}
            >
                {/* <View
          style={{
            width: "95%",
            height: 30,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-thin-left" size={30} />
          </TouchableOpacity>
        </View> */}
                <Image
                    source={require("../assets/Logo.png")}
                    style={{
                        width: 113,
                        height: 113,
                        alignSelf: "center",
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("BuyerProjectlist");
                    }}
                >
                    <AntDesign name="closecircleo"
                               size={24} color="black"
                               style={{alignSelf: 'center'}}
                    />
                </TouchableOpacity>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        const newIndex = Math.round(
                            event.nativeEvent.contentOffset.x / width
                        );
                        setCurrentSlideIndex(newIndex);
                    }}
                >
                    <View style={styles.slide}>
                        <View
                            style={{
                                height: 10,
                            }}
                        />
                        <View
                            style={{
                                // backgroundColor:"pink",
                                width: "90%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#666666",
                                }}
                            >
                                1/5 Job Posting
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />

                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "500",
                                    color: "#1E232C",
                                }}
                            >
                                Let’s start with a strong title.
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#8D8D8D",
                                }}
                            >
                                This helps your job post stand out the right candidates. It’s
                                the first thing they’ll see. so make it count!
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
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
                            <View
                                style={{
                                    height: 20,
                                }}
                            />

                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#636363",
                                }}
                            >
                                Example titles
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#636363",
                                }}
                            >
                                {"\u2022 Build responsive Wordpress site with booking/payment"}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#636363",
                                }}
                            >
                                {
                                    "\u2022 Graphic designer needed to design ad creative for multiple campaigns"
                                }
                            </Text>

                            <View
                                style={{
                                    height: 30,
                                }}
                            />
                            <Pressable onPress={handleContinue}>
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
                                        Next
                                    </Text>
                                </ImageBackground>
                            </Pressable>
                        </View>
                    </View>

                    {/* Slider second  */}
                    <View style={styles.slide}>
                        <View
                            style={{
                                height: 10,
                            }}
                        />
                        <View
                            style={{
                                // backgroundColor:"pink",
                                width: "90%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#666666",
                                }}
                            >
                                2/5 Job Posting
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />

                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "500",
                                    color: "#1E232C",
                                }}
                            >
                                What are the main Skills required
                                for your work?
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#8D8D8D",
                                }}
                            >
                                Select your skills
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />

                            <FlatList
                                data={tags}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.listContainer}
                                horizontal={false} // Ensure vertical scrolling
                                numColumns={2} // Number of columns to display, adjust as per your design
                            />

                            <View
                                style={{
                                    height: 30,
                                }}
                            />
                            <Pressable onPress={handleContinue}>
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
                                        Next
                                    </Text>
                                </ImageBackground>
                            </Pressable>
                        </View>
                    </View>
                    {/* Slider Third  */}
                    <View style={styles.slide}>
                        <View
                            style={{
                                height: 10,
                            }}
                        />
                        <View
                            style={{
                                // backgroundColor:"pink",
                                width: "90%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#666666",
                                }}
                            >
                                3/5 Job Posting
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />

                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "500",
                                    color: "#1E232C",
                                }}
                            >
                                Next, estimate the scope of
                                your work.
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#8D8D8D",
                                }}
                            >
                                Consider the size of project and time it will take.
                            </Text>
                            <View
                                style={{
                                    height: 40,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#8D8D8D",
                                }}
                            >
                                Select your Scope
                            </Text>

                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    selected={selectedOption === 'Large'}
                                    onPress={() => handleRadioButtonPress('Large')}
                                />
                                <Text> Large</Text>
                            </View>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    selected={selectedOption === 'Medium'}
                                    onPress={() => handleRadioButtonPress('Medium')}
                                />
                                <Text> Medium</Text>
                            </View>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    selected={selectedOption === 'Small'}
                                    onPress={() => handleRadioButtonPress('Small')}
                                />
                                <Text> Small</Text>
                            </View>
                            <View
                                style={{
                                    height: 20,
                                }}
                            />

                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#8D8D8D",
                                }}
                            >
                                How long will your work take?
                            </Text>

                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    selected={selectedOptionmonths === '6months'}
                                    onPress={() => handleRadioButtonPressmonths('6months')}
                                />
                                <Text> More than 6 months</Text>
                            </View>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    selected={selectedOptionmonths === '3months'}
                                    onPress={() => handleRadioButtonPressmonths('3months')}
                                />
                                <Text> 3 to 6 months</Text>
                            </View>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    selected={selectedOptionmonths === '1months'}
                                    onPress={() => handleRadioButtonPressmonths('1months')}
                                />
                                <Text> 1 to 3 months</Text>
                            </View>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View
                                style={{
                                    height: 30,
                                }}
                            />
                            <Pressable onPress={handleContinue}>
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
                                        Next
                                    </Text>
                                </ImageBackground>
                            </Pressable>
                        </View>
                    </View>
                    {/* Slider Fourth */}
                    <View style={styles.slide}>
                        <View
                            style={{
                                height: 10,
                            }}
                        />
                        <View
                            style={{
                                // backgroundColor:"pink",
                                width: "90%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#666666",
                                }}
                            >
                                4/5 Job Posting
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />

                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "500",
                                    color: "#1E232C",
                                }}
                            >
                                Tell us about your budget.
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#8D8D8D",
                                }}
                            >
                                This will help us match you to talent within your range.
                            </Text>
                            <View
                                style={{
                                    height: 40,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#8D8D8D",
                                }}
                            >
                                Select your rate

                            </Text>

                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    selected={selectedOptionrate === 'Hourly'}
                                    onPress={() => handleRadioButtonPressrate('Hourly')}
                                />
                                <Text> Hourly rate</Text>
                            </View>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    selected={selectedOptionrate === 'Fixed'}
                                    onPress={() => handleRadioButtonPressrate('Fixed')}
                                />
                                <Text> Fixed price</Text>
                            </View>
                            <View
                                style={{
                                    height: 20,
                                }}
                            />
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
                            <View
                                style={{
                                    height: 30,
                                }}
                            />
                            <Pressable onPress={handleContinue}>
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
                                        Next
                                    </Text>
                                </ImageBackground>
                            </Pressable>
                        </View>
                    </View>
                    {/* Slider Five */}
                    <View style={styles.slide}>
                        <View
                            style={{
                                height: 10,
                            }}
                        />
                        <View
                            style={{
                                // backgroundColor:"pink",
                                width: "90%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#666666",
                                }}
                            >
                                5/5 Job Posting
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />

                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "500",
                                    color: "#1E232C",
                                }}
                            >
                                Start the conversation.
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "400",
                                    color: "#8D8D8D",
                                }}
                            >
                                Explain your project here
                            </Text>
                            <View
                                style={{
                                    height: 10,
                                }}
                            />
                            <TextInput
                                label="Describe what you need"
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
                                multiline  // Enable multiline input
                                numberOfLines={6}  // Set the number of visible lines
                            />


                            <View
                                style={{
                                    height: 30,
                                }}
                            />
                            <Pressable
                                onPress={() => {
                                    // Signin()
                                    // navigation.navigate("Tab")
                                    UploadPost();
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
                                        Next
                                    </Text>
                                </ImageBackground>
                            </Pressable>
                        </View>
                    </View>

                </ScrollView>

                <Modal visible={loader} transparent>
                    <View
                        style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                    >
                        <ActivityIndicator size={"large"} color={"black"}/>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    slide: {
        flex: 1,
        alignItems: "center",
        width,
    },
    image: {
        width: 260,
        height: 260,
        marginBottom: 20,
        alignSelf: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 10,
        paddingHorizontal: 30,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#A1A1AC",
        textAlign: "center",
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        // justifyContent: 'space-between',
        // alignItems: 'center',
        justifyContent: "flex-end",
        // alignItems:"flex-end",
        alignSelf: "center",
        width: "90%",
    },
    skipButton: {
        width: "100%",
        // alignItems: 'flex-start',
        borderRadius: 10,
        // margin: 20,
    },
    nextButton: {
        width: "100%",
        // alignItems: 'flex-end',
        borderRadius: 10,
        margin: 20,
    },
    buttonText: {
        color: "#858597",
        fontSize: 14,
        fontWeight: "normal",
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    tagView: {
        height: 37,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        flexDirection: 'row',
        margin: 5,
        backgroundColor: 'white',
    },
    selectedTagView: {
        backgroundColor: 'black',
    },
    tagText: {
        fontSize: 14,
        color: "#000000",
    },
    selectedTagText: {
        color: 'white',
    },
    iconSpacing: {
        width: 10,
    },
});
