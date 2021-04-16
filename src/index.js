import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import ping from './api/ping';

const app = express();
const PORT = 3000;
const server = http.createServer(app).listen(PORT, () => {
  console.log('server running...');
});

app.use('/public/images', express.static('/public'));

app.get('/ping', ping);
