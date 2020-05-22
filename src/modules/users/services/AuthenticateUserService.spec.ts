import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakesUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakesUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakesUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakesUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate non exist user', async () => {
    expect(
      authenticateUser.execute({
        email: 'john@doe.com',
        password: 'qwer1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    expect(
      authenticateUser.execute({
        email: 'john@doe.com',
        password: 'qwer12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
