import { Body, Controller, Get, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDto } from "./dtos/auth-user.dto";
import { ZodValidationPipe } from "nestjs-zod";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    @UsePipes(new ZodValidationPipe(AuthUserDto))
    async SignIn(@Body() authUserDto: AuthUserDto) {
        return this.authService.SignIn(authUserDto);
    }
}
