export type role = "admin" | "customer" | "kitchen" | "salesman";

export interface decoded {
  exp: number;
  iat: number;
  name: string;
  role: role;
}
