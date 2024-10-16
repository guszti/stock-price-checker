import { HttpException, Injectable } from "@nestjs/common";
import { CronJob } from "cron";
import { SymbolPriceResponse } from "./finnhub.interface";
import { ConfigService } from "@nestjs/config";
import { SchedulerRegistry } from "@nestjs/schedule";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class SymbolService {
    constructor(
        private configService: ConfigService,
        private schedulerRegistry: SchedulerRegistry,
        private dataBaseService: DatabaseService,
    ) {}

    private async fetchPricesForSymbol(
        symbol: string,
    ): Promise<SymbolPriceResponse> {
        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
            {
                headers: {
                    "X-Finnhub-Token":
                        this.configService.get<string>("FINNHUB_API_KEY"),
                },
            },
        );

        return response.json();
    }

    private async saveSymbolPrice(symbol: string) {
        const prices = await this.fetchPricesForSymbol(symbol);

        return this.dataBaseService.symbolPrice.create({
            data: {
                price: prices.c,
                symbol: {
                    connect: { name: symbol },
                },
            },
        });
    }

    private saveSymbolIfDoesntExist(symbol: string) {
        const nameColumn = { name: symbol };

        return this.dataBaseService.symbol.upsert({
            where: nameColumn,
            update: nameColumn,
            create: nameColumn,
        });
    }

    async startPriceTrackingForSymbol(symbol: string) {
        const jobName = `${symbol}_price_check`;
        const isAlreadyRunning = this.schedulerRegistry.doesExist(
            "cron",
            jobName,
        );

        if (isAlreadyRunning) {
            throw new HttpException(
                `A job for ${symbol} is already running`,
                400,
            );
        }

        await this.saveSymbolIfDoesntExist(symbol);

        const job = new CronJob(`* * * * *`, async () => {
            console.warn(`Checking prices for ${symbol}`);

            await this.saveSymbolPrice(symbol);
        });

        this.schedulerRegistry.addCronJob(jobName, job);

        job.start();

        console.warn(`job ${symbol} added`);
    }

    async getMovingAverageForSymbol(symbol: string) {
        const lastTenPrices = await this.dataBaseService.symbolPrice.findMany({
            where: { symbol: { name: symbol } },
            select: {
                price: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 10,
        });

        if (!lastTenPrices.length) {
            return "No data yet";
        }

        let priceSum = 0;

        lastTenPrices.forEach((symbolPrice) => (priceSum += symbolPrice.price));

        return {
            currentPrice: lastTenPrices[0].price,
            // there will be less then 10 prices at the beginning
            lastUpdated: lastTenPrices[0].createdAt,
            movingAverage: priceSum / lastTenPrices.length,
        };
    }
}
