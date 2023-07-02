import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBadRequestResponse({ description: 'data is wrong please verify' })
  @Post('signup')
  signup(@Body() createUserDto: SignupDto) {
    return this.usersService.signup(createUserDto);
  }

  @ApiBadRequestResponse({ description: 'data is wrong please verify' })
  @Post('signin')
  signin(@Body() createUserDto: SigninDto) {
    return this.usersService.signin(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiNotFoundResponse({ description: 'Not found user with this id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBadRequestResponse({ description: 'data is wrong please verify' })
  @ApiNotFoundResponse({ description: 'Not found user with this id' })
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.usersService.update(+id);
  }

  @ApiNotFoundResponse({ description: 'Not found user with this id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
