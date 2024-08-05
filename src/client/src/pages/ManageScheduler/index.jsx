import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Breadcrumb, DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";
import SchdulerTable from "./SchdulerTable";
import { useSelector } from "react-redux";
import axios from "axios";
import exportToExcel from "../../utils/exportToExcel";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function ManageScheduler() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredUpdates, setFilteredUpdates] = useState([]);

  const state = useSelector((state) => state);

  useEffect(() => {
    getScheduleTask();
  }, []);

  const getScheduleTask = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/getScheduleTask`, {
        headers: {
          Authorization: state.auth.jwt,
        },
      })
      .then((res) => {
        setLoading(false);
        setTasks(res.data);
        setFilteredUpdates(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to load tasks");
        console.log(err);
      });
  };

  const handleSearchByDate = (_, dateString) => {
    if (dateString) {
      const results = tasks.filter(
        (task) =>
          new Date(task.date).toLocaleDateString() ===
          new Date(dateString).toLocaleDateString()
      );
      setFilteredUpdates(results);
    } else {
      setFilteredUpdates(tasks);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    if (!value?.trim()) {
      setFilteredUpdates(tasks);
    } else {
      const results = tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(value.toLowerCase()) ||
          JSON.parse(task.fleet)
            .name.toLowerCase()
            .includes(value.toLowerCase())
      );
      setFilteredUpdates(results);
    }
  };

  const ExportData = () => {
    setLoading(true);
    const flattenedData = [];

    tasks.forEach(
      ({ name, fleet, devices, description, json, date, time, status }) => {
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
            created_at: i
              ? ""
              : `${
                  (new Date(date).toLocaleString(),
                  new Date(time).toLocaleString())
                }`,
            status: i ? "" : status,
          });
          i = i + 1;
        });
      }
    );
    exportToExcel({
      data: flattenedData,
      filename: "schedular.xlsx",
    });
    setLoading(false);
  };

  return (
    <>
      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <Breadcrumb
            items={[
              {
                title: "Scheduler",
              },
            ]}
          />
          <div className="search-adminBox flex items-center justify-between space-x-2">
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                className="input w-full w-40 rounded focus:outline-none focus:border-none focus:outline-offset-none"
                placeholder="Search Schedular"
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
            <div className="border py-2 rounded-box bg-base-100 border border-base-content/20">
              <Button type="secondary" onClick={ExportData}>
                <UploadOutlined className="text-[24px]" />
              </Button>
            </div>
            <div className="adminBtn flex">
              <div>
                <button
                  className="btn bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[17px] mr-4 hover:bg-slate-950"
                  onClick={() => navigate("/schdule-select-fleet")}
                >
                  Schedule Task <FaPlus className="pl-2 text-[24px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <SchdulerTable
          loading={loading}
          error={error}
          navigate={navigate}
          filteredTasks={filteredUpdates}
        />
      </div>
    </>
  );
}
