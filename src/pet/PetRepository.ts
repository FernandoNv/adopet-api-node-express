import PetEntity from "./entity/PetEntity";
import { IRepository } from "../types/IRepository";
import { Repository } from "typeorm";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";

export default class PetRepository implements IRepository<PetEntity> {
  constructor(private readonly _repository: Repository<PetEntity>) {}

  getAll(): Promise<PetEntity[]> {
    return this._repository.find({ take: 100, relations: ["guardian"] });
  }

  async getById(id: number): Promise<PetEntity | null> {
    return this._repository.findOne({
      where: { id },
      relations: ["guardian"],
    });
  }

  async delete(id: number): Promise<void> {
    const dr = await this._repository.delete(id);
    if (dr.affected === undefined) {
      throw new EntityNotFoundError("Pet not found");
    }
  }

  async update(id: number, pet: PetEntity): Promise<PetEntity> {
    pet.id = id;
    return this._repository.save(pet);
  }

  save(pet: PetEntity): Promise<PetEntity> {
    return this._repository.save(pet);
  }
}
