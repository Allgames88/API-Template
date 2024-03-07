import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto'
import { LoginDTO } from './dto/login.dto';
import { TwitchLoginDTO } from './dto/twitch_login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginDTO: LoginDTO
  ){
    return this.authService.login(loginDTO);
  }

  @Post('register')
  register(@Body() registerDTO: RegisterDTO){
    
    return this.authService.register(registerDTO);
  }

  @Post('twitch')
  twitch(@Body() twitchDTO: TwitchLoginDTO){

    return this.authService.twitchLogin(twitchDTO);
  }
}
