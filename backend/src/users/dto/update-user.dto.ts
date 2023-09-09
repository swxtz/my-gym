import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("O email precisa ser válido"),

    userType: z.enum(["admin", "user"]).optional(),
});

export class UpdateUserDto extends createZodDto(schema) {}
