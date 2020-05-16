import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakesUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakesUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('john@doe.com');
  });

  it('should not be able to create 2 users with the same email', async () => {
    const fakesUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakesUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'qwer1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
