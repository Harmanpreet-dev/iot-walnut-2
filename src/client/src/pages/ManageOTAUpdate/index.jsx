import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Breadcrumb, DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";
import OTATable from "./OTATable";
import axiosInstance from "../../utils/axiosInstance";
import { RESET } from "../../redux/actions/OTAAction";
import { useDispatch } from "react-redux";

export default function ManageOTAUpdate() {
  const navigate = useNavigate();
  const [OTAUpdates, setOTAUpdates] = useState([]);
  const [filteredOTAUpdates, setFilteredOTAUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getOTAUpdates();
    dispatch(RESET());
  }, []);

  const getOTAUpdates = () => {
    setLoading(true);
    axiosInstance
      .get(`/OTA`)
      .then(({ data }) => {
        setLoading(false);
        setOTAUpdates(data);
        setFilteredOTAUpdates(data);
      })
      .catch(() => {
        setLoading(false);
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
            <Space direction="vertical">
              <DatePicker
                onChange={handleSearchByDate}
                variant="borderless"
                className="cursor-pointer"
              />
            </Space>
          </div>
          <div className="adminBtn flex">
            <div>
              <button
                className="btn bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-box flex items-center justify-between text-[17px] mr-4 hover:bg-slate-950"
                onClick={() => navigate("/ota-select-fleet")}
              >
                Schedule OTA <FaPlus className="pl-2 text-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <OTATable
        navigate={navigate}
        OTAUpdates={filteredOTAUpdates}
        loading={loading}
      />
    </div>
  );
}
