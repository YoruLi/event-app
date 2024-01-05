import { svgs } from "@/data/svgs";

type IconType = keyof typeof svgs;
type NavLink = {
  label: string;
  route: string;
  icon: IconType;
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    route: "/home",
    icon: "home",
  },
  {
    label: "Create Events",
    route: "events/create",
    icon: "create",
  },

  {
    label: "Profile",
    route: "/profile",
    icon: "profile",
  },
];
