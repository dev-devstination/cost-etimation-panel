import { Role } from "@/features/users/enums"

export interface RoleResponse {
  Name: keyof IntlMessages["MembersPage"]["memberRole"]
}
