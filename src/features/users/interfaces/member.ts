import { Role } from "@/features/users/enums"

export interface Member {
  id: string
  email: string
  role: Role
  active: boolean
}
