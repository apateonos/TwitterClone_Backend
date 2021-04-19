"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _mysql = require("../../db/mysql");

var _query = require("../../db/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const value = [user_id];
    const user_image = res.data.user.user_image;

    if (user_image) {
      _fs.default.unlink(user_image, err => {
        next(err);
      });
    }

    ;

    const [images] = _mysql.database.query(_query.SELECT_USER_TWEET_IMAGES, value);

    if (images.length > 0) {
      for (const obj of images) {
        const filename = obj.tweet_image;

        _fs.default.unlink(filename, err => {
          next(err);
        });
      }
    }

    ;
    await _mysql.database.query(_query.DELETE_USER_MESSAGES, value);
    await _mysql.database.query(_query.DELETE_USER_PARTICIPATED_ROOMS, value);
    await _mysql.database.query(_query.DELETE_USER_HEARTS, value);
    await _mysql.database.query(_query.DELETE_USER_RETWEETS, value);
    await _mysql.database.query(_query.DELETE_USER_REPLYS, value);
    await _mysql.database.query(_query.DELETE_USER_TWEETS, value);
    const [[result]] = await _mysql.database.query(_query.DELETE_USER_ACCOUNT, value);
    res.data = _objectSpread(_objectSpread({}, res.data), {}, {
      result
    });
    next();
  } catch (err) {
    next(err);
  }
};

exports.default = _default;