import { Gender, NewPatientEntry, Entry, NewEntry, EntryType, HealthCheckRating } from './types';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (text: any): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing name: ${text}`);
    }
    return text;
};

const parseSSN = (text: any): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing SSN: ${text}`);
    }
    return text;
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const parseDOB = (text: any): string => {
    if (!text || !isDate(text)) {
        throw new Error(`Incorrect or missing DoB: ${text}`);
    }
    return text;
};

const parseOccupation = (text: any): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing occupation: ${text}`);
    }
    return text;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (text: any): Gender => {
    if (!text || !isGender(text)) {
        throw new Error(`Incorrect or missing gender: ${text}`);
    }
    return text;
};

const isEntry = (entry: any): boolean => {
    return Array.isArray(entry);
};

const parseEntries = (entries: Array<Entry>) => {
    if (!isEntry(entries)) {
        throw new Error(`Invalid entry provided: ${entries}`);
    }
    return entries;
};

export const toNewPatient = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        dateOfBirth: parseDOB(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: parseEntries(object.entries)
    };
};

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const parseType = (type: any): EntryType => {
    if (!type || !isEntryType(type)) 
    throw new Error(`Invalid type provided ${type}`);
    return type;
};

const parseDescription = (description: any) => {
    if (!description || !isString(description)) throw new Error(`Invalid description provided ${description}`);
    return description;
};

const parseEmployerName = (employerName: any) => {
    if (!employerName || !isString(employerName)) throw new Error(`Invalid description provided ${employerName}`);
    return employerName;
};

const parseDate = (date: any) => {
    if (!date || !isString(date)) throw new Error(`Invalid date provided ${date}`);
    return date;
};

const parseSpecialist = (specialist: any) => {
    if (!specialist || !isString(specialist)) throw new Error(`Invalid specialist provided ${specialist}`);
    return specialist;
};

const isDiagnosisCodes = (diagnosisCodes: any) => {
    return Array.isArray(diagnosisCodes) && diagnosisCodes.every(code => isString(code));
};

const parseDiagnosisCodes = (diagnosisCodes: any) => {
    if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes))
        throw new Error(`Invalid diagnosis codes provided ${diagnosisCodes}`);
    return diagnosisCodes;
};

const isHealthCheck = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheck = (healthCheck: any) => {
    if (!healthCheck || !isHealthCheck(healthCheck)) 
        throw new Error(`Invalid health check provided: ${healthCheck}`);
    return healthCheck;
};

const isDischarge = (param: any): boolean => {
    return isString(param.date) && isString(param.criteria);
};

const parseDischarge = (discharge: any) => {
    if (!discharge || !isDischarge(discharge)) 
        throw new Error(`Invalid discharge provided ${JSON.stringify(discharge)}`);
    return discharge;
};

const isSickLeave = (param: any): boolean => {
    return isString(param.startDate) && isString(param.endDate);
};

const parseSickLeave = (sickLeave: any) => {
    if (!sickLeave || !isSickLeave(sickLeave)) 
        throw new Error(`Invalid sick leave provided ${sickLeave}`);
    return sickLeave;
};


export const toNewPatientEntry = (object: any): NewEntry => {
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
            } else {
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
            } else {
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
            } else if (object.diagnosisCodes) {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'OccupationalHealthcare',
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                    employerName: parseEmployerName(object.employerName)
                };
            } else if (object.sickLeave) {
                return {
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    type: 'OccupationalHealthcare',
                    employerName: parseEmployerName(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave)
                };
            } else {
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