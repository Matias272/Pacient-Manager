import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PatientCard({ patient, onPress, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.cardBody}>
        <Text style={styles.name}>{patient.name}</Text>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{patient.age}</Text>
          </View>

          <View style={styles.conditionPill}>
            <Text style={styles.conditionText}>{patient.condition}</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.actionsRow}>
        <Pressable style={styles.actionButton} onPress={onPress}>
          <Text style={styles.actionButtonText}>View</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={onEdit}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardBody: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
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
    color: "#111827",
  },
  conditionPill: {
    backgroundColor: "#DBEAFE",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: "60%",
  },
  conditionText: {
    color: "#1D4ED8",
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#111827",
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
  },
  deleteButtonText: {
    color: "#B91C1C",
    fontWeight: "700",
  },
});
