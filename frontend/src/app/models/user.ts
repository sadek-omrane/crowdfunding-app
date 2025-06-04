export class User {
  id?:number;
  name?: string;
  username?: string;
  email?: string;
  roles?: Role[];

  // function to check if the user has a specific role
  hasRole(roleName: string): boolean {
    return this.roles ? this.roles.some(role => role.name === roleName) : false;
  }

  // function to check if the user has a specific permission
  hasPermission(permission: string): boolean {
    return this.roles ? this.roles.some(role => role.permissions && role.permissions.includes(permission)) : false;
  }
}

export class Role {
  id?: number;
  name?: string;
  permissions?: string[];
}
