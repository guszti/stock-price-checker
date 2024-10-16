import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { SymbolModule } from "./symbol/symbol.module";
import { DatabaseModule } from "./database/database.module";

@Module({
    imports: [
        SymbolModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ScheduleModule.forRoot(),
        DatabaseModule,
    ],
})
export class AppModule {}
