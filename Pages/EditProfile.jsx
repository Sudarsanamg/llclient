import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "react-native-image-picker";
import { useSelector ,useDispatch} from "react-redux";
import { setUser } from '../redux/userSlice';
import axios from "axios";
import Config from "react-native-config";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const EditProfile = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [nickName,setNickName] = useState(user.nickName || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [dob, setDob] = useState(user.dob || "");
  const [gender, setGender] = useState(user.gender || "");
  const [countryCode, setCountryCode] = useState("+91"); // Default India Code
  const [country, setCountry] = useState(user.country || "");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profileImage, setProfileImage] = useState(user.profileImage || null);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
      setDob(user.dob);
      setGender(user.gender);
      setCountry(user.country);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  // Handle Date Picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setDob(date.toISOString().split("T")[0]); // Format YYYY-MM-DD
    }
    hideDatePicker();
  };

  // Handle Image Picker
  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // Handle Form Submission
  const handleSubmit = async() => { 
    let userUuid = user.userUuid;
    let updatedUser = {
      userUuid:userUuid,
      firstName:firstName,
      lastName:lastName,
      phoneNumber:phoneNumber,
      dob:dob,
      gender:gender,
    };

    console.log('updated user',updatedUser);

    try {
  
    const resp= await axios.put(`${Config.server_domain}/users/update-user`, updatedUser);

    console.log("User Updated Successfully");


    dispatch(setUser(updatedUser));

    navigation.goBack();



    // dispatch(setUser(updatedUser));
  } catch (error) {
      console.log(error);
  }




    // dispatch(setUser(updatedUser));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="green" />
      </TouchableOpacity>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Profile Picture Section */}
      <TouchableOpacity style={styles.profileContainer} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.profilePlaceholder}>Tap to Change</Text>
        )}
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#aaa"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#aaa"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nick Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Nick Name"
          placeholderTextColor="#aaa"
          value={nickName}
          onChangeText={setNickName}
        />
      </View>

      {/* Phone Number with Country Code */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneContainer}>
          <Picker
            selectedValue={countryCode}
            onValueChange={(itemValue) => setCountryCode(itemValue)}
            style={styles.countryPicker}
          >
            <Picker.Item label="+91 (IN)" value="+91" />
            <Picker.Item label="+1 (US)" value="+1" />
            <Picker.Item label="+44 (UK)" value="+44" />
            <Picker.Item label="+61 (AU)" value="+61" />
          </Picker>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter Number"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>

      {/* Date of Birth with Calendar Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text style={{ color: dob ? "#fff" : "#aaa" }}>
            {dob ? dob : "Select Date"}
          </Text>
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleConfirm}
          />
        )}
      </View>

      {/* Gender Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#aaa"
          value={country}
          onChangeText={setCountry}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#000", // Dark Theme
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
    fontFamily: "sans-serif-medium",
  },
  profileContainer: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  profilePlaceholder: {
    color: "#aaa",
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  input: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 5,
    padding: 12,
    marginTop: 5,
    color: "#fff",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  phoneContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  countryPicker: {
    width: 100,
    color: "#fff",
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 5,
    marginTop: 5,
  },
  picker: {
    height: 50,
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
});

export default EditProfile;
