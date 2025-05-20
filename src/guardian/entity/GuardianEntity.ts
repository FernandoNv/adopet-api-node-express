import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IGuardianDto } from "./GuardianDto";
import AddressEntity from "../address/AddressEntity";
import { IAddressDto } from "../address/AddressDto";
import PetEntity from "../../pet/entity/PetEntity";

@Entity()
export default class GuardianEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  phone: string;
  @Column({ nullable: true })
  photo?: string;

  @OneToMany(() => PetEntity, (pet) => pet.guardian, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  pets!: PetEntity[];

  @OneToOne(() => AddressEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address?: AddressEntity;

  constructor(
    id: number | undefined,
    name: string,
    password: string,
    phone: string,
    photo?: string,
    address?: AddressEntity
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.phone = phone;
    this.photo = photo;
    this.address = address;
  }

  static update(guardian: GuardianEntity, dto: IGuardianDto): void {
    if (dto.name !== undefined) {
      guardian.name = dto.name;
    }

    if (dto.phone !== undefined) {
      guardian.phone = dto.phone;
    }

    if (dto.password !== undefined) {
      guardian.password = dto.password;
    }

    if (dto.photo !== undefined) {
      guardian.photo = dto.photo;
    }

    if (dto.address !== undefined) {
      guardian.address = new AddressEntity(
        dto.address.id,
        dto.address.city,
        dto.address.state
      );
    }
  }

  static updateAddress(guardian: GuardianEntity, dto: IAddressDto) {
    if (guardian.address !== undefined) {
      if (dto.city !== undefined) {
        guardian.address.city = dto.city;
      }

      if (dto.state !== undefined) {
        guardian.address.state = dto.state;
      }
    }
  }
}
