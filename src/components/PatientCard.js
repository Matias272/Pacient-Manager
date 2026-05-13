import { View, Text, StyleSheet } from "react-native";

export default function PatientCard({ patient }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{patient.name}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>{patient.age}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E5E7EB",
    borderRadius: 25,
    padding: 18,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 14,
    color: "#6B7280",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
});
