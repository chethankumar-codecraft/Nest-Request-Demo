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
  UsePipes,
  ParseIntPipe,
  ParseUUIDPipe,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth_guard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ErrorsInterceptor } from 'src/interceptors/errors.interceptor';
import { FreezePipe } from 'src/pipes/freeze.pipe';
import { Public } from 'src/decorators/public.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('users')
// @UsePipes(FreezePipe)
// @Public()
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UseGuards(AuthGuard) // Apply the AuthGuard to this route
  // Apply the FreezePipe to this route
  create(@Body() createUserDto: CreateUserDto
) {
    // createUserDto.firstName = "Chethan";
    this.logger.log(
      `Creating a new user with data: ${JSON.stringify(createUserDto)}`,
    );
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @UseGuards(RolesGuard) // Apply the RolesGuard to all routes in this controller
  // @Roles(['admin']) // Require 'admin' role for all routes in this controller
  findAll(@Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number) {
  
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ErrorsInterceptor) // Apply both TransformInterceptor and ErrorsInterceptor to this route
  findOne(@Param('id') id: string) {
    if (id === '0') {
      throw new ForbiddenException('Invalid user ID');
    }
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Post('test')
  test(@Body('usernumber', ParseIntPipe) usernumber: number) {
    return 'Test endpoint';
  }
}
