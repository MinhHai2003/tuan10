// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import GettingStartedScreen from "./components/GettingStartedScreen";
import ToDoScreen from "./components/ToDoScreen";
import AddJob from "./components/AddJob";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="GettingStarted" component={GettingStartedScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ToDo" component={ToDoScreen} />
          <Stack.Screen name="AddJob" component={AddJob} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;