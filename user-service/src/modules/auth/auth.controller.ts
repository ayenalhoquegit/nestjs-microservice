import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcValidationFilter } from 'src/rpc-validation.filter';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
@UseFilters(new RpcValidationFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @MessagePattern({ cmd: 'auth' })
  create(@Payload() authDto: AuthDto) {
    const { username, password } = authDto;
    return this.authService.validateUser(username, password);
  }
}
