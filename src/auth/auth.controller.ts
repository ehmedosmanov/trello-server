import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { AuthDto } from './dtos/auth.dto';
import { CurrentUser } from './decorators/current-user.decorator.dto';
import { AuthGuard } from '../guards/auth.guard';

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

  @Get('account')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({
    description: 'Getting user successfully',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  account(@CurrentUser() user: UserEntity) {
    return user;
  }
}
