import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatLabel = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (character) => character.toUpperCase());

export default function PatientDetailsScreen({ patient, onBack, onDelete }) {
  const fields = Object.entries(patient ?? {});

  const confirmDelete = () => {
    Alert.alert("Delete patient", `Remove ${patient.name} from the list?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(patient.id),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <Text style={styles.screenTitle}>Patient Details</Text>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.name}>{patient.name}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>{patient.condition}</Text>
            </View>
            <Text style={styles.heroText}>Age {patient.age}</Text>
          </View>
          <Text style={styles.heroText}>
            All saved patient data is shown below.
          </Text>
          <View style={styles.heroActions}>
            <Pressable style={styles.secondaryButton} onPress={onBack}>
              <Text style={styles.secondaryButtonText}>Close</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={confirmDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.detailsCard}>
          {fields.map(([key, value]) => (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{formatLabel(key)}</Text>
              <Text style={styles.detailValue}>
                {value === null || value === undefined || value === ""
                  ? "-"
                  : String(value)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#0F172A",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E6ECF5",
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  metaPill: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  metaPillText: {
    color: "#075985",
    fontWeight: "800",
  },
  heroText: {
    color: "#64748B",
  },
  heroActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#0F172A",
    fontWeight: "800",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#FFE4E6",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#BE123C",
    fontWeight: "800",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E6ECF5",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  detailRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
});
