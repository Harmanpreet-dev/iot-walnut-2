import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Breadcrumb, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import OTATable from "./OTATable";
import axiosInstance from "../../utils/axiosInstance";
import { RESET } from "../../redux/actions/otaAction";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import exportToExcel from "../../utils/exportToExcel";

export default function ManageOTAUpdate() {
  const navigate = useNavigate();
  const [OTAUpdates, setOTAUpdates] = useState([]);
  const [filteredOTAUpdates, setFilteredOTAUpdates] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getOTAUpdates();
    dispatch(RESET());
  }, []);

  const getOTAUpdates = () => {
    axiosInstance
      .get(`/ota-updates`)
      .then(({ data }) => {
        setOTAUpdates(data);
        setFilteredOTAUpdates(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchByDate = (_, dateString) => {
    if (dateString) {
      const results = OTAUpdates.filter(
        (task) =>
          new Date(task.created_at).toLocaleDateString() ===
          new Date(dateString).toLocaleDateString()
      );
      setFilteredOTAUpdates(results);
    } else {
      setFilteredOTAUpdates(OTAUpdates);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    if (!value?.trim()) {
      setFilteredOTAUpdates(OTAUpdates);
    } else {
      const results = OTAUpdates.filter(
        (task) =>
          task.name.toLowerCase().includes(value.toLowerCase()) ||
          JSON.parse(task.fleet)
            .name.toLowerCase()
            .includes(value.toLowerCase())
      );
      setFilteredOTAUpdates(results);
    }
  };

  const ExportData = () => {
    const flattenedData = [];
    OTAUpdates.forEach(
      ({ name, fleet, devices, description, json, created_at, status }) => {
        const tempDevices = JSON.parse(devices);
        let i = 0;
        tempDevices.forEach((device) => {
          flattenedData.push({
            name: i ? "" : name,
            fleet: i ? "" : JSON.parse(fleet).name,
            device_name: device.name,
            device_status: device.status,
            description: i ? "" : description,
            json: i ? "" : json,
            created_at: i ? "" : new Date(created_at).toLocaleString(),
            status: i ? "" : status,
          });
          i = i + 1;
        });
      }
    );
    exportToExcel({
      data: flattenedData,
      filename: "ota_update.xlsx",
    });
  };

  return (
    <div className="content-wrapper bg-base-200">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ title: "OTA Update" }]} />
        <div className="search-adminBox flex items-center justify-between space-x-2">
          <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 bg-base-100">
            <CiSearch className="text-[25px]" />
            <input
              className="input w-full w-40 rounded focus:outline-none focus:border-none focus:outline-offset-none"
              placeholder="Search OTA"
              onChange={handleSearch}
            />
          </div>
          <div className="border px-1 py-2 rounded-box bg-base-100 border border-base-content/20">
            <DatePicker
              onChange={handleSearchByDate}
              variant="borderless"
              className="cursor-pointer"
            />
          </div>
          <div className="border  py-2 rounded-box bg-base-100 border border-base-content/20">
            <Button type="secondary" onClick={ExportData}>
              <UploadOutlined className="text-[24px]" />
            </Button>
          </div>
          <div className="adminBtn flex">
            <div>
              <button
                className="btn bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[17px] mr-4 hover:bg-slate-950"
                onClick={() => navigate("/ota-select-fleet")}
              >
                Schedule OTA <FaPlus className="pl-2 text-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <OTATable navigate={navigate} OTAUpdates={filteredOTAUpdates} />
    </div>
  );
}
