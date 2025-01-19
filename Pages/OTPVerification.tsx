import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigation();


  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter a valid 6-digit OTP.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock backend verification logic
      const isValidOTP = otp === '123456'; // Replace with actual API call
      if (isValidOTP) {
        Toast.show({
          type: 'success',
          text1: 'Success!',
          text2: 'OTP Verified Successfully!',
        });
        // Navigate to the next page
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: 'Incorrect OTP. Please try again.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred during verification.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to your Email.
      </Text>

      {/* OTP Input Field */}
      <OTPTextInput
        inputCount={4}
        handleTextChange={(text) => setOtp(text)}
        tintColor="#007bff"
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
      />

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.disabledButton]}
        onPress={handleVerifyOTP}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </Text>
      </TouchableOpacity>

      {/* Toast Message */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  otpContainer: {
    marginBottom: 20,
  },
  otpInput: {
    borderBottomWidth: 2,
    fontSize: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPVerification;
