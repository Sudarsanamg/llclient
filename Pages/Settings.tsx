import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation =useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="green" />
        </TouchableOpacity>
        <Text style={styles.heading}>Settings</Text>
      </View>

      {/* Notification Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Dark Mode Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>

      {/* Account Settings */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Manage Account</Text>
      </TouchableOpacity>

      {/* Privacy Settings */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* Help */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Help & Support</Text>
      </TouchableOpacity>
      
      <View style={styles.deactivate}>
        <Text style={styles.settingText}>Deactivate account</Text>
        <TouchableOpacity >
            <Text style={styles.deactivateButton}>Deactivate</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  header: {
    display:'flex',
    flexDirection:'row',
    marginBottom: 20,
    alignItems:'center',
  },
  heading:{
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:10,
    color:'green'

  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  deactivate:{
    marginTop:15,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  deactivateButton: {
    color: 'red',
    borderStyle: 'dotted', 
    borderColor: 'red',
    borderWidth: 1, 
    padding: 10, 
    borderRadius: 5, 
  },
  
});

export default Settings;
