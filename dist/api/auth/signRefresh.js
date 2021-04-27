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
    const user_id = req.user_id;
    const refresh = await _jsonwebtoken.default.sign({
      type: 'refresh',
      user_id
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
      issuer: 'apateonos@gmail.com'
    });
    res.cookie('refresh', refresh, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    next();
  } catch (err) {
    next(err);
  }
};

exports.default = _default;