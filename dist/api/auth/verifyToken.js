"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var _default = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    const decoded = await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
    const {
      user_id,
      type
    } = decoded;
    if (type !== 'access') throw {
      code: 'ER_INVAILD_TOKEN',
      message: 'wrong token'
    };
    req.user_id = user_id;
    next();
  } catch (err) {
    next(err);
  }
};

exports.default = _default;