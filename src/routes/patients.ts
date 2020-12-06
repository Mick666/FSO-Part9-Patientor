import express from 'express';
import patientService from '../services/patientsService';
import { toNewPatient, toNewPatientEntry } from '../utils';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientService.getById(id));
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        const newEntryObj = toNewPatientEntry(req.body);
        const newEntry = patientService.addPatientEntry(newEntryObj, id);
        res.json(newEntry);
    } catch (error) {
        res.status(400).send(error.message);
    }

});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatient(req.body);
        const newPatient = patientService.addPatient(newPatientEntry);
        res.json(newPatient);
    } catch (error) {
        res.status(400).send(error.message);
    }

});

export default router;