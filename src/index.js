import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import { UserGet, UserPost, UserUpdate, UserDelete } from './api/user/index';

const app = express();
const PORT = 3000;
const server = http.createServer(app).listen(PORT, () => {
  console.log('server running...');
});

app.use('/public/images', express.static('/public'));

app.get('/ping', ping);

app.post('/user/create', UserPost, authSign);

app.use((req, res) => {
  console.log('final');
  res.send();
})