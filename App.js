import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Main application component
export default function App() {
  return (
    <SafeAreaProvider>
      <Content />
    </SafeAreaProvider>
  );
}

// Content for the application
function Content() {
  const [testPatientCount, setTestPatientCount] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#0202c7" />

      <View style={styles.header}>
        <Text style={styles.title}>Patient Manager</Text>
      </View>
      <Text style={styles.counterText}>
        Active Patients: {testPatientCount}
      </Text>
    </SafeAreaView>
  );
}
// Styles for the application
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#2563EB",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#0A84FF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  counterText: {
    color: "#8E8E93",
    fontSize: 14,
  },
});
