import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { PostProvider } from "./contexts/PostContext";
import MainScreen from "./screens/MainScreen";
import CreatePostScreen from "./screens/CreatePostScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <PostProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PostProvider>
    </SafeAreaProvider>
  );
};

export default App;
