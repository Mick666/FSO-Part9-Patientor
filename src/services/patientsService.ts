import patients from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getEntries = ():Array<PatientEntry> => {
    return patients;
};

const addEntry = () => {
    return null;
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

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries
};