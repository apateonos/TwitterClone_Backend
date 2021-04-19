"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = require("../db/mysql");

var _query = require("../db/query");

var _default = async (socket, req, res) => {
  try {
    const user_id = socket.user_id;
    const {
      room_id
    } = req;
    const value = [room_id, user_id];
    await socket.leave(room_name);
    await _mysql.database.query(_query.LEAVE_ROOM, value);
    const [rp] = await _mysql.database.query(_query.SELECT_REMAINING_PEOPLE, room_id);

    if (rp.length === 0) {
      await _mysql.database.query(_query.DELETE_MESSAGE, room_id);
      await _mysql.database.query(_query.DELETE_ROOM, room_id);
    }
  } catch (err) {}
};

exports.default = _default;