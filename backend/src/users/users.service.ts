import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import * as argon from "argon2";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import { GetAllUserDto } from "./dtos/get-all-user.dto";
import { RemoveUserDto } from "./dtos/remove-user.dto";

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
                userType: createUserDto?.userType,
            },
            select: {
                name: true,
                email: true,
            },
        });

        return user;
    }

    //TODO: Trocar a authenticação para JWT
    async findAll(data: GetAllUserDto) {
        const verifyUser = await this.prisma.user.findUnique({
            where: { email: data.email },
            select: {
                id: true,
                email: true,
                userType: true,
            },
        });

        if (!verifyUser) {
            throw new HttpException(
                "Usuário não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }

        if (verifyUser.userType !== "admin") {
            throw new HttpException(
                "Usuário não autorizado",
                HttpStatus.UNAUTHORIZED,
            );
        }

        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                userType: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findUser(data: any) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                userType: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            throw new HttpException(
                "Usuário não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }

        return user;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(email: string, updateUserDto: UpdateUserDto) {
        return `This action updates a user`;
    }

    async remove(data: RemoveUserDto) {
        const verifyUser = await this.prisma.user.findUnique({
            where: { email: data.adminEmail },
            select: {
                name: true,
                email: true,
                userType: true,
            },
        });

        if (!verifyUser || verifyUser.userType !== "admin") {
            throw new HttpException(
                "Usuário não autorizado",
                HttpStatus.UNAUTHORIZED,
            );
        }

        const user = await this.prisma.user.findUnique({
            where: { email: data.targetEmail },
            select: { id: true },
        });

        if (!user) {
            throw new HttpException(
                "Usuário não encontrado",
                HttpStatus.NOT_FOUND,
            );
        }

        await this.prisma.user.delete({
            where: { email: data.targetEmail },
        });

        const message = `Usuário deletado com sucesso por ${verifyUser.name}, ${verifyUser.email}`;
        return {
            message,
        };
    }
}
