import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './db/db.config.service';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
