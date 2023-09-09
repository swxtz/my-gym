import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("O email precisa ser válido"),
    password: z
        .string()
        .min(6, "A senha precisa ter no mínimo 6 caracteres")
        .max(255, "A senha precisa ter no máximo 255 caracteres"),
});

export class AuthUserDto extends createZodDto(schema) {}
