import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakesUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakesUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakesUsersRepository,
      fakeHashProvider,
    );

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
    const fakesUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakesUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'john@doe.com',
        password: 'qwer1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakesUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakesUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakesUsersRepository,
      fakeHashProvider,
    );

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
