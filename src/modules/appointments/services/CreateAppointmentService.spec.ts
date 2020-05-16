import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakesAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakesAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12341234',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12341234');
  });

  it('should not be able to create a 2 appointment on the same time', async () => {
    const fakesAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakesAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12341234',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12341234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
