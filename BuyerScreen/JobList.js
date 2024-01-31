import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useNavigation } from "@react-navigation/native";

export default function JobList() {
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
    });
  }, []);
  const GetAllDocs = () => {
    getDocs(collection(firestore, "projects"))
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
  };
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
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/Logo.png")}
          style={{
            width: 45,
            height: 45,
          }}
        ></Image>
        <Text
          style={{
            fontSize: 18,
            color: "#000000",
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Jobs
        </Text>
      </View>

      <Image
        source={require("../assets/more.png")}
        style={{
          width: 25,
          height: 25,
        }}
      ></Image>
    </View>
    <View
      style={{
        width: "90%",
        //   marginTop: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          width: "83%",
          borderWidth: 1,
          borderColor: "#E0E0E0",
          height: 46,
          backgroundColor: "#fff",
          borderRadius: 16,
          paddingLeft: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "74%",
          }}
        >
          <Image
            source={require("../assets/Search.png")}
            style={{
              width: 22,
              height: 22,
            }}
          ></Image>

          <TextInput
            style={styles.input}
            onChangeText={(text) => searchFilter(text)}
            placeholderTextColor="#969696"
            value={search}
            placeholder="Search a Jobs"
            autocorrect={false}
            autoCapitalize="none"
          />
          {search !== "" && (
            <TouchableOpacity style={{}} onPress={clearText}>
              <Image
                source={require("../assets/Filled.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 56,
        }}
      >
        <View
          style={{
            marginLeft: 10,
            flexDirection: "row",
            justifyContent: "center",

            alignItems: "center",
            width: "100%",
            height: 46,
            backgroundColor: "#FFD1C1",
            borderRadius: 16,
          }}
        >
          <Image
            source={require("../assets/filter.png")}
            style={{
              width: 18,
              height: 18,
            }}
          ></Image>
        </View>
      </TouchableOpacity>
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
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobDetail", {
                Username: item.user_name,
                project_id: item.doc_id,
                project_email: item.user_email,
                job_title: item.job_title,
                work_skills: item.work_skills,
                project_scope: item.project_scope,
                time_taken: item.time_taken,
                experience_level: item.experience_level,
                budget_status: item.budget_status,
                budget_rate: item.budget_rate,
                job_description: item.job_description,
              })
            }
          >
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginTop: 20,
                //   padding: 20,
              }}
            >
              <View style={{}}></View>
              <Text
                style={{
                  fontSize: 18,
                  color: "#000000",
                  // fontWeight: 'bold',
                }}
              >
                {item.job_title}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "#5B5B5B",
                  // fontWeight:"bold"
                }}
              >
                {item.budget_status}: {item.budget_rate}$ - Est. Time:{" "}
                {item.time_taken}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 16,
                  color: "#5B5B5B",
                  // fontWeight:"bold"
                }}
              >
                {item.job_description}
              </Text>

              <View
                style={{
                  backgroundColor: "#FFD1C1",
                  flexDirection: "row",
                  marginTop: 10,
                  borderRadius: 10,
                  width: "30%",
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#E75E31",
                    // fontWeight:"bold"
                  }}
                >
                  {item.work_skills}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D9D9D9",
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
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
});
