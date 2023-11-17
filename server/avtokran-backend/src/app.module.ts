import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AtGuard } from './users/common/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';
import { MachinesModule } from './machines/machines.module';
import { ContractsModule } from './contracts/contracts.module';
import { TestimonialsModule } from './testimonials/testimonials.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://127.0.0.1:27017/avtokranPodemDB',
      })
    }),
    JwtModule.register({}),
    MachinesModule,
    ContractsModule,
    TestimonialsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    
  ],
})
export class AppModule { }
