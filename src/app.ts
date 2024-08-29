import express from 'express';
import uploadRoutes from './routes/uploadRoutes';
import confirmRoutes from './routes/confirmRoutes';
import listRoutes from './routes/listRoutes';


const app = express();

app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', confirmRoutes);
app.use('/api', listRoutes);

export default app;
