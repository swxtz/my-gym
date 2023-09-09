import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import * as argon from "argon2";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const verifyUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });

        if (verifyUser) {
            throw new HttpException(
                "Email já cadastrado",
                HttpStatus.BAD_REQUEST,
            );
        }

        const hash = await argon.hash(createUserDto.password);

        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: hash,
                name: createUserDto.name,
            },
            select: {
                name: true,
                email: true,
            },
        });

        return user;
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
