"use client"

import { MAIN_NAVLINKS } from "@/constants"
import Sidebar from "@/components/sidebar"

export const MainSidebar = () => {
  return <Sidebar navLinks={MAIN_NAVLINKS} />
}
