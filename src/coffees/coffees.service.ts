import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [{
        id: 1,
        name: 'Shipwreck Roast',
        brand: 'Buddy Brew',
        flavors: ['chocolate', 'vanilla']
    }]

    // findAll(): Coffee[] {
    findAll() {
        return this.coffees;
    }

    // find one coffee
    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if (!coffee) {
            throw new Error(`Coffee #${id} not found`);
        }
        return coffee;
    }

    // create coffee
    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
    }

    // update coffee
    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        this.coffees = this.coffees.map(item => {
            if (item.id === +id) {
                return {...existingCoffee, ...updateCoffeeDto};
            }
            return item;
        });
    }

    // delete coffee
    remove(id: string) {
        this.findOne(id);
        this.coffees = this.coffees.filter(item => item.id !== +id);
    }
}
