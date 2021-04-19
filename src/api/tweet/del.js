import fs from 'fs';
import { database } from '../../db/mysql';
import { SELECT_USER_TWEET_IMAGES, DELETE_TWEET } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.body;
    const user_id = req.user_id;

    const [[ image ]] = database.query(SELECT_USER_TWEET_IMAGES, user_id);
    const tweet_image = image.tweet_image;
    if (tweet_image) {
      fs.unlink(tweet_image, (err) => {
        next(err);
      });
    };

    const value = [ user_id, tweet_id ];
    const [ result ] = await database.query(DELETE_TWEET, value);

    res.data = result;
    next();
  } catch (err) {
    next(err);
  }
}