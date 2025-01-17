// Components/Footer.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity>
        <Icon name="home-outline" size={30} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="search" size={30} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="chatbubbles" size={30} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="person" size={30} color="#4F8EF7" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    backgroundColor: '#333',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Footer;
