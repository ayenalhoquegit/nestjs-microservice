import * as jwt from 'jsonwebtoken';
import { Constants } from './constants';

const secretKey = process.env.SECRET_JWT || Constants.JWT_SECRET;

export default class JWTUtils {
  static generateToken(payload: any, expiresIn: string) {
    const token = jwt.sign(payload, secretKey);
    {
      expiresIn: expiresIn;
    }
    return token;
  }

  static verifyToken(token: string) {
    // Verify Token
    return jwt.verify(token, secretKey);
  }
}
