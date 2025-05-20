import { IPetDto } from "../../entity/pet";
import { IPetValidator } from "../IPetValidator";
import BreedValidator from "../create/BreedValidator";

export class UpdateBreedValidator implements IPetValidator {
  constructor(private readonly breedValidator: BreedValidator) {}
  validate(pet: IPetDto): void {
    if (pet.breed === undefined) return;

    this.breedValidator.validate(pet);
  }
}
