import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from '@routes/auth.routes';
const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Healthcheck
app.get('/', (_req, res) => res.send('🟢 TumaFinder API is running!'));

//Routes
app.use('/api/auth', authRouter);

export default app;
