export interface Roles {
  isResident?: boolean;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  isGuard?: boolean;
}

export interface User {
  id: string;
  apartment?: string;
  name: string;
  email: string;
  roles: Roles;
}