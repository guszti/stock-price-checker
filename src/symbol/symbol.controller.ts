import { Controller, Get, HttpCode, Param, Put } from "@nestjs/common";
import { SymbolService } from "./symbol.service";

@Controller("stock")
export class SymbolController {
    constructor(private symbolService: SymbolService) {}

    @Get("/:symbol")
    async getSymbolData(@Param("symbol") symbol: string) {
        return await this.symbolService.getMovingAverageForSymbol(symbol);
    }

    @Put("/:symbol")
    @HttpCode(204)
    async startPriceCheck(@Param("symbol") symbol: string) {
        return await this.symbolService.startPriceTrackingForSymbol(symbol);
    }
}
