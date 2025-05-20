import { IPetDto } from "../entity/pet";

export interface IPetValidator {
  validate(pet: IPetDto): void;
}
