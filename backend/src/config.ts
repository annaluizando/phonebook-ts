import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 8080;
export const corsUrl = process.env.CORS_URL || 'http://localhost:5173';