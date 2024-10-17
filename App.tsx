import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false, // Hide headers if not needed
          }}
        >

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          {/* Add other screens here when needed */}


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>


  );
}

export default App;
