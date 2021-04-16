import hash from 'pbkdf2';
import { database } from '../../db/mysql';
import { INSERT_USER } from '../../db/query';

export default async (req, res, next) => {
  try {
    console.log('post');
    const { unique_name, user_image, user_name, password, profile } = req.body;
    const hashed_password = await hash.pbkdf2Sync(password, process.env.HASH_SALT_KEY, 1024, 64, 'sha512').toString('hex');
    console.log(hashed_password);
    console.log('body : ', unique_name, user_image, user_name, password, profile);
    const keyword = [ unique_name, user_image, user_name, password, profile ];
    const result = await database.query(INSERT_USER, keyword);
    console.log(result);
    req.user = result;
    next();
  } catch(err) {
    res.status(500).send(err);
  }
}