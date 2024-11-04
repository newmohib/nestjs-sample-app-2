import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity('coffee') // sql table === coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  // many to many relation
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees)
  flavors: string[];

  //   @Column('json', { nullable: true })
}
