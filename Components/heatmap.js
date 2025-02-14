// Heatmap.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Heatmap = ({ data, endDate, numDays }) => {
  // Generate dates for the heatmap
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < numDays; i++) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      dates.unshift(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const dates = generateDates();

  // Get count for each date
  const getCount = (date) => {
    const entry = data.find(item => item.date === date);
    return entry ? entry.count : 0;
  };

  // Determine color based on count
  const getColor = (count) => {
    if (count === 0) return '#ebedf0';
    if (count === 1) return '#c6e48b';
    if (count === 2) return '#7bc96f';
    if (count === 3) return '#239a3b';
    return '#196127';
  };

  return (
    <View>
      <Text>January</Text>
    <View style={styles.container}>
      {dates.map((date, index) => (
        <View key={index} style={[styles.cell, { backgroundColor: getColor(getCount(date)) }]}>
          {/* <Text style={styles.cellText}>{date}</Text> */}
        </View>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 40,
    height: 40,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 10,
    color: '#fff',
  },
});

export default Heatmap;