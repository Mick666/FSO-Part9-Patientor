"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientsService_1.default.getById(id));
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        const newEntryObj = utils_1.toNewPatientEntry(req.body);
        const newEntry = patientsService_1.default.addPatientEntry(newEntryObj, id);
        res.json(newEntry);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.toNewPatient(req.body);
        const newPatient = patientsService_1.default.addPatient(newPatientEntry);
        res.json(newPatient);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = router;
