import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SymbolService {
    constructor(private configService: ConfigService) {}

    async startPriceTracking(symbol: string) {
        return 0;
    }
}
