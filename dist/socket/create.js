"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = require("../db/mysql");

var _query = require("../db/query");

var _uuid = require("uuid");

var _default = async (socket, req, res) => {
  try {
    const user_id = socket.user_id;
    const {
      users
    } = req;
    const room_name = (0, _uuid.v4)().split('-').join('');
    const [[result]] = await _mysql.database.query(_query.CREATE_ROOM, room_name);
    const room_id = result.insertId;
    await socket.join(room_name);
    await _mysql.database.query(_query.JOIN_ROOM, [room_id, user_id]);
    users.forEach(async p => {
      const value = [room_id, p];
      await _mysql.database.query(_query.JOIN_ROOM, value);
    });
  } catch (err) {}
};

exports.default = _default;