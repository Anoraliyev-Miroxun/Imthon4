import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT),
  db_url: String(process.env.DB_URL),
  token: {
    ACCESS_KEY: process.env.ACCESS_TOKEN_KEY,
    ACCESS_TIME: process.env.ACCESS_TOKEN_TIME,
    REFRESH_KEY: process.env.REFRESH_TOKEN_KEY,
    REFRESH_TIME: process.env.REFRESH_TOKEN_TIME,
  },
};
