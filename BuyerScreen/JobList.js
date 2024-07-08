import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  ScrollView,
  RefreshControl
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons"; // Expo vector icons

export default function JobList() {

  const [search, setsearch] = useState("");
  const [allData, setallData] = useState([]);
  const [data, setdata] = useState([]);
  const [originalData, setoriginalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for RefreshControl

  let navigation = useNavigation();

  const searchFilter = (text) => {
    if (text) {
      const newdata = Jobs.filter((item) => {
        const itemdata = item.job_title
          ? item.job_title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemdata.indexOf(textData) > -1;
      });
      SetJobs(newdata);
      setsearch(text);
    } else {
      SetJobs(allData);
      setsearch(text);
    }
  };


  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    { id: '1', label: 'React Native' },
    { id: '2', label: 'JavaScript' },
    { id: '3', label: 'Expo' },
    { id: '4', label: 'Node.js' },
    { id: '5', label: 'Python' },
    { id: '6', label: 'TypeScript' },
    { id: '7', label: 'CSS' },
    { id: '8', label: 'HTML' },
    { id: '9', label: 'Redux' },
    { id: '10', label: 'GraphQL' },
    { id: '11', label: 'REST API' },
    { id: '12', label: 'SQLite' },
    // Add more tags as needed
  ];

  const renderItem = ({ item }) => {
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
        <View style={styles.iconSpacing} />
        <Ionicons
          name={isSelected ? "remove" : "add"}
          size={24}
          color={isSelected ? "white" : "black"}
        />
      </TouchableOpacity>
    );
  };
  const [Jobs, SetJobs] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      GetAllDocs();
    });
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
     GetAllDocs();
    setRefreshing(false);
  }, []);
  const GetAllDocs = () => {
    const skills = ["React Native", "CSS"];

    // Construct Firestore query
    const q = query(collection(firestore, "projects"), where("work_skills", "array-contains-any", skills));

    getDocs(q)
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
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../assets/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Jobs</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <View style={styles.searchInputSubContainer}>
            <Image
              source={require("../assets/Search.png")}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => searchFilter(text)}
              placeholderTextColor="#969696"
              value={search}
              placeholder="Search a Jobs"
              autocorrect={false}
              autoCapitalize="none"
            />
        
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
          <View style={styles.filterContainer}>
            <Image
              source={require("../assets/filter.png")}
              style={styles.filterIcon}
            />
          </View>
        </TouchableOpacity> */}
      </View>
      <ScrollView>

        <View style={styles.listContainer}>
          <FlatList
            data={Jobs}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ marginBottom: 10, width:350 }}
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
                    owner_id: item.user_id
                  })
                }
              >
                <View style={styles.jobContainer}>
                  <Text style={styles.jobTitle}>{item.job_title}</Text>
                  <Text style={styles.jobDetails}>
                    {item.budget_status}: {item.budget_rate}$ - Est. Time: {item.time_taken}
                  </Text>
                  <Text style={styles.jobDescription}>{item.job_description}</Text>
                  <View style={styles.skillsContainer}>
                    {item.work_skills.map((skill, index) => (
                      <View key={index} style={styles.skill}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.separator} />
                </View>
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#ED6D34"]}
              />
            }
          />
        </View>
        <View
          style={{ bottom: 100 }}
        />
      </ScrollView>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Search Filter</Text>
            <View style={styles.modalButtons}>

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


              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Apply" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchContainer: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
  },
  searchInputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  input: {
    borderColor: "#FFB800",
    borderRadius: 5,
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
  filterContainer: {
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
  jobContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  jobTitle: {
    fontSize: 18,
    color: "#000000",
  },
  jobDetails: {
    marginTop: 10,
    fontSize: 13,
    color: "#5B5B5B",
  },
  jobDescription: {
    marginTop: 10,
    fontSize: 16,
    color: "#5B5B5B",
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  skill: {
    backgroundColor: "#FFD1C1",
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 10,
    width: "30%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  skillText: {
    fontSize: 12,
    color: "#E75E31",
  },
  separator: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

