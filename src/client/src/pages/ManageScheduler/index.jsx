import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Breadcrumb, DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";
import SchdulerTable from "./SchdulerTable";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default function ManageScheduler() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
          <div className="search-adminBox flex items-center justify-between w-32rem]">
            <div className="border px-4 py-2 rounded-[20px] bg-base-100 border border-base-content/20">
              <Space direction="vertical">
                <DatePicker
                  onChange={onChange}
                  variant="borderless"
                  className="cursor-pointer"
                />
              </Space>
            </div>
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                className="input w-full w-40 rounded focus:outline-none focus:border-none focus:outline-offset-none"
                placeholder="Search Fleet or Device.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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

        <SchdulerTable navigate={navigate} searchQuery={searchQuery} />
      </div>
    </>
  );
}
