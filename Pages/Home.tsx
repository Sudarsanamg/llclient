import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Sidebar from '../Components/Sidebar'; // Import Sidebar component
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const name = 'Sudarsanam G';
  const [sidebarVisible, setSidebarVisible] = useState(false);

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
        <Text style={styles.text}>Hi {name}</Text>
        <View style={styles.streak}>
        <Icon name="flame" size={30} color="#4F8EF7" />
          <Text style={styles.ageText}>28</Text>
        </View>
      </View>

      {/* Content Buttons */}
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Group Call</Text>
        </TouchableOpacity>
      </View>
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
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:5
  },
  streak:{
    display:'flex',
    flexDirection:'row',
  }
});

export default Home;
