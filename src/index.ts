import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis';
import patientRouter from './routes/patients';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

const PORT = process.env.PORT || 3001;

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../build'));
});

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});