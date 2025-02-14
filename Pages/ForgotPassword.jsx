import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { sendOtp } from '../api/url-helper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import OTPTextInput from 'react-native-otp-textinput';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  const verifyEmail = async () => {
    try {
      const response = await axios.get(`${Config.server_domain}/users/verify-user?email=${email}`);
      console.log(response);
      if (response.status === 201) {
        Alert.alert('Email not found');
      } else {
        await sendOtp(email);
        Toast.show({ type: 'success', text1: 'OTP Sent', text2: 'Check your email for the OTP.' });
        setStep(2); // Move to OTP step
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to send OTP. Try again later.' });
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      Toast.show({ type: 'error', text1: 'Invalid OTP', text2: 'Enter a valid 4-digit OTP.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${Config.server_domain}/users/verify-otp`, { email, enteredOtp: otp });
      if (response.status === 200) {
        Toast.show({ type: 'success', text1: 'OTP Verified', text2: 'You can now reset your password.' });
        setStep(3); // Move to Reset Password step
      } else {
        Toast.show({ type: 'error', text1: 'Verification Failed', text2: 'Incorrect OTP. Try again.' });
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'OTP verification failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Passwords do not match.' });
      return;
    }

    try {
      const response = await axios.put(`${Config.server_domain}/users/reset-password`, { email, newPassword });
      if (response.status === 200) {
        Toast.show({ type: 'success', text1: 'Password Reset', text2: 'Login with your new password.' });
        navigation.navigate('Login');
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to reset password. Try again.' });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>LanguaLink</Text>
        <Text style={styles.title}>Forgot Password</Text>

        {step === 1 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={verifyEmail}>
              <Text style={styles.buttonText}>Get OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.subtitle}>Enter the 4-digit OTP sent to your email.</Text>
            <OTPTextInput
              inputCount={4}
              handleTextChange={setOtp}
              tintColor="#007bff"
              containerStyle={styles.otpContainer}
              textInputStyle={styles.otpInput}
            />
            <TouchableOpacity
              style={[styles.button, isSubmitting && styles.disabledButton]}
              onPress={handleVerifyOTP}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>{isSubmitting ? 'Verifying...' : 'Verify OTP'}</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        )}

        <Toast />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'black' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  header: { color: 'green', fontSize: 32, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#888', marginBottom: 10 },
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
  buttonText: { fontSize: 18, fontWeight: '600', color: '#fff' },
  disabledButton: { backgroundColor: 'gray' },
  otpContainer: { flexDirection: 'row', justifyContent: 'center' },
  otpInput: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    borderColor: 'green',
    fontSize: 22,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});

export default ForgotPassword;
