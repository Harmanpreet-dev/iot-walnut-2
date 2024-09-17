import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeviceDetails from "./DeviceDetails";
import DeviceGraphData from "./DeviceGraphData";
import DeviceTabsData from "./DeviceTabsData";
import { useSelector } from "react-redux";
import { Breadcrumb, Spin } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export default function ManageSingleDevice() {
  const parms = useParams();
  const state = useSelector((state) => state.auth);
  const [device, serDevice] = useState([]);

  useEffect(() => {
    getDeviceDetail();
  }, []);

  const getDeviceDetail = () => {
    axiosInstance
      .post(`/getDevice`, {
        name: parms.name,
      })
      .then((res) => {
        serDevice(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content-wrapper bg-base-200">
      <div className="flex items-center">
        <Breadcrumb
          items={[
            {
              title: <Link to="/manage-fleets">Fleets</Link>,
            },
            {
              title: (
                <Link to={`/manage-devices/${device.fleet}`}>
                  {device.fleet}
                </Link>
              ),
            },
            {
              title: device.name,
            },
          ]}
        />
      </div>
      <DeviceDetails
        getDeviceDetail={getDeviceDetail}
        device={device}
        state={state}
      />

      <div className="mt-10">
        <DeviceTabsData />
        <DeviceGraphData />
      </div>
    </div>
  );
}
