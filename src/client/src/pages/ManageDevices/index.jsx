import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import DevicetAddModal from "./DeviceAddModal";
import DeviceTable from "./DeviceTable";
import DeviceAddBlackModal from "./DeviceAddBlackModal";
import { useParams } from "react-router-dom";

export default function ManageDevices() {
  const [devices, setDevices] = useState([]);
  let parms = useParams();

  const state = useSelector((state) => state.auth);

  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/getDevices`,
        { fleet: parms.fleet },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        setDevices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-[18px]">Fleets / Devices</li>
            </ul>
          </div>
          <div className="search-adminBox flex items-center justify-between w-32rem]">
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                className="input w-full w-40 rounded"
                placeholder="Search Device.."
              />
            </div>
            <div className="adminBtn flex">
              <div>
                <button
                  className="btn btn-neutral font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[14px] mr-4"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Add Whitelisting <FaPlus className="pl-2 text-[24px]" />
                </button>
                <DevicetAddModal getDevices={getDevices} />
                <DeviceAddBlackModal getDevices={getDevices} />
              </div>
              <div>
                <button
                  className="btn btn-neutral font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[14px] mr-4"
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                >
                  Add Blacklisting <FaPlus className="pl-2 text-[24px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <DeviceTable devices={devices} />
      </div>
    </>
  );
}
