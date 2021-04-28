//user api
export const INSERT_USER_ACCOUNT = 'INSERT INTO users ( unique_name, user_name, user_image, password, profile ) VALUES ( ?, ?, ?, ?, ? );';
export const LOGIN_USER_ACCOUNT = 'SELECT user_id, user_image, unique_name, user_name, profile, created_at FROM users WHERE unique_name = ? AND password = ?;';
export const EDIT_USER_ACCOUNT = 'UPDATE users SET unique_name, user_name, user_image, profile WHERE user_id = ?;';
export const CHANGE_USER_PASSWORD = 'UPDATE users SET password WHERE user_id = ? AND password = ?;';
export const SELECT_USER_INFORMATION = 'SELECT user_id, unique_name, user_name, user_image, profile FROM users WHERE unique_name = ?;';

//timeline api
export const SELECT_TIMELINE = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN retweets rt ON t.tweet_id = rt.tweet_id LEFT JOIN follows f ON f.following_id = t.user_id OR f.following_id = rt.user_id WHERE t.user_id = ? OR f.user_id = ? OR rt.user_id = ?';

//tweet api
export const SELECT_USER_TWEETS = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN retweets rt ON rt.tweet_id = t.tweet_id WHERE t.user_id = ? OR rt.user_id = ?;';
export const SELECT_TWEET = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id WHERE t.tweet_id = ?;';
export const INSERT_TWEET = 'INSERT INTO tweets ( user_id, tweet_text, tweet_image ) VALUES ( ?, ?, ? );';
export const DELETE_TWEET = 'DELETE FROM tweets WHERE user_id = ? AND tweet_id = ?;';

//reply api
export const SELECT_TWEET_REPLYS = 'SELECT t.*, u.user_image, u.user_name, u.unique_name FROM tweets t LEFT JOIN users u ON u.user_id = t.user_id LEFT JOIN replys r ON t.tweet_id = r.tweet_id WHERE r.reply_id = ?;';
export const INSERT_REPLY = 'INSERT INTO replys ( tweet_id, reply_id ) VALUES ( ?, ? );';
export const DELETE_REPLY = 'DELETE FROM replys WHERE tweet_id = ? AND reply_id = ?;';

//retweet api
export const SELECT_TWEET_RETWEETS = 'SELECT rt.*, u.user_image, u.user_name, u.unique_name FROM retweets rt LEFT JOIN users u ON u.user_id = rt.user_id WHERE rt.tweet_id = ?;';
export const CHECK_RETWEET_DUP = 'SELECT * FROM retweets WHERE user_id = ? AND tweet_id = ?;';
export const SELECT_USER_RETWEETS = 'SELECT rt.tweet_id, u.user_image, u.user_name, u.unique_name FROM retweets rt LEFT JOIN users u ON u.user_id = rt.user_id WHERE rt.user_id = ?;';
export const INSERT_RETWEET = 'INSERT INTO retweets ( user_id, tweet_id ) VALUES ( ?, ? );';
export const DELETE_RETWEET = 'DELETE FROM retweets WHERE user_id = ? AND tweet_id = ?;';

//heart api
export const SELECT_TWEET_HEARTS = 'SELECT h.*, u.user_image, u.user_name, u.unique_name FROM hearts h LEFT JOIN users u ON u.user_id = h.user_id WHERE h.tweet_id = ?;';
export const CHECK_HEART_DUP = 'SELECT * FROM hearts WHERE user_id = ? AND tweet_id = ?;';
export const SELECT_USER_HEARTS = 'SELECT h.*, u.user_image, u.user_name, u.unique_name FROM hearts h LEFT JOIN users u ON u.user_id = h.user_id WHERE h.user_id = ?;';
export const INSERT_HEART = 'INSERT INTO hearts ( user_id, tweet_id ) VALUES ( ?, ? );';
export const DELETE_HEART = 'DELETE FROM hearts WHERE user_id = ? AND tweet_id = ?;';

//
export const CHECK_FOLLOW_DUP = 'SELECT * FROM follows WHERE user_id = ? AND following_id = ?;';
export const SELECT_FOLLOWERS = 'SELECT u.user_id, u.user_name, u.unique_name, u.user_image, u.profile FROM users u LEFT JOIN follows f ON f.user_id = u.user_id WHERE f.following_id = ?;';
export const SELECT_FOLLOWINGS = 'SELECT u.user_id, u.user_name, u.unique_name, u.user_image, u.profile FROM users u LEFT JOIN follows f ON f.following_id = u.user_id WHERE f.user_id = ?;';

export const INSERT_FOLLOW = 'INSERT INTO follows ( user_id, following_id ) VALUES ( ?, ? );';
export const DELETE_FOLLOW = 'DELETE FROM follows WHERE user_id = ? AND following_id = ?;';

export const SELECT_USER_TWEET_IMAGES = 'SELECT tweet_image from tweets WHERE user_id = ?;';

export const DELETE_USER_ACCOUNT = 'DELETE FROM users WHERE user_id = ?;';
export const DELETE_USER_TWEETS = 'DELETE FROM tweets WHERE user_id = ?;';
export const DELETE_USER_MESSAGES = 'DELETE FROM messages WHERE user_id = ?;';
export const DELETE_USER_PARTICIPATED_ROOMS = 'DELETE FROM rooms WHERE user_id = ?;';
export const DELETE_USER_FOLLOWS = 'DELETE FROM follows WHERE user_id = ?;';
export const DELETE_USER_HEARTS = 'DELETE FROM hearts WHERE user_id = ?;';
export const DELETE_USER_REPLYS = 'DELETE FROM replys WHERE user_id = ?;';
export const DELETE_USER_RETWEETS= 'DELETE FROM retweets WHERE user_id = ?;';