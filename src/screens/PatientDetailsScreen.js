import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatLabel = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (character) => character.toUpperCase());

export default function PatientDetailsScreen({ patient, onBack }) {
  const fields = Object.entries(patient ?? {});

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
          <Text style={styles.condition}>{patient.condition}</Text>
          <Text style={styles.heroText}>All saved patient data is shown below.</Text>
        </View>

        <View style={styles.detailsCard}>
          {fields.map(([key, value]) => (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{formatLabel(key)}</Text>
              <Text style={styles.detailValue}>
                {value === null || value === undefined || value === "" ? "-" : String(value)}
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
    backgroundColor: "#F7F8FC",
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
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  condition: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 10,
  },
  heroText: {
    color: "#6B7280",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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