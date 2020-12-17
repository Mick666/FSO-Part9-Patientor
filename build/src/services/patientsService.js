"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getById = (id) => {
    const individualPatient = patients_1.default.filter((patient) => patient.id === id);
    return individualPatient[0];
};
const addPatient = (object) => {
    const newPatient = Object.assign({ id: patients_1.default.length.toString() }, object);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addPatientEntry = (object, id) => {
    const patient = getById(id);
    const newEntry = Object.assign({ id: patient.entries.length.toString() }, object);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getById,
    addPatientEntry
};
