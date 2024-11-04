"use client"

import { ACCOUNT_NAVLINKS } from "@/constants"
import Sidebar from "@/components/sidebar"

export const AccountSidebar = () => {
  return <Sidebar navLinks={ACCOUNT_NAVLINKS} />
}
