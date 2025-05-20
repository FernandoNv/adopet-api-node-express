import { IPetDto, PetBreedEnum } from "./pet";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import GuardianEntity from "../../guardian/entity/GuardianEntity";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;
  @Column()
  name: string;
  @Column()
  breed: PetBreedEnum;
  @Column()
  birthDate: Date;
  @Column()
  adopted: boolean;

  @ManyToOne(() => GuardianEntity, (guardian) => guardian.pets, {
    nullable: true,
  })
  guardian!: GuardianEntity;

  constructor(
    id: number | undefined,
    name: string,
    breed: PetBreedEnum,
    birthDate: Date,
    adopted: boolean
  ) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.birthDate = birthDate;
    this.adopted = adopted;
  }

  static update(pet: PetEntity, updatePet: IPetDto): void {
    if (updatePet.name !== undefined) {
      pet.name = updatePet.name;
    }

    if (updatePet.breed !== undefined) {
      pet.breed = updatePet.breed;
    }

    if (updatePet.birthDate !== undefined) {
      pet.birthDate = updatePet.birthDate;
    }

    if (updatePet.adopted !== undefined) {
      pet.adopted = updatePet.adopted;
    }
  }
}
