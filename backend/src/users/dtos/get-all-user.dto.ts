import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Email inválido"),
});

export class GetAllUserDto extends createZodDto(schema) {}
