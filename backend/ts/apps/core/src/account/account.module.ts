import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from '@app/nestjs-casl';
import { accessibleRecordsPlugin } from '@casl/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { defineAbilityFor, USER_ABILITY } from './abilities';
import { CommonModule, DecimalScalar } from '@app/common';

import { Account, AccountSchema } from './account.model';
import { BullModule } from '@nestjs/bull';

import { Env } from '../env';
import { AccountController } from './account.controller';
import { QueueName } from './account.enum';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { UploadExcelService } from './upload-excel.service';
import { UploadExcelProcessor } from './upload-excel.processor';

@Module({
  imports: [
    CommonModule,
    CaslModule.register(defineAbilityFor, USER_ABILITY),
    MongooseModule.forFeatureAsync([
      {
        name: Account.name,
        collection: 'accounts',
        useFactory: () => {
          const schema = AccountSchema;

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
      name: QueueName.SynchronizeData,
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
  providers: [
    AccountService,
    AccountResolver,
    DecimalScalar,
    UploadExcelService,
    UploadExcelProcessor,
  ],
  controllers: [AccountController],
  exports: [],
})
export class AccountModule {}
