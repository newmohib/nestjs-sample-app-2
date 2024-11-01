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

@Controller('coffees')
export class CoffeesController {

//   @Get()
//   getAll(@Res() response) {
//     response.status(HttpStatus.OK).send('This action returns all coffees');
//     //return 'This action returns all coffees';
//   }

@Get()
  getAll(@Query() paginationQuery) {
    const {limit, offset}= paginationQuery;
    return `This action returns all coffees. Limit: ${limit}, Offset: ${offset}`;
  }

  @Get(':id')
  getOne(@Param() param) {
    return `This action returns #${param.id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() body) {
    return body;
  }

// Patch is used for partial updates
  @Patch(':id')
  update(@Param('id') id:string, @Body() body) {
    return `This action updates #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id:string) {
    return `This action removes #${id}`;
  }
   
}
