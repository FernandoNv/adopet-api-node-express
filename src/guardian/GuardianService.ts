import { IRepository } from "../types/IRepository";
import GuardianEntity from "./entity/GuardianEntity";
import GuardianDto, { IGuardianDto } from "./entity/GuardianDto";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";
import { IAddressDto } from "./address/AddressDto";
import AddressEntity from "./address/AddressEntity";
import { AddressNotCompleteError } from "./address/AddressNotCompleteError";

export default class GuardianService {
  constructor(
    private readonly repository: IRepository<GuardianEntity>,
    private readonly dto: GuardianDto
  ) {}

  async getById(id: number): Promise<GuardianEntity | null> {
    return this.repository.getById(id);
  }

  async create(dto: IGuardianDto): Promise<IGuardianDto> {
    const guardian = this.dto.mapToGuardian(dto);

    try {
      const guardianEntity = await this.repository.save(guardian);

      return this.dto.mapToDto(guardianEntity);
    } catch (e) {
      console.log(e);

      throw e;
    }
  }

  async getAll(): Promise<IGuardianDto[]> {
    return this.repository.getAll();
  }

  async update(id: number, dto: IGuardianDto): Promise<IGuardianDto> {
    const guardian = await this.repository.getById(id);

    if (!guardian) {
      throw new Error("Guardian not found");
    }

    GuardianEntity.update(guardian, dto);
    const savedGuardian = await this.repository.update(id, guardian);

    return this.dto.mapToDto(savedGuardian);
  }

  async delete(id: number): Promise<void> {
    const guardian = this.repository.getById(id);

    if (!guardian) {
      throw new EntityNotFoundError("Guardian not found");
    }

    return this.repository.delete(id);
  }

  async updateAddress(id: number, updateAddress: IAddressDto) {
    const guardian = await this.repository.getById(id);
    if (!guardian) {
      throw new EntityNotFoundError("Guardian not found");
    }

    if (!guardian.address) {
      if (!updateAddress.city || !updateAddress.state) {
        throw new AddressNotCompleteError(
          "City and state are required when address is not set"
        );
      }
      guardian.address = new AddressEntity(
        undefined,
        updateAddress.city,
        updateAddress.state
      );
    } else {
      GuardianEntity.updateAddress(guardian, updateAddress);
    }

    const savedGuardian = await this.repository.update(id, guardian);

    return this.dto.mapToDto(savedGuardian);
  }
}
