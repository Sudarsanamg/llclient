import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Sidebar from '../Components/Sidebar'; // Import Sidebar component
import Icon from 'react-native-vector-icons/Ionicons';
import DailyGoalTracker from '../Components/DailyGoalTracker ';
// import WeeklyProgressChart from '../Components/WeeklyProgressChart ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector ,useDispatch} from "react-redux";
import { setUser } from '../redux/userSlice';




const Home = () => {
  const name = 'Sudarsanam G';
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user);



  useState(async() => {
    const token = await AsyncStorage.getItem('authToken');
    if(!token){
      navigation.navigate('Login');
    }
    const user = await axios.get(`${Config.server_domain}/users/me?token=${token}`);
    dispatch(setUser(user.data.user));    
  }, []);

  return (
    <View style={styles.background}>
      {/* Sidebar */}
      {sidebarVisible && <Sidebar onClose={() => setSidebarVisible(false)} />}
        
       <View style={styles.header}>
      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.menuButton} onPress={() => setSidebarVisible(true)}>
        <Icon name="menu" size={30} color="#4F8EF7" />
      </TouchableOpacity>

      {/* Page Content */}
        <Text style={styles.text}>Hi {user.firstName}</Text>
        <View style={styles.streak}>
        <Icon name="flame" size={30} color="#4F8EF7" />
          <Text style={styles.ageText}>28</Text>
        </View>
      </View>


      <View>
      <DailyGoalTracker />
      </View>


      {/* Content Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Group Call</Text>
        </TouchableOpacity>
      </View>

      {/* <WeeklyProgressChart /> */}
     



    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
  },
  menuButton: {
    margin: 5,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  ageText: {
    color: 'white',
    fontSize: 18,
  },
  button: {
    width: '70%',
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
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:5
  },
  streak:{
    display:'flex',
    flexDirection:'row',
  },
  buttonContainer:{
    marginTop:20,
    display:'flex',
    alignItems:'center',
  }
});

export default Home;
