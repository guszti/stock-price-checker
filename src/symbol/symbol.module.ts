import { Module } from "@nestjs/common";
import { SymbolController } from "./symbol.controller";
import { SymbolService } from "./symbol.service";
import { DatabaseModule } from "../database/database.module";
import { FinnhubModule } from "../finnhub/finnhub.module";

@Module({
    imports: [DatabaseModule, FinnhubModule],
    controllers: [SymbolController],
    providers: [SymbolService],
})
export class SymbolModule {}
