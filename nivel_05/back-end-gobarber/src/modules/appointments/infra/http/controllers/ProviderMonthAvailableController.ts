import { Request, Response } from "express"

import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";

export default class ProviderMonthAvailableController {

  public async index(request: Request, response: Response): Promise<Response> {

    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvailabilityService = container.resolve(ListProviderMonthAvailabilityService);

    console.log(request);

    const provider = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(provider);

  }

}
