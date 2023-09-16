import { Test, TestingModule } from "@nestjs/testing";
import { DecoratorService } from "./decorator.service";

describe("DecoratorService", () => {
    let service: DecoratorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DecoratorService],
        }).compile();

        service = module.get<DecoratorService>(DecoratorService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
