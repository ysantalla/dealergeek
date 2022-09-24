import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { GqlExceptionFilter, GqlContextType } from '@nestjs/graphql';
import { ApolloError, UserInputError } from 'apollo-server-express';

@Catch()
export class CatchAllExceptionFilter implements GqlExceptionFilter {
  logger = new Logger(CatchAllExceptionFilter.name);

  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      // do something that is only important in the context of GraphQL requests

      if (exception.name === 'MongoServerError' && exception.code === 11000) {
        const errors: string[] = exception.message.split(':');

        return new UserInputError('Mongo unique key error');
      }

      return new ApolloError('Internal Error');
    }

    // do something that is only important in the context of regular HTTP requests (REST)
    const response = host.switchToHttp().getResponse();

    this.logger.log(exception);

    response.status(500).send({
      message: 'Internal Error',
    });
  }
}
