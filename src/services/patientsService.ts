import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntry, Entry } from '../types';

const getEntries = ():Array<PatientEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }));
};

const getById = (id: string): PatientEntry => {
    const individualPatient = patients.filter((patient: PatientEntry) => patient.id === id);
    return individualPatient[0];
};

const addPatient = (object:NewPatientEntry): PatientEntry => {
    const newPatient = {
        id: patients.length.toString(),
        ...object
    };
    patients.push(newPatient);
    return newPatient;
};

const addPatientEntry = (object: NewEntry, id: string): Entry => {
    const patient = getById(id);
    const newEntry = {
        id: patient.entries.length.toString(),
        ...object
    };
    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getById,
    addPatientEntry
};