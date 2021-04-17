import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import socketIO from 'socket.io';
import { SignToken, VerifyToken, SignRefresh, VerifyRefresh } from './api/auth/index';
import { GetUser, SignUser, LoginUser, DelUser } from './api/user/index';
import { GetFollows, PostFollow, DelFollow } from './api/follow/index';
import { GetTweets, PostTweet, DelTweet } from './api/tweet/index';
import { GetReplys, PostReply, DelReply } from './api/reply/index';
import { PostRetweet, DelRetweet } from './api/retweet/index';
import { PostHeart, DelHeart } from './api/heart/index';
import { GetTimeline } from './api/timeline/index';
import morgan from 'morgan';
import multer from 'multer';

const app = express();
const PORT = 3000;
const server = http.createServer(app).listen(PORT, () => {
  console.log('server running...');
});

const upload = multer({
  dest : 'public/images'
});
const getImage = upload.single('imageFile');

app.use(cookieParser());
app.use(express.json());
app.use(morgan('common'));
app.use('/public/images', express.static('/public'));

app.post('/refresh', VerifyRefresh, SignToken);
app.post('/sign-up', getImage, SignUser, SignToken, SignRefresh, GetUser);
app.post('/login', LoginUser, SignToken, SignRefresh, GetUser, GetFollows);
app.delete('/logout', VerifyToken);
app.delete('/unsign', VerifyToken, DelUser);

app.post('/tweet/post', VerifyToken, getImage, PostTweet, PostReply);
app.post('/retweet/post', VerifyToken, PostRetweet);
app.post('/heart/post', VerifyToken, PostHeart);

app.delete('/tweet/delete', VerifyToken, DelTweet, DelReply);
app.delete('/retweet/delete', VerifyToken, DelRetweet);
app.delete('/heart/delete', VerifyToken, DelHeart);

app.get('/timeline', VerifyToken, GetTimeline);
app.get('/profile', GetUser, GetTweets);
app.get('/detail', GetTweets, GetReplys);
app.get('/message', VerifyToken);
app.get('/search', GetTweets);

app.post('/follow/post', VerifyToken, PostFollow);
app.delete('/follow/delete', VerifyToken, DelFollow);

app.use((req, res) => {
  res.json(res.data);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({code: err.code, message: err.message});
});
/* 
const io = socketIO(server, {

})

io.on('connection', socket => {
  socket.on();
  socket.on();
}); */