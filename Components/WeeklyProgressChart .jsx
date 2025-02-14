// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const WeeklyProgressChart = () => {
//   const dailyGoal = 120; // 120 minutes = 2 hours
//   const weeklyProgress = [
//     { day: "Mon", progress: 30 },
//     { day: "Tue", progress: 60 },
//     { day: "Wed", progress: 90 },
//     { day: "Thu", progress: 45 },
//     { day: "Fri", progress: 120 },
//     { day: "Sat", progress: 15 },
//     { day: "Sun", progress: 75 },
//   ];

//   const yAxisLabels = [120, 90, 60, 30, 0]; // Time intervals for Y-axis

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}> Weekly Progress</Text>

//       <View style={styles.chartRow}>
//         {/* Y-Axis Labels */}
//         <View style={styles.yAxis}>
//           {yAxisLabels.map((time, index) => (
//             <View key={index} style={styles.yAxisLabel}>
//               <Text style={styles.yAxisText}>
//                 {time >= 60 ? `${Math.floor(time / 60)}h ${time % 60}m` : `${time}m`}
//               </Text>
//             </View>
//           ))}
//         </View>

//         {/* Chart Bars */}
//         <View style={styles.chartContainer}>
//           {weeklyProgress.map((item, index) => (
//             <View key={index} style={styles.barContainer}>
//               <View
//                 style={[
//                   styles.bar,
//                   { height: `${(item.progress / dailyGoal) * 100}%` },
//                 ]}
//               />
//               <Text style={styles.dayText}>{item.day}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     // backgroundColor: "#0000",
//     padding: 20,
//     marginTop: 20,
//     flex: 1,
//     backgroundColor: "#f9f9f9",

//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 20,
//   },
//   chartRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },
//   yAxis: {
//     justifyContent: "space-between",
//     height: 200,
//     marginRight: 10,
//   },
//   yAxisLabel: {
//     height: 40,
//     justifyContent: "center",
//   },
//   yAxisText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   chartContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     justifyContent: "space-around",
//     width: "80%",
//     height: 200,
//     borderBottomWidth: 2,
//     borderBottomColor: "#ccc",
//     paddingBottom: 10,
//     backgroundColor: "blue",
    
//     marginTop: 10,

//   },
//   barContainer: {
//     alignItems: "center",
//     width: "12%",
//   },
//   bar: {
//     width: 20,
//     borderRadius: 5,
//     backgroundColor: "#4CAF50",
//   },
//   dayText: {
//     marginTop: 5,
//     fontSize: 14,
//     color: "#333",
//     textAlign: "center",
//   },
// });

// export default WeeklyProgressChart;