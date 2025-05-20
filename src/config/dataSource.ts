import { DataSource } from "typeorm";
import PetEntity from "../pet/entity/PetEntity";
import GuardianEntity from "../guardian/entity/GuardianEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite",
  entities: [PetEntity, GuardianEntity],
  synchronize: true,
  logging: true,
});
