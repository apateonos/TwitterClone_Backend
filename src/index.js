import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import socketIO from 'socket.io';
import { SignToken, VerifyToken, SignRefresh, VerifyRefresh } from './api/auth/index';
import { GetUser, SignUser, LoginUser, DelUser, EditUser } from './api/user/index';
import { GetFollows, PostFollow, DelFollow } from './api/follow/index';
import { GetTweets, PostTweet, DelTweet } from './api/tweet/index';
import { GetReplys, PostReply, DelReply } from './api/reply/index';
import { GetRetweet, PostRetweet, DelRetweet } from './api/retweet/index';
import { GetHeart, PostHeart, DelHeart } from './api/heart/index';
import { GetTimeline } from './api/timeline/index';
import { SocketAuthorization, SocketLogin, CreateRoom, LeaveRoom, SendMessage } from './socket/index';
import morgan from 'morgan';
import multer from 'multer';
import cors from 'cors';

const app = express();
const PORT = 3000;
const server = http.createServer(app).listen(PORT, () => {
  console.log('server running...');
});

const upload = multer({
  dest : 'public/images'
});

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(morgan('common'));
app.use('/public/images', express.static('/public'));

app.get('/ping', (req, res) => {console.log(req.body)});
app.post('/refresh', VerifyRefresh, SignToken);
app.post('/user/sign', upload.single('imageFile'), SignUser, LoginUser, GetRetweet, GetHeart, GetFollows, SignToken, SignRefresh);
app.post('/login', LoginUser, GetFollows, GetRetweet, GetHeart, SignToken, SignRefresh);
app.put('/user/edit', VerifyToken, upload.single('imageFile'), EditUser, GetUser);
app.delete('/user/unsign', LoginUser, DelUser);

app.post('/tweet/post', VerifyToken, upload.single('imageFile'), PostTweet, PostReply);
app.post('/retweet/post', VerifyToken, PostRetweet, GetRetweet);
app.post('/heart/post', VerifyToken, PostHeart, GetHeart);

app.delete('/tweet/del', VerifyToken, DelTweet, DelReply);
app.delete('/retweet/del', VerifyToken, DelRetweet);
app.delete('/heart/del', VerifyToken, DelHeart);

app.get('/timeline', VerifyToken, GetTimeline);
app.get('/profile', GetUser, GetFollows, GetTweets);
app.get('/detail', GetTweets, GetReplys, GetHeart, GetRetweet);
app.get('/message', VerifyToken);
app.get('/search', GetTweets);

app.post('/follow/post', VerifyToken, PostFollow, GetFollows);
app.delete('/follow/del', VerifyToken, DelFollow, GetFollows);

app.use((req, res) => {
  res.json(res.data);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({code: err.code, message: err.message});
});

const socketCORS = { cors: { origin: true, credentials: true }};
const io = socketIO(server, socketCORS);

io.use(console.log('hello!'))//SocketAuthorization);

io.on('connection', socket => {
  socket.leave(socket.id);
  socket.join(socket.user_id);

  socket.on('login', () => SocketLogin(socket));
  socket.on('create room', (req, res) => CreateRoom(socket, req, res));
  socket.on('send message', (req, res) => SendMessage(socket, req, res));
  socket.on('leave room', (req, res) => LeaveRoom(socket, req, res));
});