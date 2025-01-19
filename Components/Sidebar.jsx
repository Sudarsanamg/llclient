import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Sidebar = ({onClose}) => {
  const navigation=useNavigation();
  return (
    <View style={styles.sidebar}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        {/* <Text>Profile</Text> */}
        <View>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/6522/6522516.png',
          }}
          style={styles.profile} // Add explicit dimensions
        />
        </View>
        <View>
        <Text>Lvl:25</Text>
      </View>
      </View>
      

      {/* Sidebar Items */}
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem}>
        <Icon name="language" size={25} color="#4F8EF7" />
        <Text style={styles.menuText}>Change Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="time" size={25} color="#4CAF50" />
          <Text style={styles.menuText}>Call History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="person-outline" size={25} color="white" />
          <Text style={styles.menuText}>Contact us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate('Settings')}>
          <Icon name="settings-outline" size={25} color="white" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="log-out-outline" size={25} color="white" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#333',
    padding: 20,
    zIndex: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  menuItems: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  userInfo:{
    display:'flex',
    alignItems:'center'
  },
  profile:{
    height:100,
    width:100,
    borderCurve:50,
  }
});

export default Sidebar;
