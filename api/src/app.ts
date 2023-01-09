import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';

import { apiRouter } from './routes/api.router';
import { config } from './configs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

app.use(apiRouter);

app.listen(config.PORT, () => {
    console.log(`Server has been started on http://localhost:${config.PORT}/ 🚀🚀🚀`);
});
