import { View, Text , TouchableOpacity,Image,StyleSheet , FlatList} from 'react-native'
import React from 'react'
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from 'react-redux';

export default function More({navigation}) {
  let email=useSelector((state)=>state.counter.useremail)
  let username=useSelector((state)=>state.counter.username)
  let user_id=useSelector((state)=>state.counter.user_id)
  console.log(user_id);
  return (
    <View
    style={{
      flex: 1,
    alignItems:"center",
      backgroundColor: "white",
    }}
  >
 <View style={{
 height: "6%",
          }}
        />
 <View
          style={{
            width: '90%',
            alignSelf: 'center',
            // marginLeft:20
          }}>
          <View
            style={{
              height: 10,
            }}
          />
           <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-thin-left" size={30} />
          </TouchableOpacity>

          
      

        
 <Image
  style={{
    height:90,
    width:90,
    alignSelf:"center"
  }}
  source={require("../assets/Username.png")}
  />
    <View
            style={{
              height: 10,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              color: '#3F3F3F',
              textAlign: 'center',
              paddingHorizontal: 30,
            }}>
         {username}
          </Text>

          <View
            style={{
              height: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => {
             navigation.navigate("PostProject")
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent:"center"
                }}>
                
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginLeft: 20,
                  }}>
              Post a Project
                </Text>
              </View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../assets/Left.png')}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 10,
            }}
          />

          <View
            style={{
              // borderWidth:1,
              borderBottomWidth: 1,
              borderBottomColor: '#000000',
              opacity: 0.1,
            }}
          />
          <View
            style={{
              height: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              // openSMSApp();
              navigation.navigate("Learning");
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent:"center"
                }}>
              
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginLeft: 20,
                  }}>
                 Learn a Skill
                </Text>
              </View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../assets/Left.png')}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 10,
            }}
          />
          <View
            style={{
              // borderWidth:1,
              borderBottomWidth: 1,
              borderBottomColor: '#000000',
              opacity: 0.1,
            }}
          />
          <View
            style={{
              height: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              // onShare();
              navigation.navigate("Bids")
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent:"center"
                }}>
             
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginLeft: 20,
                  }}>
                 Bids Of Projects
                </Text>
              </View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../assets/Left.png')}
              />
            </View>
          </TouchableOpacity>
     
          <View
            style={{
              height: 10,
            }}
          />

          <View
            style={{
              // borderWidth:1,
              borderBottomWidth: 1,
              borderBottomColor: '#000000',
              opacity: 0.1,
            }}
          />
          <View
            style={{
              height: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              // copyToClipboard()
              navigation.navigate("Notifications")
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent:"center"
                }}>
                
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginLeft: 20,
                  }}>
                 Notifications
                </Text>
              </View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../assets/Left.png')}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 10,
            }}
          />

          <View
            style={{
              // borderWidth:1,
              borderBottomWidth: 1,
              borderBottomColor: '#000000',
              opacity: 0.1,
            }}
          />
          <View
            style={{
              height: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              // onShare();
              navigation.navigate("FQ")
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent:"center"
                }}>
                {/* <Image
                  style={{
                    height: 35,
                    width: 35,
                  }}
                  source={require('../assest/More.png')}
                /> */}
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginLeft: 20,
                  }}>
                  F&Q's
                </Text>
              </View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../assets/Left.png')}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 10,
            }}
          />
          
          <View
            style={{
              // borderWidth:1,
              borderBottomWidth: 1,
              borderBottomColor: '#000000',
              opacity: 0.1,
            }}
          />
          <View
            style={{
              height: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              // onShare();
              navigation.navigate("Support")

            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
               
                }}>
              
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginLeft: 20,
                  }}>
                  Support 
                </Text>
              </View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../assets/Left.png')}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 10,
            }}
          />
          {/* <View
            style={{
              // borderWidth:1,
              borderBottomWidth: 1,
              borderBottomColor: '#000000',
              opacity: 0.1,
            }}
          />
          <View
            style={{
              height: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              // onShare();
              navigation.navigate("About")

            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent:"center"
                }}>
             
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginLeft: 20,
                  }}>
                 About
                </Text>
              </View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../assets/Left.png')}
              />
            </View>
          </TouchableOpacity>
          */}
        </View>
        
      
    </View>
  )
}


const styles = StyleSheet.create({
  activityIndicatorContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  input: {
    // borderWidth: 1,
    borderColor: '#FFB800',
    borderRadius: 5,
    // padding: 10,
    //   margin: 10,

    // height: 53,
    height: 44,

    width: '100%',
    marginLeft: 5,
    color: '#000000',
  },
});