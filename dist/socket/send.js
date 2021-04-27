"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = require("../db/mysql");

var _default = async (socket, req, res) => {
  try {
    const {
      room_id,
      room_name,
      message
    } = req;
    const user_id = socket.user_id;
    const value = [room_id, user_id, message];
    await socket.to(room_name).emit('receive message', {
      room_id,
      user_id,
      message
    });
    await _mysql.database.query(INSERT_MESSAGE, value);
  } catch (err) {}
};

exports.default = _default;