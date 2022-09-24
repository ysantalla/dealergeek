import { CaslService } from './casl.service';
import { Module, DynamicModule } from '@nestjs/common';

export const ROOT_ABILITY = 'CaslService';

@Module({})
export class CaslModule {
  static registeredTokens = {};
  static register(
    defineAbilityFor: (user: any) => any,
    injectionToken: string = ROOT_ABILITY,
  ): DynamicModule {
    const errorMessage = `${injectionToken} is already provided, must be unique.`;
    if (this.registeredTokens[injectionToken]) {
      throw new Error(errorMessage);
    } else {
      this.registeredTokens[injectionToken] = true;
      return {
        module: CaslModule,
        providers: [
          {
            provide: injectionToken,
            useFactory: () => {
              return new CaslService(defineAbilityFor);
            },
          },
        ],
        exports: [injectionToken],
      };
    }
  }
}
