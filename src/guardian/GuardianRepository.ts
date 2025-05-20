import GuardianEntity from "./entity/GuardianEntity";
import { IRepository } from "../types/IRepository";
import { Repository } from "typeorm";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";

export default class GuardianRepository implements IRepository<GuardianEntity> {
  constructor(private readonly _repository: Repository<GuardianEntity>) {}

  getAll(): Promise<GuardianEntity[]> {
    return this._repository.find({ take: 100 });
  }

  async getById(id: number): Promise<GuardianEntity | null> {
    return this._repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const dr = await this._repository.delete(id);
    if (dr.affected === undefined) {
      throw new EntityNotFoundError("Guardian not found");
    }
  }

  async update(id: number, guardian: GuardianEntity): Promise<GuardianEntity> {
    guardian.id = id;
    return this._repository.save(guardian);
  }

  save(guardian: GuardianEntity): Promise<GuardianEntity> {
    return this._repository.save(guardian);
  }
}
