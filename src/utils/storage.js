import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@doctor_patients_data";

const readPatients = async () => {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  if (jsonValue == null) {
    return null;
  }

  return JSON.parse(jsonValue);
};

const writePatients = async (patients) => {
  const jsonValue = JSON.stringify(patients);
  await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
};

const isSeedData = (patients) =>
  Array.isArray(patients) &&
  patients.length === 4 &&
  patients.every((patient, index) => patient.id === String(index + 1));

const normalizePatient = (patient, fallbackId) => ({
  id: patient.id ?? fallbackId ?? `${Date.now()}`,
  name: (patient.name ?? "").trim(),
  age: Number(patient.age) || 0,
  condition: (patient.condition ?? "").trim(),
  doctor: (patient.doctor ?? "").trim(),
  phone: (patient.phone ?? "").trim(),
  lastVisit: (patient.lastVisit ?? "").trim(),
  notes: (patient.notes ?? "").trim(),
});

export const PatientStorage = {
  getAll: async () => {
    try {
      const storedPatients = await readPatients();
      if (storedPatients == null) {
        await writePatients([]);
        return [];
      }

      if (isSeedData(storedPatients)) {
        await writePatients([]);
        return [];
      }

      return storedPatients;
    } catch (e) {
      console.error("Error reading patients from local storage", e);
      return [];
    }
  },

  saveAll: async (patients) => {
    try {
      await writePatients(patients);
    } catch (e) {
      console.error("Error saving patients to local storage", e);
    }
  },

  create: async (patient) => {
    try {
      const patients = await PatientStorage.getAll();
      const newPatient = normalizePatient(patient);
      const updatedPatients = [newPatient, ...patients];
      await writePatients(updatedPatients);
      return newPatient;
    } catch (e) {
      console.error("Error creating patient in local storage", e);
      throw e;
    }
  },

  update: async (patient) => {
    try {
      const patients = await PatientStorage.getAll();
      const normalizedPatient = normalizePatient(patient, patient.id);
      const updatedPatients = patients.map((currentPatient) =>
        currentPatient.id === normalizedPatient.id
          ? normalizedPatient
          : currentPatient,
      );

      await writePatients(updatedPatients);
      return normalizedPatient;
    } catch (e) {
      console.error("Error updating patient in local storage", e);
      throw e;
    }
  },

  remove: async (patientId) => {
    try {
      const patients = await PatientStorage.getAll();
      const updatedPatients = patients.filter(
        (patient) => patient.id !== patientId,
      );
      await writePatients(updatedPatients);
      return updatedPatients;
    } catch (e) {
      console.error("Error deleting patient from local storage", e);
      throw e;
    }
  },
};
