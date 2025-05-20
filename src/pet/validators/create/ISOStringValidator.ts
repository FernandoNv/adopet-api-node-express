import { IPetDto } from "../../entity/pet";
import { CreateErrorValidator } from "../errors/CreateErrorValidator";
import { IPetValidator } from "../IPetValidator";

export default class ISOStringValidator implements IPetValidator {
  validate(pet: IPetDto): void {
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
    const isValid = isoRegex.test(pet.birthDate?.toString() ?? "");

    if (!isValid) {
      throw new CreateErrorValidator("Invalid date format");
    }
  }
}
