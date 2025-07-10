import express from 'express';
import dotenv from 'dotenv';
import databaseRoutes from './src/routes/database.routes.js';

dotenv.config({quiet: true});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend web service!');
});

app.use('/api/database', databaseRoutes);

const PORT = process.env.BACKEND_NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend web service is running on port http://localhost:${PORT}`);
});
