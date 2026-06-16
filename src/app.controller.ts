import { BadRequestException, Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {


    return this.appService.getHello();
  }

  @Get('error')
  getError(): string {
    throw new Error('This is a test error');
  }

  @Get('custom-error')
  @UseFilters(new HttpExceptionFilter()) // Apply the HttpExceptionFilter to this route
  getCustomError(): string {
    throw new BadRequestException('This is a bad request message');
  }
}
