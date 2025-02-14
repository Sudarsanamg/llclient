import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const DailyGoalTracker = () => {
  const dailyGoal = 30;
  const completedTime = 30; // Change this value to test different progress

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      let num = (completedTime / dailyGoal) * 100;
      num = Math.round(num);
      setPercentage(num);
    };

    calculatePercentage();
  }, [completedTime]);

  const getEmoji = () => {
    if (percentage === 0) return "😞"; // Sad emoji for 0%
    if (percentage < 50) return "🙂"; // Slight smile for < 50%
    if (percentage < 100) return "😊"; // Happy for 50% - 99%
    return "😎"; // Cool emoji for 100%
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Daily Goal </Text>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.completed, { width: `${percentage}%` }]} />
      </View>

      <Text style={styles.progressText}>
        {percentage}% of {dailyGoal}m Completed {getEmoji()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000",
    padding: 20,
    marginTop:20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  progressBar: {
    width: "80%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  completed: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});

export default DailyGoalTracker;
