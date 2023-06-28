import React, { useEffect, useCallback, useState, useLayoutEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import { Avatar } from "react-native-elements"
import {auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat"
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore"

import COLORS from "../COLORS"

const Chat = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const signOutNow = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((err) => {
      console.error(err)
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{marginLeft: 20}}>
          <Avatar 
            rounded
            source={{
              uri: auth?.currentUser?.photoURL
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={signOutNow}>
          <Text style={{color: "white"}}>Logout</Text>
        </TouchableOpacity>
      )
    })

    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
        snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
        }))
    ));

    return () => {
      unsubscribe();
    };
  }, [navigation])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "hello Developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {_id, createdAt, text, user} = messages[0]

    addDoc(collection(db, "chats"), {_id, createdAt, text, user});
  }, [])

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar {...props} style={{ backgroundColor: 'black' }} />
    );
  };

  return (
    <ImageBackground source={require("../assets/bg.png")} resizeMode="cover" style={styles.bgImage}> 
      <View style={styles.container}>
        <GiftedChat 
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth?.currentUser?.email,
            name: auth?.currentUser?.displayName,
            avatar: auth?.currentUser?.photoURL
          }}
          style={styles.chat}
          renderInputToolbar={props => {
            return (
              <InputToolbar 
                {...props}
                containerStyle={{backgroundColor: "black"}}
                textInputStyle={{color: "white"}}
              />
            )
          }}
          renderBubble={props => {
            return (
              <Bubble 
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: "#FF8933"
                  },
                  left: {
                    backgroundColor: "#FFC700"
                  },
                  
                }}
                
              />
            )
          }}
        />


      </View>
      
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "#fc4903",
  },
  container: {
    backgroundColor: "#000000cc",
    flex: 1,
  },
  bgImage: {
    flex: 1,
  }
})

export default Chat