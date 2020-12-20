import React, { useState } from "react";
import Home from "./Common/Home";
import History from './Common/History'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={
          {header : () => null}
        }/>
        <Stack.Screen name="History" component={History} options={
          {header : () => null}
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
