import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import DevicetAddModal from "./DeviceAddModal";
import DeviceTable from "./DeviceTable";
import DeviceAddBlackModal from "./DeviceAddBlackModal";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export default function ManageDevices() {
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [filteredDevices, setFilteredDevices] = useState([]);

  let parms = useParams();

  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    getDevices();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, devices]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterItems = () => {
    if (searchQuery.trim() === "") {
      setFilteredDevices(devices);
      setError("");
    } else {
      const results = devices.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (results.length === 0) {
        setError("No matching data found.");
      } else {
        setError("");
      }
      setFilteredDevices(results);
    }
  };

  const getDevices = () => {
    axiosInstance
      .get(`/devices/fleet/${parms.fleet}`)
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
          <Breadcrumb
            items={[
              {
                title: <Link to="/manage-fleets">Fleets</Link>,
              },
              {
                title: parms.fleet,
              },
            ]}
          />
          <div className="search-adminBox flex items-center justify-between w-32rem]">
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                className="input w-full w-40 rounded focus:outline-none focus:border-none focus:outline-offset-none"
                placeholder="Search Devices.."
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
            {role === "0" ? (
              <>
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
              </>
            ) : null}
          </div>
        </div>
        {role === "0" ? (
          <>
            <div style={{ textAlign: "end", margin: "1rem" }}>
              <a href="#" target="_blank" className="sample_download">
                Download Sample file
              </a>
            </div>
          </>
        ) : null}

        <DeviceTable devices={filteredDevices} error={error} />
      </div>
    </>
  );
}
