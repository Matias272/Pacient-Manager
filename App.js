import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [testPatientCount, setTestPatientCount] = useState(0);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
        
        <View style={styles.card}>
          <Text style={styles.title}>Patient Manager App</Text>
          <Text style={styles.counterText}>Active Patients: {testPatientCount}</Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  card: {
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginBottom: 5,
  },
  counterText: {
    color: '#8E8E93',
    fontSize: 14,
  },
});