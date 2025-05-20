import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;
  @Column()
  city: string;
  @Column()
  state: string;

  constructor(id: number | undefined, city: string, state: string) {
    this.id = id;
    this.city = city;
    this.state = state;
  }
}
