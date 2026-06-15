import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  UseInterceptors,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth_guard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ErrorsInterceptor } from 'src/interceptors/errors.interceptor';

@Controller('users')
export class UsersController {
  private logger=new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UseGuards(AuthGuard) // Apply the AuthGuard to this route
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating a new user with data: ${JSON.stringify(createUserDto)}`);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(RolesGuard) // Apply the RolesGuard to all routes in this controller
  @Roles(['admin']) // Require 'admin' role for all routes in this controller
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ErrorsInterceptor) // Apply the ErrorInterceptor to this route
  findOne(@Param('id') id: string) {
    if(id==='0'){
      throw new ForbiddenException('Invalid user ID');
    }
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
