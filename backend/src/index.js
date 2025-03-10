import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDb } from './lib/db.js'

import errorHandler from './middlewares/errorHandler.js'

import authRoutes from './routes/authRoutes.js'
import plateRoutes from './routes/plateRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import responseRoutes from './routes/responseRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
));

app.use('/api/auth', authRoutes);
app.use('/api/plates', plateRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/responses', responseRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();