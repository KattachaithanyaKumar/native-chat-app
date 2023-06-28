import React, { useState } from "react"
import { View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from "react-native"
import { Input, Button } from "react-native-elements"

import {auth} from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Text } from "react-native"

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState("")

  const clear = () => {
    setName("")
    setEmail("")
    setPassword("")
    setAvatar("")
  }

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      updateProfile(user, {
        displayName: name,
        photoURL: avatar ? avatar : 'https://imechinstitute.com/wp-content/uploads/2022/06/vector.jpeg',
      })
      .then(() => {
        alert("Registered, Please Login")
        clear()
      })
      .catch((err) => {
        alert(err.message);
      })
    })
    .catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
      alert(errMessage);
    })
  }

  return (
    <ImageBackground source={require("../assets/bg.png")} resizeMode="cover" style={styles.bgImage}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>CHAT-FAM</Text>
      <Input 
        placeholder="Enter your name"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <Input 
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <Input 
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      <Input 
        placeholder="Enter your image URL"
        label="Profile Picture"
        value={avatar}
        onChangeText={text => setAvatar(text)}
        style={styles.input}
      />
      {/* <Button title="register" onPress={register} style={styles.button} /> */}
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#000000cc"
  },
  button: {
    width: 370,
    marginTop: 10
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
      color: "white",
      fontSize: 50,
      textAlign: "center",
      fontWeight: "bold",
      paddingBottom: 60,
      // paddingTop: 50,
      // backgroundColor: "red"
  },
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontWeight: "bold",
  },
  input: {
    color: "white",
  }
})

export default RegisterScreen