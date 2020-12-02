import { Gender, NewPatientEntry, Entry } from './types';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

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

const isEntry = (entry: any) => {
    return Array.isArray(entry);
};

const parseEntries = (entries: Array<Entry>) => {
    if (!isEntry(entries)) {
        throw new Error(`Invalid entry provided: ${entries}`);
    }
    return entries;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        dateOfBirth: parseDOB(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: parseEntries(object.entries)
    };
};

export default toNewPatientEntry;