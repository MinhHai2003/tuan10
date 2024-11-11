import React from "react"
import { SafeAreaView, View, Text, TextInput, Pressable, StatusBar, StyleSheet, Image } from "react-native"
import Fontisto from '@expo/vector-icons/Fontisto';

const GettingStartedScreen = ( {navigation}) => {
  
  const [name, setName] = React.useState("");

  const directToMainScreen = () => {
    navigation.navigate("ToDo", { name: name });
  }

  return <SafeAreaView style={style.container}>
    <View style={style.item}>
      <View style={{width: 258, height: 258}}>
        <Image source={require("../assets/logo.png")} style={{width: 258, height: 258}} />
      </View>
    </View>
    <View style={style.item}>
      <Text style={style.title}>MANAGE YOUR TASK</Text>
    </View>
    <View style={style.item}>
      <View style={style.input}>
        <Fontisto style={{paddingLeft: 10}} name="email" size={24} color="black" />
        <TextInput style={{width: "70%", marginLeft: 10}} placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
      </View>
    </View>
    <View style={style.item}>
      <Pressable style={style.button} onPress={() => directToMainScreen()}>
        <Text style={{color: "white"}}>GET STARTED -></Text>
      </Pressable>
    </View>
  </SafeAreaView>
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
  },
  item: {
    width: "90%",
    alignItems: "center",
    marginTop: 40
  },
  title: {
    color: "#8353e2",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    width: 145
  },
  input: {
    borderWidth: 1,
    borderColor: "#9da1ac",
    borderRadius: 5,
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center"
  },  
  button: {
    borderRadius: 5,
    backgroundColor: "#00bdd6",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5
  }
})

export default GettingStartedScreen;