import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  //   @Get()
  //   getAll(@Res() response) {
  //     response.status(HttpStatus.OK).send('This action returns all coffees');
  //     //return 'This action returns all coffees';
  //   }

  @Get()
  getAll(@Query() paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    // return `This action returns all coffees. Limit: ${limit}, Offset: ${offset}`;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  getOne(@Param() param) {
    // return `This action returns #${param.id} coffee`;
    return this.coffeesService.findOne(param.id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;
    // it will console true due to class validation transformation
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    
    console.log({ createCoffeeDto });

    return this.coffeesService.create(createCoffeeDto);
  }

  // Patch is used for partial updates
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeeDto) {
    // return `This action updates #${id}`;
    return this.coffeesService.update(id, updateCoffeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action removes #${id}`;
    return this.coffeesService.remove(id);
  }
}
