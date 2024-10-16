import { Module } from "@nestjs/common";
import { SymbolController } from "./symbol.controller";
import { ConfigModule } from "@nestjs/config";
import { SymbolService } from "./symbol.service";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [SymbolController],
    providers: [SymbolService],
})
export class AppModule {}
