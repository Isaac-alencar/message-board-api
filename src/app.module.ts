import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsService } from './sessions/sessions.service';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'config/database/message_board_api.db', // Specify the database file path
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Load your entities
      synchronize: true, // Automatically create tables (use with caution in production)
      logging: true, // Enable logging for debugging
    }),
    UsersModule,
    SessionsModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class AppModule {}
