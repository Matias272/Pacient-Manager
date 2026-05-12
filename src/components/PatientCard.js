import { View, Text, StyleSheet } from "react-native";

export default function PatientCard({ patient }) {
    console.log(patient);
    
    return (
        <View style={styles.patientcard}>
            <Text>{patient.age}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    patientcard:{
        padding: 10,
        backgroundColor: "whitesmoke",
    }
});