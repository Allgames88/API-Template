import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TwitchLoginDTO } from './dto/twitch_login.dto';
import { ClientCredentialsAuthProvider, RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';
import { log } from 'console';
import { promises as fs } from 'fs';

@Injectable()
export class AuthService {

  constructor( 
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
    ){

  }
  
  async login(loginDTO: LoginDTO){
    const user = await this.usersService.findOneByEmail(loginDTO.email)
    if(!user){
      throw new UnauthorizedException('Invalid Credentials');
    }

    const truePasswd = await bcryptjs.compare(loginDTO.password, user.password);
    if(!truePasswd){
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { email: user.email };
    const email = user.email;
    const token = this.jwtService.signAsync(payload);
    console.log(token)

    const trueToken = await this.UnwrapToken(token);

    return {
      trueToken,
      email
    }
  }

  async UnwrapToken(token: Promise<string>){
    return (await token).valueOf();
  }

  async register({name, email, password}: RegisterDTO){
    const user = await this.usersService.findOneByEmail(email);
    if(user){
      throw new BadRequestException("User already exists in database.");
    }
    return await this.usersService.create({
      name, 
      email, 
      password: await bcryptjs.hash(password,10)
    });
  }


  async twitchLogin(twitchDTO: TwitchLoginDTO){
    // Get Token config data
    const tokenData = JSON.parse(await fs.readFile('./src/static/tokens.json','utf-8'));
    const clientSecret = tokenData.secret;
    var resultTokenData;
    // Auth provider:
    const authProvider = new RefreshableAuthProvider(
      new StaticAuthProvider(twitchDTO.name, tokenData.accessToken),{
        clientSecret,
        refreshToken: tokenData.refreshToken,
        expiry: tokenData.expiryTimestamp === null ? null : new Date(tokenData.expiryTimestamp),
        onRefresh: async({ accessToken, refreshToken, expiryDate }) => {
          const newTokenData = {
              accessToken,
              refreshToken,
              expiryTimestamp: expiryDate === null ? null : expiryDate.getTime()
          };
          resultTokenData = newTokenData;
        }
      }
    )
    
    return resultTokenData

  }
}
