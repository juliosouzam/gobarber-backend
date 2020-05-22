import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakesUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakesUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakesUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakesUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John One',
      email: 'john@one.com',
    });

    expect(updatedUser.name).toBe('John One');
    expect(updatedUser.email).toBe('john@one.com');
  });

  it('should not be able to update a user non existing', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-id',
        name: 'test',
        email: 'test@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update if email already exists', async () => {
    await fakesUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    const user = await fakesUsersRepository.create({
      name: 'Test Doe',
      email: 'test@doe.com',
      password: 'qwer1234',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John One',
        email: 'john@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakesUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John One',
      email: 'john@one.com',
      password: '12345678',
      old_password: 'qwer1234',
    });

    expect(updatedUser.password).toBe('12345678');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakesUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John One',
        email: 'john@one.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password without wrong old password', async () => {
    const user = await fakesUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John One',
        email: 'john@one.com',
        password: '12345678',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
