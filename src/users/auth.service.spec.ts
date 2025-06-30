import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 775755),
          email,
          password,
        } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('should create an instance of auth service', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a salted and hashed password', async () => {
    const user = await service.signup('asjsjknk@gmail.com', 'jsjsjs');
    expect(user.password).not.toEqual('jsjsjs');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if user signs up with email already in use', async () => {
    await service.signup('asdf@asdf.com', 'asdf');
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if signin is called with new email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if an invalid password is provided', async () => {
    await service.signup('asdf@asdf.com', 'asdf');
    await expect(service.signin('asdf@asdf.com', 'passowrd')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return user if credentials are correct', async () => {
    await service.signup('laskdjf@alskdfj.com', 'mypassword');
    const user = await service.signin('laskdjf@alskdfj.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
