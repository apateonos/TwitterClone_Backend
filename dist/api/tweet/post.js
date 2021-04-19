"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = require("../../db/mysql");

var _query = require("../../db/query");

var _default = async (req, res, next) => {
  try {
    const {
      tweet_text
    } = req.body;
    const tweet_image = req.files.filename;
    const user_id = req.user_id;
    if (tweet_text === undefined && tweet_image === undefined) throw {
      code: 'ER_TWEET_EMPTY',
      message: 'Tweet must have either text or image in request to tweet'
    };
    const value = [user_id, tweet_text, tweet_image];
    const [result] = await _mysql.database.query(_query.INSERT_TWEET, value);
    req.tweet_id = result.insertId;
    res.data = result;
    next();
  } catch (err) {
    next(err);
  }
};

exports.default = _default;