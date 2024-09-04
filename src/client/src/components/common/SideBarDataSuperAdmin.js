import { FleetSVG, SchdulerSVG, User2SVG, UserSVG, OTAUpdate } from "./SVGIcon";
import { HiOutlineViewGrid } from "react-icons/hi";

export let SideBarDataSuperAdmin = [
  // {
  //   id: 0,
  //   name: "Dashboard",
  //   link: "/dashboard",
  //   svg: <FleetSVG />,
  // },
  {
    id: 1,
    name: "Manage Admin",
    link: "/manage-admin",
    svg: <UserSVG />,
  },
  {
    id: 2,
    name: "Manage User",
    link: "/manage-user",
    svg: <User2SVG />,
  },

  {
    id: 3,
    name: "Categories",
    link: "/manage-category",
    svg: <HiOutlineViewGrid />,
  },
  {
    id: 4,
    name: "Fleets",
    link: "/manage-fleets",
    svg: <FleetSVG />,
  },
  {
    id: 5,
    name: "Task Scheduler",
    link: "/manage-scheduler",
    svg: <SchdulerSVG />,
  },
  {
    id: 6,
    name: "OTA Update",
    link: "/manage-ota-update",
    svg: <OTAUpdate />,
  },
  {
    id: 7,
    name: "Logger",
    link: "/manage-logger",
    svg: <FleetSVG />,
  },
];
