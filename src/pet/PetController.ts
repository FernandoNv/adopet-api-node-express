import { Request, Response } from "express";
import PetService from "./PetService";
import { IPetDto } from "./entity/pet";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";

class PetController {
  constructor(private readonly petService: PetService) {}

  async create(req: Request, response: Response): Promise<void> {
    const newPet: IPetDto = <IPetDto>req.body;
    try {
      const pet = await this.petService.create(newPet);

      response.status(201).json(pet);
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
    const pets = await this.petService.getAll();

    response.status(200).json(pets);
  }

  async update(req: Request, response: Response): Promise<void> {
    const updatePet: IPetDto = <IPetDto>req.body;
    const id = Number.parseInt(req.params.id);
    try {
      const pet = await this.petService.update(id, updatePet);

      response.status(200).json(pet);
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

  async delete(req: Request, response: Response): Promise<void> {
    const id = Number.parseInt(req.params.id);
    try {
      await this.petService.delete(id);

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

export default PetController;
