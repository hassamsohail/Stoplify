/** @format */

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, Image, StyleSheet, Text, ImageBackground } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "./SellerScreen/LoginScreen";
import SignUpScreen from "./SellerScreen/SignUpScreen";
import * as Notifications from "expo-notifications";
import JobList from "./BuyerScreen/JobList";
import Purposal from "./BuyerScreen/Purposal";
import BuyerChat from "./BuyerScreen/BuyerChat";
import More from "./BuyerScreen/More";
import SelectSkill from "./SellerScreen/SelectSkill";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Constants from "expo-constants";
import PostProject from "./BuyerScreen/PortProject";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import JobDetail from "./BuyerScreen/JobDetails";
import Bids from "./BuyerScreen/Bids";
import BidDetail from "./BuyerScreen/BidDetails";
import Tasklist from "./BuyerScreen/Tasklist";
import FileUpload from "./BuyerScreen/FileUpload";
import Chat from "./BuyerScreen/Chat";
import SellerDetail from "./Seller/BidDetails";
import TaskDetail from "./BuyerScreen/TaskDetails";
import Learning_Skill from "./Learning_Skill/Learning_skill";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import DeviceNotificatin from "./BuyerScreen/Notification";
import FQ from "./BuyerScreen/FQ";
import Support from "./BuyerScreen/Support";
import UserChat from "./BuyerScreen/UserChat";

// console.log('Project ID:', projectId);
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SignUpScreen"
              component={SignUpScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Tab"
              component={TabNavi}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SelectSkill"
              component={SelectSkill}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="PostProject"
              component={PostProject}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="JobDetail"
              component={JobDetail}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Bids"
              component={Bids}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="BidDetail"
              component={BidDetail}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SellerDetail"
              component={SellerDetail}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Tasklist"
              component={Tasklist}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="FileUpload"
              component={FileUpload}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Chat"
              component={Chat}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="TaskDetail"
              component={TaskDetail}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Learning"
              component={Learning_Skill}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Notifications"
              component={DeviceNotificatin}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="FQ"
              component={FQ}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Support"
              component={Support}
            />
            <Stack.Screen
              name="UserChat"
              component={UserChat}
              options={({ route }) => ({ title: route.params.username })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const TabNavi = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="JobList"
    >
      <Tab.Screen
        name="JobList"
        component={JobList}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search"}
              size={size}
              color={focused ? "#E75E31" : "#CCCCCC"} // Specify the color for the icon
            />
          ),

          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#E75E31" : "#CCCCCC" }}>Jobs</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Purposal"
        component={Purposal}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name={focused ? "dingding" : "dingding"}
              size={size}
              color={focused ? "#E75E31" : "#CCCCCC"} // Specify the color for the icon
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#E75E31" : "#CCCCCC" }}>
              Proposals
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="BuyerChat"
        component={BuyerChat}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name={focused ? "chat" : "chat"}
              size={size}
              color={focused ? "#E75E31" : "#CCCCCC"}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#E75E31" : "#CCCCCC" }}>
              Chats
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={size}
              color={focused ? "#E75E31" : "#CCCCCC"}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#E75E31" : "#CCCCCC" }}>More</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
