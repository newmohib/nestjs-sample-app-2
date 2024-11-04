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

  @Column({default: 0}) 
  recommendations: number;

  @JoinTable()
  // many to many relation
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // insert/update/delete
  })
  flavors: Flavor[];

  //   @Column('json', { nullable: true })
}
