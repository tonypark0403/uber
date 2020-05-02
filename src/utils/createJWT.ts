import jwt from 'jsonwebtoken';
import config from '../config';

const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id,
    },
    config.AUTH.JWT_SECRET
  );
  return token;
};

export default createJWT;
