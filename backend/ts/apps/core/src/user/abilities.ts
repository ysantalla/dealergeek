import { AbilityBuilder, Ability } from '@casl/ability';
import { haveRoles, Role, UserSigned } from '@app/common';

export const USER_ABILITY = 'USER_ABILITY';

export const enum Abilities {
  manage = 'manage',
  update = 'update',
  create = 'create',
  delete = 'delete',
  read = 'read',
  ban = 'ban',
  changePassword = 'changePassword',
  leniaAuth = 'leniaAuth',
}

export const enum Subjects {
  all = 'all',
  User = 'User',
}

export function defineAbilityFor(user: UserSigned) {
  const { can, build } = new AbilityBuilder(Ability);
  if (haveRoles(user, Role.Admin)) {
    can(Abilities.manage, Subjects.all);
  }

  return build();
}
