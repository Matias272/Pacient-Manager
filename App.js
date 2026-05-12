import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-web";
import PatientCard from "./src/components/PatientCard";
import DashboardScreen from "./src/screens/DashboardScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <Content />
    </SafeAreaProvider>
  );
}

function Content() {
  const [patients, setPatients] = useState([
    { id: "1", name: "John Doe", age: 45, condition: "Hypertension" },
    { id: "2", name: "Jane Smith", age: 32, condition: "Type 2 Diabetes" },
    {
      id: "3",
      name: "Alex Martinez",
      age: 61,
      condition: "Recovering Post-Op",
    },
    { id: "4", name: "Sarah Connor", age: 29, condition: "Routine Checkup" },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Patient Manager</Text>
      </View>
      <Text style={styles.counterText}>Active Patients: {patients.length}</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PatientCard patient={item} />}
      />
    </SafeAreaView>
  );
}
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
