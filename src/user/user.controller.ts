import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { AuthDto } from '../auth/dtos/auth.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'List of all users',
    type: [UserEntity],
  })
  findAll() {
    return this.userService.findAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'User successfully created',
    type: UserEntity,
  })
  @ApiBody({
    type: AuthDto,
    description: 'Data required for craeting user',
  })
  create(@Body() createUserDto: AuthDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiOkResponse({
    description: 'Getting user successfully',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by Id' })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  update(@Param('id') id: number, @Body() updateUserDto: AuthDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by Id' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
