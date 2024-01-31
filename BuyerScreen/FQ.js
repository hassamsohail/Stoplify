import { View, Text , FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import Entypo from "react-native-vector-icons/Entypo";

export default function FQ({navigation}) {
  const FQs = [
    {
      Answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      Question: 'What is your Question? ',


    },
    {
      Answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      Question: 'What is your Question? ',



  
    },
    {
      Answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      Question: 'What is your Question? ',


      
    },
    {
      Answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      Question: 'What is your Question? ',


  
    },
    {
      Answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      Question: 'What is your Question? ',


      
    },
    {
      Answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      Question: 'What is your Question? ',


  
    },
    {
      Answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      Question: 'What is your Question? ',



      
    },
    {
      Answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      Question: 'What is your Question? ',


  
    },
  
  ];
  return (
    <View
    style={{
      flex: 1,
    alignItems:"center",
      backgroundColor: "white",
    }}
  >
 <View
          style={{
            width: "95%",
            height: 30,
            marginTop:20
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

  F&Q's
    </Text>
    <View
        style={{
          width: '90%',
          alignSelf: 'center',
        marginBottom:10,
        height:"80%"
        }}>
        <FlatList
          data={FQs}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
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
                  {item.Question}
                </Text>
              
                  <Text
                    style={{
                      marginTop:10,
                      fontSize: 15,
                      color: '#5B5B5B',
                      // fontWeight:"bold"
                    }}>
                    {item.Answer}
                  </Text>
                 
                
                  <Text
                    style={{
                      marginTop:10,
                      fontSize: 15,
                      color: '#5B5B5B',
                      // fontWeight:"bold"
                    }}>
                    {item.Skills}
                  </Text>
                 
            
            </View>
          )}
        />
      </View>
    </View>
  )
}