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

  const activeCount = patients.length;
  const latestPatient = patients[0];

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
    Alert.alert("Delete patient", `Remove ${patient.name} from the list?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDeletePatient(patient.id),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.hero}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.kicker}>Clinic overview</Text>
            <Text style={styles.title}>Patient Manager</Text>
            <Text style={styles.subtitle}>
              A clear, searchable view of your current roster.
            </Text>
          </View>
          <Pressable style={styles.addButton} onPress={openCreateForm}>
            <Text style={styles.addButtonText}>Add Patient</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active</Text>
            <Text style={styles.statValue}>{activeCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Latest</Text>
            <Text style={styles.statValue} numberOfLines={1}>
              {latestPatient ? latestPatient.name : "None"}
            </Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          style={styles.patientList}
          contentContainerStyle={styles.patientListContent}
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
                <Pressable
                  style={styles.primaryButton}
                  onPress={handleSavePatient}
                >
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
    backgroundColor: "#F3F6FB",
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: "#F8FAFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5ECF6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  headerCopy: {
    flex: 1,
    paddingRight: 12,
  },
  kicker: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontFamily: "Petit-Script",
    color: "#0F172A",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: "#0F172A",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5ECF6",
  },
  statLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  statValue: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
  },
  patientList: {
    flex: 1,
  },
  patientListContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
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
