// src/screens/ToDoScreen.js
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, StatusBar, FlatList, Image, ActivityIndicator } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setTodos } from '../slices.js/todoSlices';

const ToDoScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const { name } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTodo() {
      try {
        const response = await axios.get("https://66f5fc36436827ced9759ca6.mockapi.io/todo");
        console.log("Fetched todos:", response.data); // Log the fetched todos
        dispatch(setTodos(response.data));
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    }
    getTodo();
  }, [dispatch]);

  const addToDo = () => {
    navigation.navigate("AddJob");
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoTextContainer}>
        <AntDesign name="checksquareo" size={24} color="#369f5b" />
        <Text style={styles.todoText}>{item.todo_name}</Text>
      </View>
      <AntDesign name="edit" size={24} color="#e06f70" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: "https://example.com/user-avatar.png" }} style={styles.avatar} />
        <View>
          <Text style={styles.greetingText}>Hi {name}</Text>
          <Text style={styles.subGreetingText}>Have a great day ahead</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Fontisto style={styles.searchIcon} name="search" size={18} color="black" />
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#00bdd6" />
        ) : (
          <>
            {todos.length === 0 ? (
              <Text style={styles.emptyMessage}>No todos available</Text>
            ) : (
              <FlatList
                data={todo}
                keyExtractor={item => item.todo_id.toString()}
                renderItem={renderItem}
              />
            )}
          </>
        )}
        <Pressable style={styles.addButton} onPress={addToDo}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subGreetingText: {
    fontSize: 14,
    color: "#6b6b6b",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9da2ac",
    borderRadius: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d2d5d8",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  todoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  todoText: {
    marginLeft: 20,
  },
  addButton: {
    backgroundColor: "#00bdd6",
    borderRadius: 30,
    padding: 15,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: "#6b6b6b",
    marginTop: 20,
  },
});

export default ToDoScreen;