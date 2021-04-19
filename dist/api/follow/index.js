"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GetFollows", {
  enumerable: true,
  get: function () {
    return _get.default;
  }
});
Object.defineProperty(exports, "PostFollow", {
  enumerable: true,
  get: function () {
    return _post.default;
  }
});
Object.defineProperty(exports, "DelFollow", {
  enumerable: true,
  get: function () {
    return _del.default;
  }
});

var _get = _interopRequireDefault(require("./get"));

var _post = _interopRequireDefault(require("./post"));

var _del = _interopRequireDefault(require("./del"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }