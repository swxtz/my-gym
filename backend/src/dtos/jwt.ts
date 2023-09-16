export class jwtDto {
    sub: string;
    name: string;
    email: string;
    avatarUrl: string;
    userType: "admin" | "user";
    iat: number;
    exp: number;
    token: string;
}
// export declare class JwtService {
//     private readonly jwt;
//     constructor(jwt: JwtService);
//     sign(payload: jwtDto): string;
//     decode(token: string, options?: jwt.DecodeOptions): jwtDto | string;
// }
