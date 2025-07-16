import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import Avatar from "@/assets/avatar.png"


const sidebarNav = [
  { title: "Dashboard", url: "/dashboard", icon: SquareTerminal },
  { title: "My Investments", url: "/dashboard/my-investments", icon: PieChart },
  { title: "My Directs", url: "/dashboard/my-directs", icon: Bot },
  { title: "My Team Report", url: "/dashboard/my-team-report", icon: Map },
  { title: "My Referral Bonus", url: "/dashboard/my-referral-bonus", icon: BookOpen },
  { title: "My Level Bonus", url: "/dashboard/my-level-bonus", icon: BookOpen },
  { title: "My ROI Bonus", url: "/dashboard/my-roi-bonus", icon: BookOpen },
  { title: "Transfer", url: "/dashboard/transfer", icon: Settings2 },
  { title: "My Rewards Income", url: "/dashboard/my-rewards-income", icon: AudioWaveform },
  { title: "My Staking Claim Bonus", url: "/dashboard/my-staking-claim-bonus", icon: Frame },
  { title: "My Withdraw Staking Token", url: "/dashboard/my-withdraw-staking-token", icon: GalleryVerticalEnd },
]

const user = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  avatar: Avatar,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open } = useSidebar(); 
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to="/" className={`flex items-center space-x-2 hover:opacity-80 transition-all hover:bg-primary/50 hover:text-white ${open&&"p-2"} rounded-md duration-300`}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>{open && (
            <span className="text-xl font-jakarta text-foreground">SPLOSH</span>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className="w-full">
        <NavMain items={sidebarNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
