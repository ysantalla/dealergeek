import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from '@app/nestjs-casl';
import { accessibleRecordsPlugin } from '@casl/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { defineAbilityFor, USER_ABILITY } from './abilities';

import { CommonModule, DecimalScalar } from '@app/common';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

import { User, UserSchema } from './user.model';
import { BullModule } from '@nestjs/bull';

import { Env } from '../env';
import { UserController } from './user.controller';

@Module({
  imports: [
    CommonModule,
    CaslModule.register(defineAbilityFor, USER_ABILITY),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        collection: 'users',
        useFactory: () => {
          const schema = UserSchema;

          schema.plugin(accessibleRecordsPlugin);
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-cast-aggregation'));
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-delete'), { overrideMethods: true });

          return schema;
        },
      },
    ]),
    BullModule.registerQueueAsync({
      name: 'Upload_excel',
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get(Env.RedisHost),
          port: +configService.get(Env.RedisPort),
          password: configService.get(Env.RedisPassword),
          db: 1,
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [UserService, UserResolver, DecimalScalar],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
