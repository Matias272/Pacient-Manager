import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PatientCard from "../components/PatientCard";

const emptyForm = {
  name: "",
  age: "",
  condition: "",
  doctor: "",
  phone: "",
  lastVisit: "",
  notes: "",
};

export default function DashboardScreen({
  patients,
  loading,
  onSelectPatient,
  onCreatePatient,
  onUpdatePatient,
  onDeletePatient,
}) {
  const [formVisible, setFormVisible] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const openCreateForm = () => {
    setEditingPatient(null);
    setFormData(emptyForm);
    setFormVisible(true);
  };

  const openEditForm = (patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name ?? "",
      age: String(patient.age ?? ""),
      condition: patient.condition ?? "",
      doctor: patient.doctor ?? "",
      phone: patient.phone ?? "",
      lastVisit: patient.lastVisit ?? "",
      notes: patient.notes ?? "",
    });
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setEditingPatient(null);
    setFormData(emptyForm);
  };

  const handleSavePatient = async () => {
    const payload = {
      ...formData,
      name: formData.name.trim(),
      condition: formData.condition.trim(),
      doctor: formData.doctor.trim(),
      phone: formData.phone.trim(),
      lastVisit: formData.lastVisit.trim(),
      notes: formData.notes.trim(),
    };

    if (!payload.name) {
      Alert.alert("Missing name", "Please add a patient name.");
      return;
    }

    if (!payload.age || Number.isNaN(Number(payload.age))) {
      Alert.alert("Missing age", "Please enter a valid age.");
      return;
    }

    if (editingPatient) {
      await onUpdatePatient({
        ...editingPatient,
        ...payload,
        age: Number(payload.age),
      });
    } else {
      await onCreatePatient({
        ...payload,
        age: Number(payload.age),
      });
    }

    closeForm();
  };

  const confirmDeletePatient = (patient) => {
    Alert.alert(
      "Delete patient",
      `Remove ${patient.name} from the list?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDeletePatient(patient.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Patient Manager</Text>
          <Text style={styles.subtitle}>Manage the current patient list</Text>
        </View>
        <Pressable style={styles.addButton} onPress={openCreateForm}>
          <Text style={styles.addButtonText}>Add Patient</Text>
        </Pressable>
      </View>
      <Text style={styles.counterText}>Active Patients: {patients.length}</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          style={styles.patientList}
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PatientCard
              patient={item}
              onPress={() => onSelectPatient(item)}
              onEdit={() => openEditForm(item)}
              onDelete={() => confirmDeletePatient(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No patients found</Text>
              <Text style={styles.emptyStateText}>
                Add a patient to get started.
              </Text>
            </View>
          }
        />
      )}

      <Modal visible={formVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editingPatient ? "Edit Patient" : "New Patient"}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Name"
                value={formData.name}
                onChangeText={(value) =>
                  setFormData((current) => ({ ...current, name: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="number-pad"
                value={formData.age}
                onChangeText={(value) =>
                  setFormData((current) => ({ ...current, age: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Condition"
                value={formData.condition}
                onChangeText={(value) =>
                  setFormData((current) => ({ ...current, condition: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Doctor"
                value={formData.doctor}
                onChangeText={(value) =>
                  setFormData((current) => ({ ...current, doctor: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={formData.phone}
                onChangeText={(value) =>
                  setFormData((current) => ({ ...current, phone: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Last visit"
                value={formData.lastVisit}
                onChangeText={(value) =>
                  setFormData((current) => ({ ...current, lastVisit: value }))
                }
              />
              <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Notes"
                multiline
                value={formData.notes}
                onChangeText={(value) =>
                  setFormData((current) => ({ ...current, notes: value }))
                }
              />

              <View style={styles.modalActions}>
                <Pressable style={styles.secondaryButton} onPress={closeForm}>
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.primaryButton} onPress={handleSavePatient}>
                  <Text style={styles.primaryButtonText}>
                    {editingPatient ? "Save Changes" : "Create Patient"}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontFamily: "Petit-Script",
    color: "#2563EB",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 13,
  },
  addButton: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  patientList: {
    paddingHorizontal: 10,
  },
  counterText: {
    textAlign: "center",
    color: "#8E8E93",
    marginBottom: 12,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  emptyStateText: {
    color: "#6B7280",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "92%",
    paddingTop: 20,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    marginBottom: 12,
  },
  notesInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "700",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
