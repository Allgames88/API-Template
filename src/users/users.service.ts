import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly jwtService: JwtService
  ){ }

  async create(createUserDto: CreateUserDto) {
    try{
      // Create a new usr
      const usr = this.repository.create(createUserDto);
      usr.active = true;
      //Save usr
      this.repository.save(usr);
      // Return data
      return {
        data: usr,
        msg: "Añadido nuevo User",
        status: 200
      }
    }catch(error){
      console.log("Error ocurrido en la creación de un nuevo elemento para la base de datos.");
      throw new InternalServerErrorException("Un error ha ocurrido en la API");
    }
  }

  async findOneByEmail(email:string){
    const usr = await this.repository.findOneBy({ email });
    if(usr){
      return usr;
    }
  }

  findAll() {
    return this.repository.find({})
  }

  async findOneByID(id: number) {
    const usr = await this.repository.findOneBy({ id });
    if(!usr){
      throw new NotFoundException(`User with id ${id} wasnt been able to find`)
    }else{
      return usr;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
