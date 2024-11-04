import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  // private coffees: Coffee[] = [
  //   {
  //     id: 1,
  //     name: 'Shipwreck Roast',
  //     brand: 'Buddy Brew',
  //     flavors: ['chocolate', 'vanilla'],
  //   },
  // ];

  // constructor
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  // findAll(): Coffee[] {
  findAll() {
    return this.coffeeRepository.find();
  }

  // find one coffee
  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOneBy({ id: +id });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
      //   throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  // create coffee
  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    const result = await this.coffeeRepository.save(coffee);
    return result;
  }

  // update coffee
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.save(coffee);

    // // const existingCoffee = this.findOne(id);

    // this.coffees = this.coffees.map((item) => {
    //   if (item.id === +id) {
    //     return { ...existingCoffee, ...updateCoffeeDto };
    //   }
    //   return item;
    // });
  }

  // delete coffee
  async remove(id: string) {
    const coffee = await this.coffeeRepository.findOneBy({ id: +id });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.remove(coffee);

    // this.findOne(id);
    // this.coffees = this.coffees.filter((item) => item.id !== +id);
  }
}
