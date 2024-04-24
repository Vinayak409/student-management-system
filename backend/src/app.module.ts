import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './Users/users.module';
import { DatabaseModule } from './database/database.module';
import { StudentsModule } from './Students/studetns.module';

@Module({
  imports: [DatabaseModule, UsersModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
