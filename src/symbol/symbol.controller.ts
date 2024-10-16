import { Controller, Get, HttpCode, Param, Put } from "@nestjs/common";
import { SymbolService } from "./symbol.service";
import { SymbolValidationPipe } from "./symbol-validation.pipe";

@Controller("stock")
export class SymbolController {
    constructor(private symbolService: SymbolService) {}

    @Get("/:symbol")
    async getSymbolData(@Param("symbol", SymbolValidationPipe) symbol: string) {
        return await this.symbolService.getMovingAverageForSymbol(symbol);
    }

    @Put("/:symbol")
    @HttpCode(204)
    async startPriceCheck(
        @Param("symbol", SymbolValidationPipe) symbol: string,
    ) {
        return await this.symbolService.startPriceTrackingForSymbol(symbol);
    }
}
