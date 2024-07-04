import React from "react";
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
import IemiUpload from "../components/common/IemiUpload";
import Joblist from "../pages/ManageJobs/Joblist";

const routerAdmin = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="/" element={<Layout />}>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/manage-admin" element={<ManageAdmin />}></Route>
        <Route path="/manage-category" element={<ManageCategory />}></Route>
        <Route path="/manage-fleets" element={<ManageFleets />}></Route>
        <Route
          path="/manage-devices/:fleet"
          element={<ManageDevices />}
        ></Route>
        <Route path="/device/:name" element={<ManageSingleDevice />}></Route>
        <Route path="/manage-jobs" element={<Joblist />}></Route>
      </Route>
    </>
  )
);

const Router = () => {
  return (
    <div>
      <RouterProvider router={routerAdmin} />
    </div>
  );
};

export default Router;
