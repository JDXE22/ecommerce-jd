import { SetMetadata } from "@nestjs/common";
import { Rol } from "../roles/roles.enum";

export const Roles = (...roles: Rol[])=> SetMetadata('roles', roles)