import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService){
    
    }
    @Get()
    getAllCats() {
        return this.catService.findAll;
    }
    @Get(':id')
    findOne(@Param('name') name: string): string {
    return `This action returns a ${name} cat`;
    }
    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    createOne(@Body() body : {name:string}) {
        return body;
    }
    @delete('id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteOne(@Body() body : {name:string}) {
        return body;
    }
}
