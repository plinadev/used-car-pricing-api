import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify<string, string, number, Buffer>(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //See if email is in use
    const users = await this.usersService.find(email);

    if (users.length) throw new BadRequestException('email in use');

    //Hash the users password
    //Generate a salt
    const salt = randomBytes(8).toString('hex');

    //Hash the salt and the password together
    const hash = await scrypt(password, salt, 32);

    //join the hashed result and the salt together
    const resultPassword = salt + '.' + hash.toString('hex');

    //Create a new user and save it
    const user = await this.usersService.create(email, resultPassword);

    //return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = await scrypt(password, salt, 32);

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong email or password');
    }
    return user;
  }
}
