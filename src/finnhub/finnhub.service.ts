import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SymbolPriceResponse } from "./finnhub.interface";

@Injectable()
export class FinnhubService {
    constructor(private configService: ConfigService) {}

    async fetchPricesForSymbol(symbol: string): Promise<SymbolPriceResponse> {
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

    async fetchProfileForSymbol(symbol: string) {
        const response = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}`,
            {
                headers: {
                    "X-Finnhub-Token":
                        this.configService.get<string>("FINNHUB_API_KEY"),
                },
            },
        );

        return response.json();
    }
}
