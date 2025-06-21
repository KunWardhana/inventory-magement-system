export { default as swaggerConfig } from './swagger.config.js';
import { config } from 'dotenv';
config();

const { MONGO_URI, PORT, JWT_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

export const port = PORT || 3000;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const dbUri = MONGO_URI;
export const prefix = '/api';
export const specs = "/docs";
