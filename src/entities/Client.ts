import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity("client")
export class Client extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  @Column({
    type: "numeric",
  })
  balance: number;

  @Column({
    default: true,
    name: "active",
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: { age: number; hair_color: string };

  @Column({
    type: "simple-array",
    default: null,
  })
  family_members: string[];

  constructor(
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    card_number: string,
    balance: number,
    is_active: boolean,
    family_members: string[]
  ) {
    super();
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.card_number = card_number;
    this.balance = balance;
    this.is_active = is_active;
    this.family_members = family_members;
  }
}
