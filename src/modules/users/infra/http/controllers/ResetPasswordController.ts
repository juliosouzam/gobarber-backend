import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordEmailService = container.resolve(ResetPasswordService);

    await resetPasswordEmailService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}

export default new ResetPasswordController();
