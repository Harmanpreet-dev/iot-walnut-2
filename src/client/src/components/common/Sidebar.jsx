import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SideBarDataSuperAdmin } from "./SideBarDataSuperAdmin";
import { useSelector } from "react-redux";
import { SideBarDataAdmin } from "./SideBarDataAdmin";

const Sidebar = () => {
  const [sideBarDataState, setSideBarDataState] = useState([]);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role === "0") {
      setSideBarDataState(SideBarDataSuperAdmin);
    }
    if (role === "1") {
      setSideBarDataState(SideBarDataAdmin);
    }
  }, []);

  return (
    <div>
      <div className="hidden lg:block">
        <div className="leftmenu-wrapper ">
          <div className="flex h-[6rem] items-center justify-start bg-base-100 shadow px-[12px] sticky top-0 z-10">
            <div className="inline">
              <img
                alt="darkLogo"
                loading="lazy"
                width="170px"
                height="50px"
                decoding="async"
                className="hidden dark:inline"
                color="color:transparent"
                srcSet="/images/Walnut-Medical-Logo.png 1x , /images/Walnut-Medical-Logo.png 2x"
                src="/images/Walnut-Medical-Logo.png.png"
              />
              <img
                alt="darkLogo"
                loading="lazy"
                width="170px"
                height="50px"
                decoding="async"
                className="inline dark:hidden"
                color="color:transparent"
                srcSet="/images/Walnut-Medical-Logo.png 1x , /images/Walnut-Medical-Logo.png 2x"
                src="/imagesWalnut-Medical-Logo.png"
              />
            </div>
          </div>

          <div className="hidden lg:block overflow-x-hidden px-[10px] bg-base-200 h-screen ">
            <ul className="menu mb-6">
              <li className="menu-title font-medium text-[17px] text-base-content leading-[35px] pt-[30px] pl-0 pb-5">
                Main Menu
              </li>

              {sideBarDataState.map((x, i) => {
                let { name, link, svg } = x;
                return (
                  <li className="mb-0.5 effect" key={i}>
                    <NavLink
                      to={link}
                      className="px-2 py-4 text-base-600 text-[15px] font-[400] leading-[22px]"
                    >
                      <div className="flex items-center gap-2 iconsSet">
                        {svg} {name}
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
