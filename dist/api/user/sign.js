"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pbkdf = _interopRequireDefault(require("pbkdf2"));

var _mysql = require("../../db/mysql");

var _query = require("../../db/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (req, res, next) => {
  try {
    const {
      unique_name,
      user_name,
      password,
      profile
    } = req.body;
    if (!(4 < unique_name.length && unique_name.length < 12)) throw {
      code: 'ER_INVAILD_UNIQUE_NAME',
      message: 'ID must be at least 4 letters and no more than 12 letters.'
    };
    if (!(4 < user_name.length && user_name.length < 12)) throw {
      code: 'ER_INVAILD_USER_NAME',
      message: 'User name must be at least 4 letters and no more than 12 letters.'
    };
    if (!(4 < password.length)) throw {
      code: 'ER_INVAILD_PASSWORD',
      message: 'Password must be at least 4 characters long.'
    };
    const user_image = req.files;
    const ban_list = ['<', '>', '.', ',', '='];

    for (let i = 0; i < unique_name.length; i++) {
      const char = unique_name[i];
      const check = ban_list.some(word => word === char);
      if (check) throw {
        code: 'ER_INVAILD_UNIQUE_NAME',
        message: "ID can'not contain '<', '>', '.', ',', '='."
      };
    }

    for (let i = 0; i < user_name.length; i++) {
      const char = user_name[i];
      const check = ban_list.some(word => word === char);
      if (check) throw {
        code: 'ER_INVAILD_USER_NAME',
        message: "Name can'not contain '<', '>', '.', ',', '='."
      };
    }

    const hashed_password = await _pbkdf.default.pbkdf2Sync(password, process.env.HASH_SALT_KEY, 1024, 64, 'sha512').toString('hex');
    const value = [unique_name, user_name, user_image, hashed_password, profile];
    const [[result]] = await _mysql.database.query(_query.INSERT_USER_ACCOUNT, value);
    if (result.statusCode !== 2) throw {
      code: 'ER_SIGN_ACCOUNT',
      message: 'request could not be completed.'
    };
    next();
  } catch (err) {
    next(err);
  }
};

exports.default = _default;