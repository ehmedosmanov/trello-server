import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/user.entity';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
@ApiTags('Auth')  
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign up a new user' }) 
  @ApiOkResponse({
    description: 'User successfully signed up',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data or user already exists',
  })
  @ApiBody({
    type: AuthDto,
    description: 'Data required for signing up',
  })
  signUp(@Body() body: AuthDto) {
    return this.authService.signUp(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiOkResponse({
    description: 'User successfully logged in',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
  })
  @ApiBody({
    type: AuthDto,
    description: 'Data required for logging in',
  })
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }
}
