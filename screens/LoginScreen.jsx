import React, { useState } from "react"
import { View, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native"
import { Input } from "react-native-elements"
import {auth} from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import Icon from "react-native-vector-icons/FontAwesome"
import { Text } from "react-native"
import { ImageBackground } from "react-native"

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openRegisterScreen = () => {
    navigation.navigate("Register")
  }

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      navigation.navigate("Chat")
    })
    .catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
      alert(errMessage)
    })
  }

  return (
    <ImageBackground source={require("../assets/bg.png")} resizeMode="cover" style={styles.bgImage}>
      <View style={styles.container}>
        <Text style={styles.title}>CHAT-FAM</Text>
        <Input
          placeholder="Enter your Email"
          label="Email"
          leftIcon={{type: "material", name: "email", color: "white"}}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Input 
          placeholder="Enter your password"
          label="Password"
          leftIcon={{type: "material", name: "lock", color: "white"}}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />

        {/* <View>
          <Button title="Sign In" style={styles.button} onPress={signin} />
          <Button title="Register" onPress={openRegisterScreen} />
        </View> */}

        <TouchableOpacity style={styles.button} onPress={signin}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openRegisterScreen}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      // alignItems: 'center',
      padding: 20,
      paddingTop: 100,
      backgroundColor: "#000000cc",
      flex: 1,
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
    },
    bgImage: {
      flex: 1,
      // justifyContent: "center"
    }
});

export default LoginScreen