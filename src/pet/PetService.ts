import { IPetDto } from "./entity/pet";
import PetDTO from "./entity/PetDTO";
import BreedValidator from "./validators/create/BreedValidator";
import ISOStringValidator from "./validators/create/ISOStringValidator";
import { IRepository } from "../types/IRepository";
import PetEntity from "./entity/PetEntity";
import { IPetValidator } from "./validators/IPetValidator";
import { UpdateBreedValidator } from "./validators/update/UpdateBreedValidator";
import { UpdateISOStringValidator } from "./validators/update/UpdateISOStringValidator";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";

export default class PetService {
  static CREATE_VALIDATORS: IPetValidator[] = [
    new BreedValidator(),
    new ISOStringValidator(),
  ];
  static UPDATE_VALIDATORS: IPetValidator[] = [
    new UpdateBreedValidator(new BreedValidator()),
    new UpdateISOStringValidator(new ISOStringValidator()),
  ];

  constructor(
    private readonly petRepository: IRepository<PetEntity>,
    private readonly dto: PetDTO
  ) {
    this.petRepository = petRepository;
    this.dto = dto;
  }

  async create(petDto: IPetDto): Promise<IPetDto> {
    PetService.CREATE_VALIDATORS.forEach((v) => v.validate(petDto));
    const pet: PetEntity = this.dto.mapToPet(petDto);

    try {
      const petEntity = await this.petRepository.save(pet);

      return this.dto.mapToDto(petEntity);
    } catch (e) {
      console.log(e);

      throw e;
    }
  }

  async getAll(): Promise<IPetDto[]> {
    return this.petRepository.getAll();
  }

  async update(id: number, updatePet: IPetDto): Promise<IPetDto> {
    const pet = await this.petRepository.getById(id);

    if (!pet) {
      throw new EntityNotFoundError("Pet not found");
    }

    PetService.UPDATE_VALIDATORS.forEach((v) => v.validate(updatePet));

    PetEntity.update(pet, updatePet);
    const savedPet = await this.petRepository.update(id, pet);

    return new Promise((resolve) => resolve(this.dto.mapToDto(savedPet)));
  }

  async delete(id: number): Promise<void> {
    const pet = await this.petRepository.getById(id);

    if (!pet) {
      throw new EntityNotFoundError("Pet not found");
    }

    return this.petRepository.delete(id);
  }
}
