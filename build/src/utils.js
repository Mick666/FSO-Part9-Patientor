"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (text) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing name: ${text}`);
    }
    return text;
};
const parseSSN = (text) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing SSN: ${text}`);
    }
    return text;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDOB = (text) => {
    if (!text || !isDate(text)) {
        throw new Error(`Incorrect or missing DoB: ${text}`);
    }
    return text;
};
const parseOccupation = (text) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing occupation: ${text}`);
    }
    return text;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (text) => {
    if (!text || !isGender(text)) {
        throw new Error(`Incorrect or missing gender: ${text}`);
    }
    return text;
};
const isEntry = (entry) => {
    return Array.isArray(entry);
};
const parseEntries = (entries) => {
    if (!isEntry(entries)) {
        throw new Error(`Invalid entry provided: ${entries}`);
    }
    return entries;
};
exports.toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        dateOfBirth: parseDOB(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: parseEntries(object.entries)
    };
};
const isEntryType = (param) => {
    return Object.values(types_1.EntryType).includes(param);
};
const parseType = (type) => {
    if (!type || !isEntryType(type))
        throw new Error(`Invalid type provided ${type}`);
    return type;
};
const parseDescription = (description) => {
    if (!description || !isString(description))
        throw new Error(`Invalid description provided ${description}`);
    return description;
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName))
        throw new Error(`Invalid description provided ${employerName}`);
    return employerName;
};
const parseDate = (date) => {
    if (!date || !isString(date))
        throw new Error(`Invalid date provided ${date}`);
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist))
        throw new Error(`Invalid specialist provided ${specialist}`);
    return specialist;
};
const isDiagnosisCodes = (diagnosisCodes) => {
    return Array.isArray(diagnosisCodes) && diagnosisCodes.every(code => isString(code));
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes))
        throw new Error(`Invalid diagnosis codes provided ${diagnosisCodes}`);
    return diagnosisCodes;
};
const isHealthCheck = (param) => {
    console.log('tessssting');
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheck = (healthCheck) => {
    if (!isHealthCheck(healthCheck)) {
        throw new Error(`Invalid health check provided: ${healthCheck}`);
    }
    return healthCheck;
};
const isDischarge = (param) => {
    return isString(param.date) && isString(param.criteria);
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge))
        throw new Error(`Invalid discharge provided ${JSON.stringify(discharge)}`);
    return discharge;
};
const isSickLeave = (param) => {
    return isString(param.startDate) && isString(param.endDate);
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !isSickLeave(sickLeave))
        throw new Error(`Invalid sick leave provided ${sickLeave}`);
    return sickLeave;
};
exports.toNewPatientEntry = (object) => {
    parseType(object.type);
    switch (object.type) {
        case 'HealthCheck':
            if (object.diagnosisCodes) {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'HealthCheck',
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                    healthCheckRating: parseHealthCheck(object.healthCheckRating)
                };
            }
            else {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'HealthCheck',
                    healthCheckRating: parseHealthCheck(object.healthCheckRating)
                };
            }
        case 'Hospital':
            if (object.diagnosisCodes) {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'Hospital',
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                    discharge: parseDischarge(object.discharge)
                };
            }
            else {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'Hospital',
                    discharge: parseDischarge(object.discharge)
                };
            }
        case 'OccupationalHealthcare':
            if (object.diagnosisCodes && object.sickLeave) {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'OccupationalHealthcare',
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                    employerName: parseEmployerName(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave)
                };
            }
            else if (object.diagnosisCodes) {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'OccupationalHealthcare',
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                    employerName: parseEmployerName(object.employerName)
                };
            }
            else if (object.sickLeave) {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'OccupationalHealthcare',
                    employerName: parseEmployerName(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave)
                };
            }
            else {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'OccupationalHealthcare',
                    employerName: parseEmployerName(object.employerName)
                };
            }
    }
    throw new Error(`Invalid type provided ${object.type}`);
};
