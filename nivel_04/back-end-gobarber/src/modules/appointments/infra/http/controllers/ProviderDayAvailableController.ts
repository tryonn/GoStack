import { Request, Response } from "express"

import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from "@modules/appointments/services/ListProviderDayAvailabilityService";

export default class ProviderDayAvailableController {

  public async index(request: Request, response: Response): Promise<Response> {

    const { provider_id } = request.params;

    const { month, day, year } = request.body;

    const listProviderDayAvailabilityService = container.resolve(ListProviderDayAvailabilityService);

    const provider = await listProviderDayAvailabilityService.execute({
      provider_id,
      month,
      day,
      year,
    });

    return response.json(provider);

  }

}
