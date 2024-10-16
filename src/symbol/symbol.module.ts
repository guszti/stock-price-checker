import { Module } from "@nestjs/common";
import { SymbolController } from "./symbol.controller";
import { SymbolService } from "./symbol.service";
import { DatabaseService } from "../database/database.service";
import { FinnhubService } from "src/finnhub/finnhub.service";

@Module({
    controllers: [SymbolController],
    providers: [SymbolService, DatabaseService, FinnhubService],
})
export class SymbolModule {}
