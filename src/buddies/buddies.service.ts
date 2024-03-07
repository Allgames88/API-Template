import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBuddyDto } from './dto/create-buddy.dto';
import { UpdateBuddyDto } from './dto/update-buddy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Buddy } from './entities/buddy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuddiesService {

  constructor( @InjectRepository(Buddy) private readonly repository: Repository<Buddy>){

  }

  async create(createBuddyDto: CreateBuddyDto) {

    try{
      // Create a new Buddy
      const bud = this.repository.create(createBuddyDto);
      //Save buddy
      this.repository.save(bud);
      // Return data
      return {
        data: bud,
        msg: "Añadido nuevo buddy",
        status: 200
      }
    }catch(error){
      console.log("Error ocurrido en la creación de un nuevo elemento para la base de datos.");
      throw new InternalServerErrorException("Un error ha ocurrido en la API");
    }
  }

  findAll() {
    return this.repository.find({})
  }

  async findOne(name: string) {
    const bud = await this.repository.findOneBy({ name });
    if(!bud){
      throw new NotFoundException(`Buddy with id ${name} wasnt been able to find`)
    }else{
      return bud;
    }
  }

  update(id: number, updateBuddyDto: UpdateBuddyDto) {
    return `This action updates a #${id} buddy`;
  }

  remove(id: number) {
    return `This action removes a #${id} buddy`;
  }
}
