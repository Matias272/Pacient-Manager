import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@doctor_patients_data';

export const PatientStorage = {
  // Get all patients
  getAll: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error reading patients from local storage", e);
      return [];
    }
  },

  // Save the entire list of patients
  saveAll: async (patients) => {
    try {
      const jsonValue = JSON.stringify(patients);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Error saving patients to local storage", e);
    }
  }
};