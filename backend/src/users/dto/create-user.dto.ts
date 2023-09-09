import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
    name: z
        .string()
        .min(3, "O nome precisa de pelo menos 3 caracteres")
        .max(255, "O nome não pode ter mais de 255 caracteres"),
    email: z.string().email("O email precisa ser válido"),
    password: z
        .string()
        .min(6, "A senha precisa de pelo menos 6 caracteres")
        .max(255, "A senha não pode ter mais de 255 caracteres"),
});

export class CreateUserDto extends createZodDto(schema) {}
