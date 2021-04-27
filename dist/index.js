"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _socket = _interopRequireDefault(require("socket.io"));

var _index = require("./api/auth/index");

var _index2 = require("./api/user/index");

var _index3 = require("./api/follow/index");

var _index4 = require("./api/tweet/index");

var _index5 = require("./api/reply/index");

var _index6 = require("./api/retweet/index");

var _index7 = require("./api/heart/index");

var _index8 = require("./api/timeline/index");

var _index9 = require("./socket/index");

var _morgan = _interopRequireDefault(require("morgan"));

var _multer = _interopRequireDefault(require("multer"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = 3000;

const server = _http.default.createServer(app).listen(PORT, () => {
  console.log('server running...');
});

const upload = (0, _multer.default)({
  dest: 'public/images'
});
app.use((0, _cors.default)({
  origin: true,
  credentials: true
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.json());
app.use((0, _morgan.default)('common'));
app.use('/public/images', _express.default.static('/public'));
app.post('/refresh', _index.VerifyRefresh, _index.SignToken);
app.post('/user/sign', upload.single('imageFile'), _index2.SignUser
/*, LoginUser, GetFollows, SignToken, SignRefresh*/
);
app.post('/login', _index2.LoginUser, _index3.GetFollows, _index.SignToken, _index.SignRefresh);
app.put('/user/edit', _index.VerifyToken, upload.single('imageFile'), _index2.EditUser, _index2.GetUser);
app.delete('/user/unsign', _index2.LoginUser, _index2.DelUser);
app.post('/tweet/post', _index.VerifyToken, upload.single('imageFile'), _index4.PostTweet, _index5.PostReply);
app.post('/retweet/post', _index.VerifyToken, _index6.PostRetweet);
app.post('/heart/post', _index.VerifyToken, _index7.PostHeart);
app.delete('/tweet/del', _index.VerifyToken, _index4.DelTweet, _index5.DelReply);
app.delete('/retweet/del', _index.VerifyToken, _index6.DelRetweet);
app.delete('/heart/del', _index.VerifyToken, _index7.DelHeart);
app.get('/timeline', _index.VerifyToken, _index8.GetTimeline);
app.get('/profile', _index2.GetUser, _index3.GetFollows, _index4.GetTweets);
app.get('/detail', _index4.GetTweets, _index5.GetReplys);
app.get('/message', _index.VerifyToken);
app.get('/search', _index4.GetTweets);
app.post('/follow/post', _index.VerifyToken, _index3.PostFollow);
app.delete('/follow/del', _index.VerifyToken, _index3.DelFollow);
app.use((req, res) => {
  res.json(res.data);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({
    code: err.code,
    message: err.message
  });
});
const io = (0, _socket.default)(server);
/* 
io.use(SocketAuthorization);
io.on('connection', socket => {
socket.leave(socket.id); //초기 개인룸 삭제
socket.join(socket.user_id); //고유 아이디로 재접속
socket.on('login', () => SocketLogin(socket));
socket.on('create room', (req, res) => CreateRoom(socket, req, res));
socket.on('send message', (req, res) => SendMessage(socket, req, res));
socket.on('leave room', (req, res) => LeaveRoom(socket, req, res));
}); */