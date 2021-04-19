import fs from 'fs';
import { database } from '../../db/mysql';
import { SELECT_USER_TWEET_IMAGES, DELETE_USER_ACCOUNT, DELETE_USER_HEARTS, DELETE_USER_MESSAGES, DELETE_USER_PARTICIPATED_ROOMS, DELETE_USER_REPLYS, DELETE_USER_RETWEETS, DELETE_USER_TWEETS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const value = [ user_id ];

    const user_image = res.data.user.user_image;
    if (user_image) {
      fs.unlink(user_image, (err) => {
        next(err);
      });
    };
    
    const [ images ] = database.query(SELECT_USER_TWEET_IMAGES, value);
    if (images.length > 0) {
      for(const obj of images) {
        const filename = obj.tweet_image;
        fs.unlink(filename, (err) => {
          next(err);
        });
      }
    };

    await database.query(DELETE_USER_MESSAGES, value);
    await database.query(DELETE_USER_PARTICIPATED_ROOMS, value);
    await database.query(DELETE_USER_HEARTS, value);
    await database.query(DELETE_USER_RETWEETS, value);
    await database.query(DELETE_USER_REPLYS, value);
    await database.query(DELETE_USER_TWEETS, value);
    const [[ result ]] = await database.query(DELETE_USER_ACCOUNT, value);

    res.data = { ...res.data, result };
    next();
  } catch(err) {
    next(err);
  }
}