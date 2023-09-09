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
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ZodValidationPipe } from "nestjs-zod";
import { UsePipes } from "@nestjs/common/decorators";
import { GetAllUserDto } from "./dto/get-all-user.dto";
import { RemoveUserDto } from "./dto/remove-user.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

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

    @Get(":email")
    async findUser(@Param("email") email: string) {
        return this.usersService.findUser(email);
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
