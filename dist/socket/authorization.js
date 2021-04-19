"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mysql = require("../db/mysql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var _default = async (socket, next, res) => {
  try {
    const token = socket.handshake.headers.authorization.split('Bearer ')[1];
    const decoded = await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
    const {
      id,
      type
    } = decoded;
    socket.user_id = id;
    const [room_list] = await _mysql.database.query('SELECT * FROM rooms WHERE user_id = ?;', id);
    socket.room_list = room_list;
    next();
  } catch (error) {
    next(err);
  }
};

exports.default = _default;