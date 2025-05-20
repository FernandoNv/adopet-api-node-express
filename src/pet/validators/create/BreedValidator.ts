import { IPetDto, PetBreedEnum, PetBreeds } from "../../entity/pet";
import { CreateErrorValidator } from "../errors/CreateErrorValidator";
import { IPetValidator } from "../IPetValidator";

export default class BreedValidator implements IPetValidator {
  validate(pet: IPetDto): void {
    const isValid = Object.values(PetBreeds).includes(
      pet.breed as PetBreedEnum
    );

    if (!isValid) {
      throw new CreateErrorValidator("Breed not valid");
    }
  }
}
