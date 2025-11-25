import { env } from './src/config/env'

import v1Router from './src/routes/v1/v1Router';
import express from 'express';
import session from 'express-session';
import type { Application } from 'express';
import cors from 'cors';

const app: Application = express();
const frontendUrl = env.FRONTEND_URL;
const sessionSecret = env.SESSION_SECRET;

app.use(
    cors({
        origin: frontendUrl,
        methods: ['POST', 'GET', 'DELETE', 'PUT', "OPTIONS"],
        allowedHeaders: ['Content-Type', "Authorization"],
        credentials: true,
    }),

    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        }
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', v1Router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));