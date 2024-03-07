import { Module } from '@nestjs/common';
import { BuddiesService } from './buddies.service';
import { BuddiesController } from './buddies.controller';
import { Buddy } from './entities/buddy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BuddiesController],
  providers: [BuddiesService],
  imports:[
    TypeOrmModule.forFeature([Buddy])
  ]
})
export class BuddiesModule {}
