import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, addTodo, toggleTodo, editTodo } from '../slices.js/todoSlices';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";

const ToDoScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo.items);
  const [searchText, setSearchText] = useState('');
  const { name } = route.params;

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("https://66f5fc36436827ced9759ca6.mockapi.io/todo");
        dispatch(setTodos(response.data));
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    }
    fetchTodos();
  }, [dispatch]);

  const filteredTodos = todo.filter(item => item.todo_name.toLowerCase().includes(searchText.toLowerCase()));

  const handleToggleComplete = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (id) => {
    const item = todo.find(t => t.todo_id === id);
    if (item) {
      const updatedName = prompt("Edit task name", item.todo_name);
      if (updatedName) {
        dispatch(editTodo({ todo_id: id, todo_name: updatedName }));
      }
    }
  };

  const handleAddTodo = () => {
    const newTodoName = prompt("Enter new task name");
    if (newTodoName) {
      dispatch(addTodo({ todo_id: Date.now().toString(), todo_name: newTodoName, completed: false }));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleToggleComplete(item.todo_id)}>
        {item.completed ? (
          <AntDesign name="check" size={16} color="green" />
        ) : (
          <AntDesign name="close" size={16} color="#d3d3d3" />
        )}
      </TouchableOpacity>
      <Text style={styles.todoText}>{item.todo_name}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.todo_id)}>
        <AntDesign name="edit" size={20} color="#e06f70" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi {name || "Twinkle"}</Text>
        <Text style={styles.subHeaderText}>Have a great day ahead</Text>
      </View>

      <View style={styles.searchContainer}>
        <Fontisto style={styles.searchIcon} name="search" size={18} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.todo_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <Pressable style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#888',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#369f5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  editButton: {
    paddingHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#00bdd6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
  },
});

export default ToDoScreen;