import { Request, Response } from "express";
import GuardianService from "./GuardianService";
import { IGuardianDto } from "./entity/GuardianDto";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";

export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  async create(request: Request, response: Response): Promise<void> {
    const newGuardian = <IGuardianDto>request.body;
    try {
      const guardian = await this.guardianService.create(newGuardian);

      response.status(201).json(guardian);
    } catch (e: unknown) {
      if (e instanceof Error) {
        response.status(400).json({ message: e.message });
        console.error({ name: e.name, message: e.message });
        return;
      }

      console.error({ name: "Unknown error", message: "Unknown error" });
      response.status(500).json({ message: "Internal server error" });
    }
  }

  async getAll(_: Request, response: Response): Promise<void> {
    const guardians = await this.guardianService.getAll();
    response.status(200).json(guardians);
  }

  async update(request: Request, response: Response): Promise<void> {
    const updateGuardian: IGuardianDto = <IGuardianDto>request.body;
    const id = Number.parseInt(request.params.id);
    try {
      const guardian = await this.guardianService.update(id, updateGuardian);

      response.status(200).json(guardian);
    } catch (e: unknown) {
      if (e instanceof EntityNotFoundError) {
        response.status(404).json({ message: e.message });
        return;
      }

      if (e instanceof Error) {
        response.status(400).json({ message: e.message });
        console.error({ name: e.name, message: e.message });
        return;
      }

      console.error({ name: "Unknown error", message: "Unknown error" });
      response.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    const id = Number.parseInt(request.params.id);
    try {
      await this.guardianService.delete(id);

      response.status(202).json();
    } catch (e: unknown) {
      if (e instanceof Error) {
        response.status(400).json({ message: e.message });
        console.error({ name: e.name, message: e.message });
        return;
      }

      console.error({ name: "Unknown error", message: "Unknown error" });
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
