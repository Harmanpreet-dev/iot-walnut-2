import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Layout() {
  const [activeSidebar, setActiveSidebar] = useState(true);

  const navigate = useNavigate();
  const { islogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!islogin) {
      navigate("/");
    }
  }, [islogin]);

  const handleToggle = () => {
    setActiveSidebar(!activeSidebar);
  };

  return (
    <div>
      <div
        className={`drawer ${
          activeSidebar === true ? "drawer-open" : "drawer-close"
        }`}
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-200">
          <Header handleToggle={handleToggle} />
          <div>
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
