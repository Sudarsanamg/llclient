import React from 'react';
import { SafeAreaView, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import Home from './Pages/Home';
import Layout from './Components/Layout';
import OTPVerification from './Pages/OTPVerification';
import SettingsPage from './Pages/Settings';
import Search from './Pages/Search';
import Message from './Pages/Message';
import Profile from './Pages/Profile';
import Calling from './Pages/Calling';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Call"
          screenOptions={{
            headerShown: false, // Hide headers if not needed
          }}
        >
          <Stack.Screen name="Login" component={ScreenWithoutLayout(Login)} />
          <Stack.Screen name="SignUp" component={ScreenWithoutLayout(SignUp)} />
          <Stack.Screen name="Otpverification" component={ScreenWithoutLayout(OTPVerification)} />
          <Stack.Screen name="Call" component={ScreenWithoutLayout(Calling)} />

          {/* with layout */}
          <Stack.Screen name="Home" component={ScreenWithLayout(Home)} />
          <Stack.Screen name="Settings" component={ScreenWithLayout(SettingsPage)} />
          <Stack.Screen name="Search" component={ScreenWithLayout(Search)} />
          <Stack.Screen name="Message" component={ScreenWithLayout(Message)} />
          <Stack.Screen name="Profile" component={ScreenWithLayout(Profile)} />





        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// Wrapper for screens with the Layout (footer)
function ScreenWithLayout(Component: React.ComponentType) {
  return function WrappedScreen() {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  };
}

// Wrapper for screens without the Layout (footer)
function ScreenWithoutLayout(Component: React.ComponentType) {
  return function WrappedScreen() {
    return <Component />;
  };
}

export default App;
