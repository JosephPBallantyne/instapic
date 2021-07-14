import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../types/auth.type';
import { User, UserData } from '../types/users.type';
import UserModel from '../db/models/users.model';

class AuthService {
  public userModel = UserModel;

  public static createJwtToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;
    const token = jwt.sign(dataStoredInToken, secret, { expiresIn });
    if (!token) {
      throw new HttpException(500, 'Unable to create security token');
    }
    return {
      expiresIn,
      token,
    };
  }

  public static createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Path=/; Max-Age=${tokenData.expiresIn}; Secure; SameSite=None;`;
  }

  public async signup(userData: UserData): Promise<User> {
    if (!userData) {
      throw new HttpException(400, 'fields missing');
    }
    const foundUser: UserModel = await this.userModel.findOne({
      where: { username: userData.username },
    });
    if (foundUser)
      throw new HttpException(
        409,
        `Username '${userData.username}' already exists`
      );
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser: UserModel = await this.userModel.create({
      ...userData,
      password: hashedPassword,
    });
    return createdUser.toJSON() as User;
  }

  public async login(
    userData: UserData
  ): Promise<{ cookie: string; user: User }> {
    if (!userData) throw new HttpException(400, 'fields missing');
    const foundResult: UserModel = await this.userModel.findOne({
      where: { username: userData.username },
    });
    if (!foundResult)
      throw new HttpException(
        409,
        `Username address ${userData.username} not found`
      );
    const foundUser: User = foundResult.toJSON() as User;
    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      foundUser.password
    );
    if (!isPasswordMatching) throw new HttpException(409, 'Password not found');
    const tokenData = AuthService.createJwtToken(foundUser);
    const cookie = AuthService.createCookie(tokenData);
    return {
      cookie,
      user: foundUser,
    };
  }

  public async logout(userId: number): Promise<User> {
    if (!userId) {
      throw new HttpException(400, 'error');
    }
    const foundUser: UserModel = await this.userModel.findOne({
      where: { id: userId },
    });
    if (!foundUser) throw new HttpException(409, 'User not found');
    return foundUser.toJSON() as User;
  }
}

export default AuthService;
