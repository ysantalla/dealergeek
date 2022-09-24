import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';

import {
  MongooseCommonConfig,
  HealthController,
  CommonModule,
} from '@app/common';

import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user';

import { Env } from './env';

@Module({
  imports: [
    UserModule,
    TerminusModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: async () => ({
        debug: true,
        introspection: true,
        autoSchemaFile: true,
        path: 'core/api/graphql',
        plugins: [ApolloServerPluginInlineTraceDisabled()],
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(Env.Mongo),
        ...MongooseCommonConfig,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
