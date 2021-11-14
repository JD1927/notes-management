export interface Roles {
  isResident?: boolean;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  isGuard?: boolean;
}

export interface User {
  id: string;
  aptoID?: string;
  apartment?: string;
  name?: string;
  email: string;
  phoneNumber: string;
  roles: Roles;
}

export interface SignUpRequest {
  email: string;
  phoneNumber: string;
  password: string;
}
