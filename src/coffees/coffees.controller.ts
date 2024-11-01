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

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

//   @Get()
//   getAll(@Res() response) {
//     response.status(HttpStatus.OK).send('This action returns all coffees');
//     //return 'This action returns all coffees';
//   }

@Get()
  getAll(@Query() paginationQuery) {
    const {limit, offset}= paginationQuery;
    // return `This action returns all coffees. Limit: ${limit}, Offset: ${offset}`;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  getOne(@Param() param) {
    // return `This action returns #${param.id} coffee`;
    return this.coffeesService.findOne(param.id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() body) {
    // return body;
    return this.coffeesService.create(body);
  }

// Patch is used for partial updates
  @Patch(':id')
  update(@Param('id') id:string, @Body() body) {
    // return `This action updates #${id}`;
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id:string) {
    // return `This action removes #${id}`;
    return this.coffeesService.remove(id);
  }
   
}
