import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { AuthUserDto } from "./dtos/auth-user.dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    async SignIn(data: AuthUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
            select: {
                password: true,
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                userType: true,
            },
        });

        if (!user) {
            throw new HttpException(
                "Email ou Senha invalidas",
                HttpStatus.BAD_REQUEST,
            );
        }

        const verifyHash = await argon.verify(user.password, data.password);

        if (!verifyHash) {
            throw new HttpException(
                "Email ou Senha invalidas",
                HttpStatus.BAD_REQUEST,
            );
        }

        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            userType: user.userType,
        };

        return {
            token: await this.jwt.signAsync(payload),
        };
    }
}
