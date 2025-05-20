import { DataSource } from "typeorm";
import PetEntity from "../pet/entity/PetEntity";
import GuardianEntity from "../guardian/entity/GuardianEntity";
import AddressEntity from "../guardian/address/AddressEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite",
  entities: [PetEntity, GuardianEntity, AddressEntity],
  synchronize: true,
  logging: true,
});
