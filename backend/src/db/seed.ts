import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";

const prisma = new PrismaClient();

async function seed() {
    const id = [
        "8ceb220f-ace5-477e-b536-876fce91693c",
        "8ceb220f-ace5-477e-b536-876fce91693d",
        "8ceb220f-ace5-477e-b536-876fce91693e",
    ];

    const jonh = {
        id: id[0],
        name: "Jonh Doe",
        email: "john.doe@example.com",
        password: "123456",
    };

    const jona = {
        id: id[1],
        name: "Jona Doe",
        email: "jona.doe@example.com",
        password: "123456",
    };

    const admin = {
        id: id[2],
        name: "Admin",
        email: "dev@admin.com",
        password: "123456",
    };

    console.time("Seed");

    await prisma.user.deleteMany();

    await Promise.all([
        await prisma.user.create({
            data: {
                name: jonh.name,
                email: jonh.email,
                password: await argon.hash(jonh.password),
                userType: "user",
            },
        }),

        await prisma.user.create({
            data: {
                name: jona.name,
                email: jona.email,
                password: await argon.hash(jona.password),
                userType: "user",
            },
        }),

        await prisma.user.create({
            data: {
                name: admin.name,
                email: admin.email,
                password: await argon.hash(admin.password),
                userType: "admin",
            },
        }),
    ]);

    console.timeEnd("Seed");
    console.log("Seed completed");
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
