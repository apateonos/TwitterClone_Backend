"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE_USER_RETWEETS = exports.DELETE_USER_REPLYS = exports.DELETE_USER_HEARTS = exports.DELETE_USER_FOLLOWS = exports.DELETE_USER_PARTICIPATED_ROOMS = exports.DELETE_USER_MESSAGES = exports.DELETE_USER_TWEETS = exports.DELETE_USER_ACCOUNT = exports.SELECT_USER_TWEET_IMAGES = exports.DELETE_FOLLOW = exports.INSERT_FOLLOW = exports.SELECT_FOLLOWINGS = exports.SELECT_FOLLOWERS = exports.DELETE_RETWEET = exports.INSERT_RETWEET = exports.DELETE_REPLY = exports.INSERT_REPLY = exports.SELECT_TWEET_REPLYS = exports.DELETE_TWEET = exports.INSERT_TWEET = exports.SELECT_TWEET = exports.SELECT_USER_TWEETS = exports.SELECT_TIMELINE = exports.SELECT_USER_INFORMATION = exports.CHANGE_USER_PASSWORD = exports.EDIT_USER_ACCOUNT = exports.LOGIN_USER_ACCOUNT = exports.INSERT_USER_ACCOUNT = void 0;
const INSERT_USER_ACCOUNT = 'INSERT INTO users ( unique_name, user_name, user_image, password, profile ) VALUES ( ?, ?, ?, ?, ? );';
exports.INSERT_USER_ACCOUNT = INSERT_USER_ACCOUNT;
const LOGIN_USER_ACCOUNT = 'SELECT user_id, user_image, unique_name, user_name, profile, created_at FROM users WHERE unique_name = ? AND password = ?;';
exports.LOGIN_USER_ACCOUNT = LOGIN_USER_ACCOUNT;
const EDIT_USER_ACCOUNT = 'UPDATE users SET unique_name, user_name, user_image, profile WHERE user_id = ?;';
exports.EDIT_USER_ACCOUNT = EDIT_USER_ACCOUNT;
const CHANGE_USER_PASSWORD = 'UPDATE users SET password WHERE user_id = ? AND password = ?;';
exports.CHANGE_USER_PASSWORD = CHANGE_USER_PASSWORD;
const SELECT_USER_INFORMATION = 'SELECT user_id, unique_name, user_name, user_image, profile FROM users WHERE unique_name = ?;';
exports.SELECT_USER_INFORMATION = SELECT_USER_INFORMATION;
const SELECT_TIMELINE = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN retweets rt ON t.tweet_id = rt.tweet_id LEFT JOIN follows f ON f.following_id = t.user_id OR f.following_id = rt.user_id WHERE t.user_id = ? OR f.user_id = ? OR rt.user_id = ?';
exports.SELECT_TIMELINE = SELECT_TIMELINE;
const SELECT_USER_TWEETS = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN retweets rt ON rt.tweet_id = t.tweet_id WHERE t.user_id = ? OR rt.user_id = ?;';
exports.SELECT_USER_TWEETS = SELECT_USER_TWEETS;
const SELECT_TWEET = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id WHERE t.tweet_id = ?;';
exports.SELECT_TWEET = SELECT_TWEET;
const INSERT_TWEET = 'INSERT INTO tweets ( user_id, tweet_text, tweet_image ) VALUES ( ?, ?, ? );';
exports.INSERT_TWEET = INSERT_TWEET;
const DELETE_TWEET = 'DELETE FROM tweets WHERE user_id = ? AND tweet_id = ?;';
exports.DELETE_TWEET = DELETE_TWEET;
const SELECT_TWEET_REPLYS = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN replys r ON t.tweet_id = r.tweet_id WHERE r.reply_id = ?;';
exports.SELECT_TWEET_REPLYS = SELECT_TWEET_REPLYS;
const INSERT_REPLY = 'INSERT INTO replys ( tweet_id, reply_id ) VALUES ( ?, ? );';
exports.INSERT_REPLY = INSERT_REPLY;
const DELETE_REPLY = 'DELETE FROM replys WHERE tweet_id = ? AND reply_id = ?;';
exports.DELETE_REPLY = DELETE_REPLY;
const INSERT_RETWEET = 'INSERT INTO retweet ( user_id, tweet_id ) VALUES ( ?, ? );';
exports.INSERT_RETWEET = INSERT_RETWEET;
const DELETE_RETWEET = 'DELETE FROM retweet WHERE user_id = ? AND tweet_id = ?;';
exports.DELETE_RETWEET = DELETE_RETWEET;
const SELECT_FOLLOWERS = 'SELECT u.user_id, u.user_name, u.unique_name, u.user_image, u.profile FROM users u LEFT JOIN follows f ON f.user_id = u.user_id WHERE f.following_id = ?;';
exports.SELECT_FOLLOWERS = SELECT_FOLLOWERS;
const SELECT_FOLLOWINGS = 'SELECT u.user_id, u.user_name, u.unique_name, u.user_image, u.profile FROM users u LEFT JOIN follows f ON f.following_id = u.user_id WHERE f.user_id = ?;';
exports.SELECT_FOLLOWINGS = SELECT_FOLLOWINGS;
const INSERT_FOLLOW = 'INSERT INTO follows ( user_id, following_id ) VALUES ( ?, ? );';
exports.INSERT_FOLLOW = INSERT_FOLLOW;
const DELETE_FOLLOW = 'DELETE FROM follows WHERE user_id = ? AND following_id = ?;';
exports.DELETE_FOLLOW = DELETE_FOLLOW;
const SELECT_USER_TWEET_IMAGES = 'SELECT tweet_image from tweets WHERE user_id = ?;';
exports.SELECT_USER_TWEET_IMAGES = SELECT_USER_TWEET_IMAGES;
const DELETE_USER_ACCOUNT = 'DELETE FROM users WHERE user_id = ?;';
exports.DELETE_USER_ACCOUNT = DELETE_USER_ACCOUNT;
const DELETE_USER_TWEETS = 'DELETE FROM tweets WHERE user_id = ?;';
exports.DELETE_USER_TWEETS = DELETE_USER_TWEETS;
const DELETE_USER_MESSAGES = 'DELETE FROM messages WHERE user_id = ?;';
exports.DELETE_USER_MESSAGES = DELETE_USER_MESSAGES;
const DELETE_USER_PARTICIPATED_ROOMS = 'DELETE FROM rooms WHERE user_id = ?;';
exports.DELETE_USER_PARTICIPATED_ROOMS = DELETE_USER_PARTICIPATED_ROOMS;
const DELETE_USER_FOLLOWS = 'DELETE FROM follows WHERE user_id = ?;';
exports.DELETE_USER_FOLLOWS = DELETE_USER_FOLLOWS;
const DELETE_USER_HEARTS = 'DELETE FROM hearts WHERE user_id = ?;';
exports.DELETE_USER_HEARTS = DELETE_USER_HEARTS;
const DELETE_USER_REPLYS = 'DELETE FROM replys WHERE user_id = ?;';
exports.DELETE_USER_REPLYS = DELETE_USER_REPLYS;
const DELETE_USER_RETWEETS = 'DELETE FROM retweets WHERE user_id = ?;';
exports.DELETE_USER_RETWEETS = DELETE_USER_RETWEETS;