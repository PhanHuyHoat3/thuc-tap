export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
  }
  
  export interface User {
    id: string;
    email: string;
    name?: string;
    role: Role;
  }