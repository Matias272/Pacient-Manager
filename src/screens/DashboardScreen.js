import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PatientCard from "../components/PatientCard";
export default function DashboardScreen() {


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
        style={styles.patientList}
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
    fontFamily: "Petit-Script",
    color: "#2563EB",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  patientList: {
    paddingHorizontal: 10,
    flexDirection: "column",
    gap: 15,
  },
  counterText: {
    textAlign: "center",
    color: "#8E8E93",
    marginBottom: 20,
    fontSize: 14,
  },
});
