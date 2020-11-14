import diagnosisData from '../../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const getEntries = ():Array<DiagnosisEntry> => {
    return diagnosisData;
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry
};