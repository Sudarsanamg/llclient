import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

import { sendOtp} from '../api/url-helper';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();


  const verifyEmail = async()=>{
    const response = await axios.get(`${Config.server_domain}/users/verify-user?email=${email}`);
    console.log('*******^&^&*^&&',response)
   if(response.status === 204){
      return false;
    }
    return true;
  };

 const handleCreateAccount = async()=>{
  const user = await verifyEmail();
  if(!user){
    Alert.prompt('user already exists');
  }

  else{
    // setLoading(true);
    // setResend(true);
    try {
        await sendOtp(email).then((response) => {
            console.log(response);
            if (response.status === 201) {
                console.log('OTP sent successfully');
            }
        }).catch((error) => {
            console.log('Error while sending OTP', error);
        });
        navigation.navigate('Otpverification', {email: email});
    } catch (err) {
        console.error('Something went wrong', err);
    } finally {
        // setLoading(false); 
    }
  }
 }

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Continue with Google clicked');
  };

  // const handleForgotPassword = () => {
  //   Alert.alert('Forgot Password', 'Reset password instructions sent to your email');
  // };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={{color:'green',fontSize:32}}>LanguaLink</Text>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create new Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>Already  have an account? Log in</Text>
        </TouchableOpacity>


        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  forgotPasswordText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  orText: {
    marginVertical: 20,
    fontSize: 16,
    color: '#888',
  },
  googleButton: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  signUpText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignUp;