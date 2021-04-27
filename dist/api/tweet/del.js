"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _mysql = require("../../db/mysql");

var _query = require("../../db/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (req, res, next) => {
  try {
    const {
      tweet_id
    } = req.body;
    const user_id = req.user_id;
    const [[image]] = await _mysql.database.query(_query.SELECT_USER_TWEET_IMAGES, user_id);
    const tweet_image = image.tweet_image;

    if (tweet_image) {
      _fs.default.unlink(tweet_image, err => {
        next(err);
      });
    }

    ;
    const value = [user_id, tweet_id];
    const [result] = await _mysql.database.query(_query.DELETE_TWEET, value);
    res.data = result;
    next();
  } catch (err) {
    next(err);
  }
};

exports.default = _default;