import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
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
import { AuthGuardUser } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

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
  @UseGuards(AuthGuardUser)
  update(
    @User() user: any,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto, user);
  }
}
