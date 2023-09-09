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

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.usersService.remove(+id);
    }
}
