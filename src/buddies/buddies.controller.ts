import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuddiesService } from './buddies.service';
import { CreateBuddyDto } from './dto/create-buddy.dto';
import { UpdateBuddyDto } from './dto/update-buddy.dto';

@Controller('buddies')
export class BuddiesController {
  constructor(private readonly buddiesService: BuddiesService) {}

  @Post()
  create(@Body() createBuddyDto: CreateBuddyDto) {
    return this.buddiesService.create(createBuddyDto);
  }

  @Get()
  findAll() {
    return this.buddiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buddiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuddyDto: UpdateBuddyDto) {
    return this.buddiesService.update(+id, updateBuddyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buddiesService.remove(+id);
  }
}
