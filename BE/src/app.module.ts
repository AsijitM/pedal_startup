// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), TasksModule],
})
export class AppModule {}
