"use client"

import { SETTINGS_NAVLINKS } from "@/constants"
import Sidebar from "@/components/sidebar"

export const SettingsSidebar = () => {
  return <Sidebar navLinks={SETTINGS_NAVLINKS} />
}
