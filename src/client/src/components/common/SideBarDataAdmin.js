import { FleetSVG, SchdulerSVG, User2SVG } from "./SVGIcon";

export let SideBarDataAdmin = [
  {
    id: 4,
    name: "Fleets",
    link: "/manage-fleets",
    svg: <FleetSVG />,
  },
  {
    id: 2,
    name: "Manage User",
    link: "/manage-user",
    svg: <User2SVG />,
  },
  {
    id: 5,
    name: "Task Scheduler",
    link: "/manage-scheduler",
    svg: <SchdulerSVG />,
  },
];
