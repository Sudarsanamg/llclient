// Components/Footer.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation=useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
        <Icon name="home-outline" size={30} style={styles.button} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
        <Icon name="search" size={30} style={styles.button} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Message')}>
        <Icon name="chatbubbles" size={30} style={styles.button} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')} >
        <Icon name="person" size={30} style={styles.button} color="#4F8EF7" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    backgroundColor: '#000',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    borderTopColor:'#009',
    borderWidth:1
  },
  button:{
  paddingLeft:15,
  paddingRight:15,
  }
});

export default Footer;
