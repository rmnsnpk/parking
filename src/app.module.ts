import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ParkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
