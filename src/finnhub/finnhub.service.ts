import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SymbolPriceResponse } from "./finnhub.interface";

@Injectable()
export class FinnhubService {
    constructor(private configService: ConfigService) {}

    private async fetchData(url: string) {
        try {
            const response = await fetch(url, {
                headers: {
                    "X-Finnhub-Token":
                        this.configService.get<string>("FINNHUB_API_KEY"),
                },
            });

            return response.json();
        } catch (e) {
            throw new HttpException(`Failed to fetch data from ${url}`, 500);
        }
    }

    fetchPricesForSymbol(symbol: string): Promise<SymbolPriceResponse> {
        return this.fetchData(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
        );
    }

    async fetchProfileForSymbol(symbol: string) {
        return this.fetchData(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}`,
        );
    }
}
