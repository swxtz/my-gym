import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const port = process.env.PORT || 3333;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
    console.log(`🚀 server is running at http://localhost:${port}`);
}
bootstrap();
