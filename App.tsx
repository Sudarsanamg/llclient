import React from 'react';
import { SafeAreaView } from 'react-native';
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
import CompleteProfile from './Pages/CompleteProfile';
import ForgotPassword from './Pages/ForgotPassword';
import EditProfile from './Pages/EditProfile';
import { Provider } from "react-redux";
import store from './redux/store';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Hide headers if not needed
          }}
        >
          <Stack.Screen name="Login" component={ScreenWithoutLayout(Login)} />
          <Stack.Screen name="SignUp" component={ScreenWithoutLayout(SignUp)} />
          <Stack.Screen name="Otpverification" component={ScreenWithoutLayout(OTPVerification)} />
          <Stack.Screen name="CompleteProfile" component={ScreenWithoutLayout(CompleteProfile)} />
          <Stack.Screen name="ForgotPassword" component={ScreenWithoutLayout(ForgotPassword)} />
          <Stack.Screen name="EditProfile" component={ScreenWithoutLayout(EditProfile)} />


          {/* with layout */}
          <Stack.Screen name="Home" component={ScreenWithLayout(Home)} />
          <Stack.Screen name="Settings" component={ScreenWithLayout(SettingsPage)} />
          <Stack.Screen name="Search" component={ScreenWithLayout(Search)} />
          <Stack.Screen name="Message" component={ScreenWithLayout(Message)} />
          <Stack.Screen name="Profile" component={ScreenWithLayout(Profile)} />

          





        </Stack.Navigator>
      </NavigationContainer>
      </Provider>

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
  return function WrappedScreen(props: any) {
    return <Component {...props} />;
  };
}


export default App;
