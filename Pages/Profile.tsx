import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <View style={styles.rating}>
          <Icon name="star" size={24} color="gold" />
          <Text style={styles.ratingText}>4.6</Text>
        </View>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2021/03/27/19/25/alone-boy-6129399_1280.jpg',
          }}
          style={styles.profileImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Sudarsanam G</Text>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="create" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.joinedText}>Joined 28 December 2024</Text>
      </View>

      {/* Divider */}
      <View style={styles.hr} />

      {/* Follower Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Followers</Text>
          <Text style={styles.statValue}>28</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Following</Text>
          <Text style={styles.statValue}>56</Text>
        </View>
      </View>

      {/* current strak best streak */}
      <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            borderColor: 'green',
            borderWidth: 2,
            padding: 10,
            marginRight: 10,
            borderRadius: 12,
          }}>
          <View>
            <Text>Best Streak</Text>
          </View>
          <View>
            <Text>28 Days</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            borderColor: 'green',
            borderWidth: 2,
            padding: 10,
            borderRadius: 12,
          }}>
          <View>
            <Text>Current Streak</Text>
          </View>
          <View>
            <Text>28 Days</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background for a modern look
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    marginLeft: 5,
    color: 'gold',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50, // Circular image
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  editButton: {
    backgroundColor: '#444', // Subtle background for the edit button
    borderRadius: 50,
    padding: 5,
  },
  joinedText: {
    fontSize: 14,
    color: '#aaa', // Subtle gray for additional info
  },
  hr: {
    width: '100%',
    backgroundColor: '#fff', // White divider
    height: 1,
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1, // Distribute space equally
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // White text
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Highlighted value
  },
});

export default Profile;
