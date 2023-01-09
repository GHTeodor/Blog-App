import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,

    ACCESS_TOKEN_KEY: process.env.SUPER_SECRET_ACCESS_TOKEN_KEY || 'SUPER_SECRET_ACCESS_TOKEN_KEY',
    REFRESH_TOKEN_KEY: process.env.SUPER_SECRET_REFRESH_TOKEN_KEY || 'SUPER_SECRET_REFRESH_TOKEN_KEY',
    ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN || '15m',
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || '1h',
};
