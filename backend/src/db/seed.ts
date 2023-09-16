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
    console.time("Users");
    await prisma.exercises.deleteMany();
    await prisma.workout.deleteMany();
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

    console.timeEnd("Users");

    const workout = [
        {
            name: "workout 1",
            description: "workout 1 description",
            Exercises: [
                {
                    name: "exercise 1",
                    description: "exercise 1 description",
                    sets: 3,
                    reps: 10,
                    restTime: 60,
                    weight: 100,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
                {
                    name: "exercise 2",
                    description: "exercise 2 description",
                    sets: 3,
                    reps: 10,
                    restTime: 60,
                    weight: 100,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
                {
                    name: "exercise 3",
                    description: "exercise 3 description",
                    sets: 3,
                    reps: 10,
                    restTime: 60,
                    weight: 100,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
            ],
        },
        {
            name: "workout 2",
            description: "workout 2 description",
            Exercises: [
                {
                    name: "exercise 1",
                    description: "exercise 1 description",
                    sets: 3,
                    reps: 10,
                    restTime: 60,
                    weight: 100,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
                {
                    name: "exercise 2",
                    description: "exercise 2 description",
                    sets: 3,
                    reps: 10,
                    restTime: 60,
                    weight: 100,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
                {
                    name: "exercise 3",
                    description: "exercise 3 description",
                    sets: 3,
                    reps: 10,
                    restTime: 60,
                    weight: 100,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
            ],
        },
    ];

    console.time("Workouts");
    await Promise.all([
        await prisma.workout.create({
            data: {
                name: workout[0].name,
                description: workout[0].description,
                type: "strength",
                Exercises: {
                    create: [
                        {
                            name: workout[0].Exercises[0].name,
                            description: workout[0].Exercises[0].description,
                            muscleGroup: "chest",
                            sets: workout[0].Exercises[0].sets,
                            reps: workout[0].Exercises[0].reps,
                            restTime: workout[0].Exercises[0].restTime,
                            weight: workout[0].Exercises[0].weight,
                            weightUnit: "kg",
                            videoUrl: workout[0].Exercises[0].videoUrl,
                        },
                        {
                            name: workout[0].Exercises[1].name,
                            description: workout[0].Exercises[1].description,
                            muscleGroup: "chest",
                            sets: workout[0].Exercises[1].sets,
                            reps: workout[0].Exercises[1].reps,
                            restTime: workout[0].Exercises[1].restTime,
                            weight: workout[0].Exercises[1].weight,
                            weightUnit: "kg",
                            videoUrl: workout[0].Exercises[1].videoUrl,
                        },
                        {
                            name: workout[0].Exercises[2].name,
                            description: workout[0].Exercises[2].description,
                            muscleGroup: "chest",
                            sets: workout[0].Exercises[2].sets,
                            reps: workout[0].Exercises[2].reps,
                            restTime: workout[0].Exercises[2].restTime,
                            weight: workout[0].Exercises[2].weight,
                            weightUnit: "kg",
                            videoUrl: workout[0].Exercises[2].videoUrl,
                        },
                    ],
                },
            },
        }),

        await prisma.workout.create({
            data: {
                name: workout[1].name,
                description: workout[1].description,
                type: "strength",
                Exercises: {
                    create: [
                        {
                            name: workout[1].Exercises[0].name,
                            description: workout[1].Exercises[0].description,
                            muscleGroup: "chest",
                            sets: workout[1].Exercises[0].sets,
                            reps: workout[1].Exercises[0].reps,
                            restTime: workout[1].Exercises[0].restTime,
                            weight: workout[1].Exercises[0].weight,
                            weightUnit: "kg",
                            videoUrl: workout[1].Exercises[0].videoUrl,
                        },
                        {
                            name: workout[1].Exercises[1].name,
                            description: workout[1].Exercises[1].description,
                            muscleGroup: "chest",
                            sets: workout[1].Exercises[1].sets,
                            reps: workout[1].Exercises[1].reps,
                            restTime: workout[1].Exercises[1].restTime,
                            weight: workout[1].Exercises[1].weight,
                            weightUnit: "kg",
                            videoUrl: workout[1].Exercises[1].videoUrl,
                        },
                        {
                            name: workout[1].Exercises[2].name,
                            description: workout[1].Exercises[2].description,
                            muscleGroup: "chest",
                            sets: workout[1].Exercises[2].sets,
                            reps: workout[1].Exercises[2].reps,
                            restTime: workout[1].Exercises[2].restTime,
                            weight: workout[1].Exercises[2].weight,
                            weightUnit: "kg",
                            videoUrl: workout[1].Exercises[2].videoUrl,
                        },
                    ],
                },
            },
        }),
    ]);
    console.timeEnd("Workouts");
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
