import { CategorySVG, FleetSVG, UserSVG } from "./SVGIcon";
import { HiOutlineViewGrid } from "react-icons/hi";

export let SideBarData = [
  {
    id: 1,
    name: "Manage Admin",
    link: "/manage-admin",
    svg: <UserSVG />,
  },
  {
    id: 2,
    name: "Categories",
    link: "/manage-category",
    svg: <HiOutlineViewGrid />,
  },
  {
    id: 3,
    name: "Fleets",
    link: "/manage-fleets",
    svg: <FleetSVG />,
  },
  {
    id: 3,
    name: "Jobs",
    link: "/manage-jobs",
    svg: <FleetSVG />,
  },
];
