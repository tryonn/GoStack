import { Request, Response } from "express"

import { container } from 'tsyringe';
import ListProviderServices from '@modules/appointments/services/ListProviderServices';

export default class ProviderController {

  public async index(request: Request, response: Response): Promise<Response> {


    const user_id = request.user.id;
    const lisProviderService = container.resolve(ListProviderServices);

    const provider = await lisProviderService.execute({
      user_id,
    });

    return response.json(provider);

  }

}
