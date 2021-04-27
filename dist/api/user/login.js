"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pbkdf = _interopRequireDefault(require("pbkdf2"));

var _mysql = require("../../db/mysql");

var _query = require("../../db/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = async (req, res, next) => {
  try {
    const {
      unique_name,
      password
    } = req.body;
    if (!(4 < unique_name.length && unique_name.length < 12)) throw {
      code: 'ER_INVAILD_UNIQUE_NAME',
      message: 'ID must be at least 4 letters and no more than 12 letters.'
    };
    if (!(4 < password.length)) throw {
      code: 'ER_INVAILD_PASSWORD',
      message: 'Password must be at least 4 characters long.'
    };
    const ban_list = ['<', '>', '.', ',', '='];

    for (let i = 0; i < unique_name.length; i++) {
      const char = unique_name[i];
      const check = ban_list.some(word => word === char);
      if (check) throw {
        code: 'ER_INVAILD_UNIQUE_NAME',
        message: "ID can'not contain '<', '>', '.', ',', '='."
      };
    }

    const hashed_password = await _pbkdf.default.pbkdf2Sync(password, process.env.HASH_SALT_KEY, 1024, 64, 'sha512').toString('hex');
    const value = [unique_name, hashed_password];
    const [[user]] = await _mysql.database.query(_query.LOGIN_USER_ACCOUNT, value);
    if (!user.user_id) throw {
      code: 'ER_NOT_FOUND_ACCOUNT',
      message: 'Please check your passord and ID'
    };
    req.user_id = user.user_id;
    res.data = _objectSpread(_objectSpread({}, res.data), {}, {
      user
    });
    next();
  } catch (err) {
    next(err);
  }
};

exports.default = _default;