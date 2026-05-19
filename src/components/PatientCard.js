import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PatientCard({ patient, onPress, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.cardBody}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {patient.name}
          </Text>
          <View style={styles.conditionPill}>
            <Text style={styles.conditionText} numberOfLines={1}>
              {patient.condition}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{patient.age}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Doctor</Text>
            <Text style={styles.value} numberOfLines={1}>
              {patient.doctor || "-"}
            </Text>
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
        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
        >
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
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E6ECF5",
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  cardBody: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  infoBlock: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  conditionPill: {
    backgroundColor: "#E0F2FE",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: "52%",
  },
  conditionText: {
    color: "#075985",
    fontWeight: "800",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#111827",
    fontWeight: "800",
  },
  deleteButton: {
    backgroundColor: "#FFE4E6",
  },
  deleteButtonText: {
    color: "#BE123C",
    fontWeight: "800",
  },
});
