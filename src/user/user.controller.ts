import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { AuthDto } from '../auth/dtos/auth.dto';
import { ColumnEntity } from '../column/column.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
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
  findOne(@Param('id', ParseIntPipe) id: number) {
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
  @ApiBody({ type: AuthDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: AuthDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by Id' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  // @Get(':id/columns')
  // @ApiOperation({ summary: 'Get all columns by user Id' })
  // @ApiOkResponse({
  //   description: 'List of all columns by the user',
  //   type: [ColumnEntity],
  // })
  // getUserColumns(@Param('id', ParseIntPipe) userId: number) {
  //   return this.userService.findUserColumns(userId);
  // }

  // @Delete(':userId/columns/:id')
  // @ApiOperation({ summary: 'Delete a column by userId and own id' })
  // @ApiOkResponse({ description: 'Column deleted successfully' })
  // @ApiNotFoundResponse({ description: 'User or column not found' })
  // deleteColumnByUser(
  //   @Param('userId', ParseIntPipe) userId: number,
  //   @Param('id', ParseIntPipe) id: number,
  // ) {
  //   return this.userService.deleteColumnsByUser(userId, id);
  // }
}
