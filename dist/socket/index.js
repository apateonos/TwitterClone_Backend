"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SocketAuthorization", {
  enumerable: true,
  get: function () {
    return _authorization.default;
  }
});
Object.defineProperty(exports, "SocketLogin", {
  enumerable: true,
  get: function () {
    return _login.default;
  }
});
Object.defineProperty(exports, "CreateRoom", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "SendMessage", {
  enumerable: true,
  get: function () {
    return _send.default;
  }
});
Object.defineProperty(exports, "LeaveRoom", {
  enumerable: true,
  get: function () {
    return _leave.default;
  }
});

var _authorization = _interopRequireDefault(require("./authorization"));

var _login = _interopRequireDefault(require("./login"));

var _create = _interopRequireDefault(require("./create"));

var _send = _interopRequireDefault(require("./send"));

var _leave = _interopRequireDefault(require("./leave"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }