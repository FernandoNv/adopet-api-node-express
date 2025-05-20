import { IPetDto } from "../../entity/pet";
import { IPetValidator } from "../IPetValidator";
import ISOStringValidator from "../create/ISOStringValidator";

export class UpdateISOStringValidator implements IPetValidator {
  constructor(private readonly isoStringValidator: ISOStringValidator) {}
  validate(pet: IPetDto): void {
    if (pet.birthDate === undefined) return;

    this.isoStringValidator.validate(pet);
  }
}
