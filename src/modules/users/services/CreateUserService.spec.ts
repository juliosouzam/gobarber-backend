import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakesUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakesUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakesUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('john@doe.com');
  });

  it('should not be able to create 2 users with the same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'qwer1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
