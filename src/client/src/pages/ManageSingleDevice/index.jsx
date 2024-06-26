import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeviceDetails from "./DeviceDetails";
import DeviceGraphData from "./DeviceGraphData";
import DeviceTabsData from "./DeviceTabsData";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ManageSingleDevice() {
  const parms = useParams();
  const state = useSelector((state) => state.auth);
  const [device, serDevice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDeviceDetail();
  }, []);

  const getDeviceDetail = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/getDevice`,
        {
          name: parms.name,
        },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        serDevice(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="content-wrapper bg-base-200">
        <div>
          {loading ? (
            ""
          ) : (
            <>
              <div className="flex items-center">
                <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
                  <ul>
                    <li className="text-base-content/70 text-[18px]">
                      <Link to="/manage-fleets"> {device.fleet}</Link>
                    </li>
                    <li className="text-[18px]">{device.name}</li>
                  </ul>
                </div>
              </div>
              <DeviceDetails device={device} state={state} />

              <div className="mt-10">
                <DeviceTabsData />
                <DeviceGraphData />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
