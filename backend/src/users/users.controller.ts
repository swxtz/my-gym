import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { ZodValidationPipe } from "nestjs-zod";
import { Headers, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { GetAllUserDto } from "./dtos/get-all-user.dto";
import { RemoveUserDto } from "./dtos/remove-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { UtilsService } from "src/utils/utils.service";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtUtils: UtilsService,
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(CreateUserDto))
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get("/all")
    @UsePipes(new ZodValidationPipe(GetAllUserDto))
    async findAll(@Body() findAllUserDto: GetAllUserDto) {
        return this.usersService.findAll(findAllUserDto);
    }

    @Get("")
    @UseGuards(AuthGuard)
    async findUser(@Headers("Authorization") jwt: any) {
        const token = this.jwtUtils.getToken(jwt);
        return this.usersService.findUser(token);
    }

    @Patch(":email")
    @UsePipes(new ZodValidationPipe(CreateUserDto))
    async update(
        @Param("email") email: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(email, updateUserDto);
    }

    @Delete()
    @UsePipes(new ZodValidationPipe(RemoveUserDto))
    async remove(@Body() removeUserDto: RemoveUserDto) {
        return this.usersService.remove(removeUserDto);
    }
}
