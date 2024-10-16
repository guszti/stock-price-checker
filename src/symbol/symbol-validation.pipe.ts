import { HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { FinnhubService } from "src/finnhub/finnhub.service";

@Injectable()
export class SymbolValidationPipe implements PipeTransform {
    constructor(private finnhubService: FinnhubService) {}

    // Fetch the company information,
    // if no data comes back we assume
    // that the symbol is invalid
    async transform(value: any) {
        const companyProfile =
            await this.finnhubService.fetchProfileForSymbol(value);

        if (!Object.keys(companyProfile).length) {
            throw new HttpException(`Invalid symbol "${value}"`, 400);
        }

        return value;
    }
}
