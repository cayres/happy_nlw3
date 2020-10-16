import express from 'express';
import cors from 'cors';
import path from 'path';
import orphanageRoutes from './orphanages/orphanageRoutes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/orphanages', orphanageRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

export default app;
