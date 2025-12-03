import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from '@concepta/nestjs-auth-jwt';

@Controller('test')
export class TestController {
  @Get('protected')
  @UseGuards(AuthJwtGuard)
  getProtected(): string {
    return 'This is a protected route!';
  }

  @Get('public')
  getPublic(): string {
    return 'This is a public route!';
  }
}
