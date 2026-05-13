import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { PetitFormalScript_400Regular } from '@expo-google-fonts/petit-formal-script';


import MainDashboard from './src/screens/DashboardScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Petit-Script': PetitFormalScript_400Regular, // Give it a clean alias string
  });

  // 3. Keep the screen loading until the phone finishes caching the fonts
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <MainDashboard />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});