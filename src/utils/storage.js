import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@doctor_patients_data';
const MOCK_PATIENTS = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    condition: 'Hypertension',
    doctor: 'Dr. Patel',
    phone: '(555) 010-1201',
    lastVisit: '2026-05-08',
    notes: 'Needs blood pressure follow-up and medication review.',
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 32,
    condition: 'Type 2 Diabetes',
    doctor: 'Dr. Nguyen',
    phone: '(555) 010-1202',
    lastVisit: '2026-05-11',
    notes: 'Monitoring glucose logs and diet plan adherence.',
  },
  {
    id: '3',
    name: 'Alex Martinez',
    age: 61,
    condition: 'Recovering Post-Op',
    doctor: 'Dr. Carter',
    phone: '(555) 010-1203',
    lastVisit: '2026-05-13',
    notes: 'Physical therapy progress looks stable.',
  },
  {
    id: '4',
    name: 'Sarah Connor',
    age: 29,
    condition: 'Routine Checkup',
    doctor: 'Dr. Silva',
    phone: '(555) 010-1204',
    lastVisit: '2026-05-15',
    notes: 'Annual screening completed, no concerns noted.',
  },
];

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

const normalizePatient = (patient, fallbackId) => ({
  id: patient.id ?? fallbackId ?? `${Date.now()}`,
  name: (patient.name ?? '').trim(),
  age: Number(patient.age) || 0,
  condition: (patient.condition ?? '').trim(),
  doctor: (patient.doctor ?? '').trim(),
  phone: (patient.phone ?? '').trim(),
  lastVisit: (patient.lastVisit ?? '').trim(),
  notes: (patient.notes ?? '').trim(),
});

export const PatientStorage = {
  getAll: async () => {
    try {
      const storedPatients = await readPatients();
      if (storedPatients == null) {
        await writePatients(MOCK_PATIENTS);
        return MOCK_PATIENTS;
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
        currentPatient.id === normalizedPatient.id ? normalizedPatient : currentPatient
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
      const updatedPatients = patients.filter((patient) => patient.id !== patientId);
      await writePatients(updatedPatients);
      return updatedPatients;
    } catch (e) {
      console.error("Error deleting patient from local storage", e);
      throw e;
    }
  },
};