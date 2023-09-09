import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
    adminEmail: z.string().email("O email precisa ser válido"),
    targetEmail: z.string().email("O email precisa ser válido"),
});

export class RemoveUserDto extends createZodDto(schema) {}
