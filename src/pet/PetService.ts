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
import GuardianService from "../guardian/GuardianService";
import GuardianEntity from "../guardian/entity/GuardianEntity";

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
    private readonly guardianService: GuardianService,
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
      console.error(e);

      throw e;
    }
  }

  async getAll(): Promise<IPetDto[]> {
    const pets = await this.petRepository.getAll();

    return pets.map((p) => this.dto.mapToDto(p));
  }

  async update(id: number, updatePet: IPetDto): Promise<IPetDto> {
    const pet = await this.petRepository.getById(id);

    if (!pet) {
      throw new EntityNotFoundError("Pet not found");
    }

    PetService.UPDATE_VALIDATORS.forEach((v) => v.validate(updatePet));

    PetEntity.update(pet, updatePet);
    const savedPet = await this.petRepository.update(id, pet);

    return this.dto.mapToDto(savedPet);
  }

  async delete(id: number): Promise<void> {
    const pet = await this.petRepository.getById(id);

    if (!pet) {
      throw new EntityNotFoundError("Pet not found");
    }

    return this.petRepository.delete(id);
  }

  async adopt(id: number, idGuardian: number) {
    const pet = await this.petRepository.getById(id);
    if (!pet) throw new EntityNotFoundError("Pet not found");
    let guardian: GuardianEntity | null = pet.guardian;

    if (!guardian) {
      guardian = await this.guardianService.getById(idGuardian);
      if (!guardian) throw new EntityNotFoundError("Guardian not found");

      pet.guardian = guardian;
      guardian.pets.push(pet);
      await this.guardianService.update(idGuardian, guardian);
    } else {
      if (guardian.id === idGuardian) {
        return this.petRepository.getById(id);
      }
      const prevGuardian = await this.guardianService.getById(
        Number(guardian.id)
      );
      const newGuardian = await this.guardianService.getById(idGuardian);
      if (!prevGuardian || !newGuardian)
        throw new EntityNotFoundError(
          "Previous Guardian or Next Guardian not found"
        );

      prevGuardian.pets.filter((p) => p.id !== pet.id);
      newGuardian.pets.push(pet);
      pet.guardian = newGuardian;
      await this.guardianService.update(Number(guardian.id), prevGuardian);
      await this.guardianService.update(idGuardian, newGuardian);
    }

    pet.adopted = true;
    const savedPet = await this.petRepository.update(id, pet);
    console.log(savedPet);
    return this.dto.mapToDto(savedPet);
  }

  async getById(id: number): Promise<IPetDto> {
    const pet = await this.petRepository.getById(id);
    if (!pet) throw new EntityNotFoundError("Pet not found");

    return this.dto.mapToDto(pet);
  }
}
