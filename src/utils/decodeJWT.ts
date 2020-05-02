import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../entities/User';

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, config.AUTH.JWT_SECRET);
    // console.log('decoded token:', decoded);
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    return undefined;
  }
};
export default decodeJWT;
