import { Role } from '../role';
import { intersection } from 'lodash';

export const haveRoles = (
  user: { roles?: Role[] },
  roles: Role[] | Role,
): boolean => {
  const userRoles = user?.roles || [];
  return Array.isArray(roles)
    ? Boolean(intersection(userRoles, roles).length)
    : userRoles.includes(roles);
};

export const haveAllRoles = (
  user: { roles?: Role[] },
  roles: Role[] | Role,
): boolean => {
  const userRoles = user.roles || [];
  return Array.isArray(roles)
    ? intersection(userRoles, roles).length === roles.length
    : userRoles.includes(roles);
};
