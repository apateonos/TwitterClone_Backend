import hash from 'pbkdf2';
import { database } from '../../db/mysql';
import { UPDATE_USER } from '../../db/query';

export default async (req, res, next) => {
  try {
    next();
    
  } catch(err) {
    next(err);
  }
}