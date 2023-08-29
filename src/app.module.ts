import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(), 
    TypeOrmModule,
    MongooseModule.forRoot(process.env.DATABASE_PASSWORD)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
