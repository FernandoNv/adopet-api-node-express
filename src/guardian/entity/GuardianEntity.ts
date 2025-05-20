import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IGuardianDto } from "./GuardianDto";

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
  @Column({ nullable: true })
  address?: string;

  constructor(
    id: number | undefined,
    name: string,
    password: string,
    phone: string,
    photo?: string,
    address?: string
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
      guardian.address = dto.address;
    }
  }
}
