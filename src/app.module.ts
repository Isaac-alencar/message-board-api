import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
