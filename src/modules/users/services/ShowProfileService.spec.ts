import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakesUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakesUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakesUsersRepository);
  });

  it('should be able to show a user', async () => {
    const user = await fakesUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    const showUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showUser.name).toBe('John Doe');
    expect(showUser.email).toBe('john@doe.com');
  });

  it('should not be able to show a user if a user_id non existing', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
