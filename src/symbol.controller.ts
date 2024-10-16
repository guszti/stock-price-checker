import { Controller, Get, Param, Put } from "@nestjs/common";
import { SymbolService } from "./symbol.service";

@Controller("stock")
export class SymbolController {
    constructor(private symbolService: SymbolService) {}

    @Get("/:symbol")
    async getSymbolData(@Param("symbol") symbol: string) {
        return "symbol data";
    }

    @Put("/:symbol")
    async startPriceCheck(@Param("symbol") symbol: string) {
        return this.symbolService.startPriceTracking("");
    }
}
