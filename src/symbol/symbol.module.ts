import { Module } from "@nestjs/common";
import { SymbolController } from "./symbol.controller";
import { SymbolService } from "./symbol.service";
import { DatabaseService } from "../database/database.service";

@Module({
    controllers: [SymbolController],
    providers: [SymbolService, DatabaseService],
})
export class SymbolModule {}
