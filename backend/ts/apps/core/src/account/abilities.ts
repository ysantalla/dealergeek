import { AbilityBuilder, Ability } from '@casl/ability';
import { haveRoles, Role, UserSigned } from '@app/common';

export const USER_ABILITY = 'USER_ABILITY';

export const enum Abilities {
  manage = 'manage',
  update = 'update',
  create = 'create',
  delete = 'delete',
  read = 'read',
}

export const enum Subjects {
  all = 'all',
  Account = 'Account',
}

export function defineAbilityFor(account: UserSigned) {
  const { can, build } = new AbilityBuilder(Ability);
  if (haveRoles(account, Role.Admin)) {
    can(Abilities.manage, Subjects.all);
  }

  return build();
}
