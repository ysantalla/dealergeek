import { Ability } from '@casl/ability';

export class CaslService {
  constructor(private readonly defineAbilityFor: (user) => any) {}

  ability(user: any): Ability {
    return this.defineAbilityFor(user);
  }

  can(user: any, action: string, subject: any) {
    const ability = this.ability(user);
    return ability.can(action, subject);
  }

  relevantRuleFor(user: any, action: string, subject: any) {
    const ability = this.ability(user);
    return ability.relevantRuleFor(action, subject);
  }

  cannot(user: any, action: string, subject: any) {
    const ability = this.ability(user);
    return ability.cannot(action, subject);
  }
}
