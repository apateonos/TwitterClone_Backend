export const INSERT_USER = 'INSERT INTO users ( unique_name, user_name, user_image, password, profile ) VALUES ( ?, ?, ?, ?, ?, ? );';
export const LOGIN_ACCOUNT = 'SELECT user_id, user_image, unique_name, user_name, profile, created_at FROM users WHERE user_id = ? AND password = ?;';
export const SELECT_USER_BY_ID = 'SELECT user_id, user_image, unique_name, user_name, profile, created_at FROM users WHERE user_id = ?;';
export const DELETE_USER = 'DELETE FROM users WHERE unique_name = ? AND password = ?;';

export const SELECT_TIMELINE = `SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN follows f ON f.user_id = ? AND f.following_id = t.user_id LEFT JOIN retweet rt ON rt.user_id = f.following_id OR rt.user_id = ? AND t.tweet_id = rt.tweet_id WHERE t.user_id = ? OR f.user_id = ?;`;

export const SELECT_USER_TWEETS = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id WHERE t.user_id = ?;';
export const SELECT_TWEET = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id WHERE t.tweet_id = ?;';
export const INSERT_TWEET = 'INSERT INTO tweets ( user_id, tweet_text, tweet_image ) VALUES ( ?, ?, ? );';
export const DELETE_TWEET = 'DELETE FROM tweets WHERE user_id = ? AND tweet_id = ?;';

export const SELECT_TWEET_REPLYS = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN replys r ON t.tweet_id = r.tweet_id WHERE r.reply_id = ?;';
export const INSERT_REPLY = 'INSERT INTO replys ( user_id, tweet_id, reply_id ) VALUES ( ?, ?, ? );';
export const DELETE_REPLY = 'DELETE FROM replys WHERE user_id = ? AND tweet_id = ?;';

//export const SELET_USER_RETWEETS = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN replys rt ON t.tweet_id = rt.tweet_id WHERE rt.user_id = ?;';
export const INSERT_RETWEET = 'INSERT INTO retweet ( user_id, tweet_id ) VALUES ( ?, ? );';
export const DELETE_RETWEET = 'DELETE FROM retweet WHERE user_id = ? AND tweet_id = ?;';

export const SELECT_FOLLOWER = 'SELECT u.user_id, u.user_name, u.unique_name, u.user_image, u.profile FROM users u LEFT JOIN follows f ON f.user_id = u.user_id WHERE f.follower_id = ?;';
export const SELECT_FOLLOWING = 'SELECT u.user_id, u.user_name, u.unique_name, u.user_image, u.profile FROM users u LEFT JOIN follows f ON f.follower_id = u.user_id WHERE f.user_id = ?;';
export const INSERT_FOLLOW = 'INSERT INTO follows ( user_id, follower_id ) VALUES ( ?, ? );';
export const DELETE_FOLLOW = 'DELETE FROM follows WHERE user_id = ? AND follower_id = ?;';