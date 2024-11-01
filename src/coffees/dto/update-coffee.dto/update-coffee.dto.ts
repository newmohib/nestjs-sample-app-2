import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "../create-coffee.dto/create-coffee.dto";

// PartialType will make all properties optional and will not throw error if any property is missing
// code is optimized 
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

// export class UpdateCoffeeDto {
//     readonly name?: string;
//     readonly brand?: string;
//     readonly flavors?: string[];
// }
