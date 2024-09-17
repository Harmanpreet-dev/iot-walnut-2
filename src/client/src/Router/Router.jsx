import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import ManageAdmin from "../pages/ManageAdmin";
import Layout from "../components/Layout";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/Profile/ChangePassword";
import ManageCategory from "../pages/ManageCategory";
import ManageFleets from "../pages/ManageFleets";
import Settings from "../pages/Profile/Settings";
import ManageDevices from "../pages/ManageDevices";
import ManageSingleDevice from "../pages/ManageSingleDevice";
import ManageScheduler from "../pages/ManageScheduler";
import ManageOTAUpdate from "../pages/ManageOTAUpdate";
import SchduleSelectFleet from "../pages/ManageScheduler/SchduleSelectFleet";
import LayoutWithoutSidebar from "../components/LayoutWithoutSidebar";
import SchduleSelectDevice from "../pages/ManageScheduler/SchduleSelectDevice";
import SchduleTask from "../pages/ManageScheduler/SchduleTask";
import SechdulerDetails from "../pages/ManageScheduler/SechdulerDetails";
import Manageuser from "../pages/ManageUser";
import Loggers from "../pages/ManageLogger/LoggerTable";
import OTASelectFleet from "../pages/ManageOTAUpdate/OTASelectFleet";
import OTASelectDevice from "../pages/ManageOTAUpdate/OTASelectDevice";
import OTAUpdate from "../pages/ManageOTAUpdate/OTAUpdate";
import OTADetails from "../pages/ManageOTAUpdate/OTADetails";
import SwaggerDocs from "../components/common/SwaggerDocs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const routerAdmin = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="/" element={<Layout />}>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/api-docs" element={<SwaggerDocs />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/manage-admin" element={<ManageAdmin />}></Route>
        <Route path="/manage-user" element={<Manageuser />}></Route>
        <Route path="/manage-category" element={<ManageCategory />}></Route>
        <Route path="/manage-fleets" element={<ManageFleets />}></Route>
        <Route
          path="/manage-devices/:fleet"
          element={<ManageDevices />}
        ></Route>
        <Route path="/device/:name" element={<ManageSingleDevice />}></Route>
        <Route path="/manage-scheduler" element={<ManageScheduler />}></Route>
        <Route path="/scheduler/:id" element={<SechdulerDetails />}></Route>
        <Route path="/manage-ota-update" element={<ManageOTAUpdate />}></Route>
        <Route path="/ota/:id" element={<OTADetails />}></Route>
        <Route path="/manage-logger" element={<Loggers />}></Route>
      </Route>
      <Route path="/" element={<LayoutWithoutSidebar />}>
        <Route
          path="/schdule-select-fleet"
          element={<SchduleSelectFleet />}
        ></Route>
        <Route
          path="/schdule-select-device"
          element={<SchduleSelectDevice />}
        ></Route>
        <Route path="/schdule-task" element={<SchduleTask />}></Route>
        <Route path="/ota-select-fleet" element={<OTASelectFleet />}></Route>
        <Route path="/ota-select-device" element={<OTASelectDevice />}></Route>
        <Route path="/ota-update" element={<OTAUpdate />}></Route>
      </Route>
    </>
  )
);

const Router = () => {
  const loader = useSelector((state) => state.loader);

  return (
    <>
      {<Spin spinning={loader?.loading} fullscreen />}
      <RouterProvider router={routerAdmin} />;
    </>
  );
};

export default Router;
