import { database } from '../../db/mysql';
import { INSERT_USER } from '../../db/query';

export default async (req, res, next) => {
  try {
    console.log('post');
    const { unique_name, user_image, user_name, password, profile } = req.body;
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