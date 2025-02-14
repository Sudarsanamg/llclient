import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";



const CompleteProfile = ({route} :any) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    email: route?.params?.email,
    password: "",
    phoneNumber: "",
    country: "",
    dob: "",
    gender: "",
    image: "",
  });
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [password,setPassword] =useState('');
  const [confrimPassword ,setConfrimPassword] =useState('');


  const handleChange = (field :any, value :any) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 9) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleDateChange = (event:any, selectedDate:any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange("dob", selectedDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        handleChange("image", response.assets[0].uri);
      }
    });
  };

  const handleSubmit =async () => {
    const body = {
      ...userData,
      password: password,
    };
    await axios.post(`${Config.server_domain}/users/create-user`, {
      body,
    }).then((res) => {
      console.log(res.data);
      navigation.navigate('Login');
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'User created successfully!',
      });
    }
    ).catch((error) => {
      console.log(error);
    });

  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
          <Text style={styles.heading}>Enter Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              keyboardType="visible-password"
            />
            <Text style={styles.heading}>Set Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confrimPassword}
              onChangeText={(text) => setConfrimPassword(text)}
              secureTextEntry={true}
            />
          </>
        );
      case 2:
        return (
          <>
          <Text style={styles.heading}>Enter First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={userData.firstName}
              onChangeText={(text) => handleChange("firstName", text)}
            />
            <Text style={styles.heading}>Enter Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={userData.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.heading}>Enter Nick Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Nick Name"
              value={userData.nickName}
              onChangeText={(text) => handleChange("nickName", text)}
            />
          </>
        );
        case 4:
        return (
          <>
            <Text style={styles.heading}>Enter Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={userData.gender}
              onChangeText={(text) => handleChange("gender", text)}
            />
          </>
        );
      // case 4:
      //   return (
      //     <>
      //       <Text style={styles.heading}>Enter Email</Text>
      //       <TextInput
      //         style={styles.input}
      //         placeholder="Email"
      //         value={userData.email}
      //         onChangeText={(text) => handleChange("email", text)}
      //         keyboardType="email-address"
      //       />
      //     </>
      //   );
      case 5:
        return (
          <>
            <Text style={styles.heading}>Enter Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={userData.phoneNumber}
              onChangeText={(text) => handleChange("phoneNumber", text)}
              keyboardType="phone-pad"
            />
          </>
        );
      case 6:
        return (
          <>
            <Text style={styles.heading}>Enter Country</Text>
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={userData.country}
              onChangeText={(text) => handleChange("country", text)}
            />
          </>
        );
      case 7:
        return (
          <>
            <Text style={styles.heading}>Enter Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{userData.dob || "Select Date"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        );
      case 8:
        return (
          <>
            <Text style={styles.heading}>Upload Image</Text>
            {userData.image ? (
              <Image source={{ uri: userData.image }} style={styles.image} />
            ) : (
              <Button title="Pick an Image" onPress={pickImage} />
            )}
          </>
        );
      
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
      <View style={styles.buttonContainer}>
        {step > 1 && <Button title="Previous" onPress={prevStep} />}
        {step > 4 && step < 9 && (
          <Button title="Skip" onPress={handleSubmit} />
        )}
        {step < 8 ? (
          <Button title="Next" onPress={nextStep} />
        ) : (
          <Button title="Submit" onPress={handleSubmit} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
});

export default CompleteProfile;
