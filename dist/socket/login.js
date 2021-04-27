"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = require("../db/mysql");

var _query = require("../db/query");

var _default = async socket => {
  try {
    const user_id = socket.user_id;
    const value = [user_id];
    const [rooms] = await _mysql.database.query(_query.SELECT_PARTICIPATED_ROOMS, value);

    if (rooms.length > 0) {
      for (let i = 0; i < rooms.length; i++) {
        const room_name = rooms[i].room_id;
        socket.join(room_name);
      }
    }
  } catch (err) {}
};

exports.default = _default;