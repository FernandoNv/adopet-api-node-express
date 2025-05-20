import { IPetDto } from "./pet";
import PetEntity from "./PetEntity";

export default class PetDTO {
  mapToPet(petDTO: IPetDto): PetEntity {
    return new PetEntity(
      petDTO.id,
      petDTO.name ?? "Not Defined",
      petDTO.breed ?? "not_defined",
      petDTO.birthDate ?? new Date("1970-01-01T00:00:00.000Z"),
      petDTO.adopted ?? false
    );
  }

  mapToDto(pet: PetEntity): IPetDto {
    return {
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      birthDate: pet.birthDate,
      adopted: pet.adopted,
      guardianId: pet.guardian ? pet.guardian.id : null,
    } as IPetDto;
  }
}
