import React from "react"
import { SafeAreaView, View, Text, Pressable, StyleSheet, StatusBar, Image, TextInput } from "react-native"
import axios from "axios";

const AddJob = ( {navigation} ) => {
  const [typeJob, setTypeJob] = React.useState("")

  const clickUpdate = async () => {
    await axios({
      method: 'post',
      url: 'https://66f5fc36436827ced9759ca6.mockapi.io/todo',
      data: {
        todo_id: Date.now(),
        todo_name: typeJob
      }
    });

    navigation.goBack()    
  }

  return <SafeAreaView style={style.container}>
    <View style={style.item}>
      <View style={{marginTop: 56}}>
        <Text style={style.title}>ADD YOUR JOB</Text>
      </View>
      <View style={{display: "flex", flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#9da2ac", borderRadius: 5, marginTop: 32, width: "100%"}}>
        <Entypo name="text-document" size={24} color="green" style={{marginLeft: 10}}/>
        <TextInput style={{marginLeft: 10, width: "100%", height: "100%", padding: 10}} placeholder="Input your job" onChange={(e) => setTypeJob(e.target.value)} value={typeJob} />
      </View>
      <View style={{marginTop: 20, backgroundColor: "#00bdd6", borderRadius: 10}}>
        <Pressable onPress={() => clickUpdate()}>
          <Text style={{color: "white", fontSize: 15, padding: 6, paddingLeft: 50, paddingRight: 50}}>FINISH -></Text>
        </Pressable>
      </View>
    </View>
    <View style={[style.item, style.footer]}>
      <Image source={require("../assets/logo.png")} style={{width: 129, height: 129}}/>
    </View>
  </SafeAreaView>
}

export default AddJob

const style = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: StatusBar.currentHeight
  },
  item: {
    width: "90%",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 30
  },
  footer: {
    marginTop: 100
  }
})