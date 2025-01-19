import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const Calling = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const [loading, setLoading] = useState(true); // State to control loading
  const devices = useCameraDevices();
  const device = devices.front; // Properly select front camera from the devices object

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraStatus = await Camera.requestCameraPermission();
      const micStatus = await Camera.requestMicrophonePermission();

      setCameraPermission(cameraStatus === 'authorized');
      setMicrophonePermission(micStatus === 'authorized');
      setLoading(false); // Set loading to false after checking permissions
    };

    checkPermissions();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; // Show loading until permission check is complete
  }

  if (!cameraPermission || !microphonePermission) {
    return <Text>Please grant camera and microphone permissions in your settings.</Text>;
  }

  if (!device) {
    return <Text>Loading camera...</Text>; // Wait for the front camera to load
  }

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Calling;