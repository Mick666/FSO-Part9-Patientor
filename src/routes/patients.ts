import express from 'express';
import patientService from '../services/patientsService';
import toNewPatientEntry from '../utils';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    console.log('ping');
    const id = req.params.id;
    res.send(patientService.getById(id));
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientService.addPatient(newPatientEntry);
        res.json(newPatient);
    } catch (error) {
        res.status(400).send(error.message);
    }

});

export default router;