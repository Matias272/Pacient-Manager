import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { PetitFormalScript_400Regular } from "@expo-google-fonts/petit-formal-script";

import MainDashboard from "./src/screens/DashboardScreen";
import PatientDetailsScreen from "./src/screens/PatientDetailsScreen";
import { PatientStorage } from "./src/utils/storage";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Petit-Script": PetitFormalScript_400Regular,
  });
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const loadPatients = async () => {
    setLoadingPatients(true);
    const storedPatients = await PatientStorage.getAll();
    setPatients(storedPatients);
    setLoadingPatients(false);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleCreatePatient = async (patient) => {
    await PatientStorage.create(patient);
    await loadPatients();
  };

  const handleUpdatePatient = async (patient) => {
    const updatedPatient = await PatientStorage.update(patient);
    await loadPatients();

    setSelectedPatient((currentSelected) =>
      currentSelected?.id === updatedPatient.id
        ? updatedPatient
        : currentSelected,
    );
  };

  const handleDeletePatient = async (patientId) => {
    const wasSelected = selectedPatient?.id === patientId;
    const nextPatients = patients.filter((patient) => patient.id !== patientId);

    setPatients(nextPatients);
    await PatientStorage.saveAll(nextPatients);

    if (wasSelected) {
      setSelectedPatient(null);
      setActiveScreen("dashboard");
      return;
    }

    setSelectedPatient((currentSelected) =>
      currentSelected?.id === patientId ? null : currentSelected,
    );
  };

  const handleOpenPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setActiveScreen("details");
  };

  const handleClosePatientDetails = () => {
    setSelectedPatient(null);
    setActiveScreen("dashboard");
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      {activeScreen === "details" && selectedPatient ? (
        <PatientDetailsScreen
          patient={selectedPatient}
          onBack={handleClosePatientDetails}
          onDelete={handleDeletePatient}
        />
      ) : (
        <MainDashboard
          patients={patients}
          loading={loadingPatients}
          onSelectPatient={handleOpenPatientDetails}
          onCreatePatient={handleCreatePatient}
          onUpdatePatient={handleUpdatePatient}
          onDeletePatient={handleDeletePatient}
        />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
  },
});
