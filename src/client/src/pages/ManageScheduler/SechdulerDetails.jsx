import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiExport } from "react-icons/tfi";
import { GoDotFill } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import ScheduleDeatilsTable from "./Details/ScheduleDeatilsTable";

const tabBackgroundColors = {
  1: "rgb(34 197 94)",
  2: "rgb(249 115 22)",
  3: "rgb(220 38 38)",
};

const tabTextColors = {
  1: "rgb(220 252 231)",
  2: "rgb(253 230 138)",
  3: "rgb(254 202 202)",
};

const onChange = (key, setActiveTab) => {
  setActiveTab(key);
  console.log(key);
};

const Jobdetail = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [task, setTask] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [fleetName, setFleetName] = useState();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = useSelector((state) => state);
  const parms = useParams();

  useEffect(() => {
    getTaskDetails();
  }, []);

  const items = [
    {
      key: "1",
      label: "Success",
      children: <ScheduleDeatilsTable devices={[]} />,
    },
    {
      key: "2",
      label: "In Progress",
      children: <ScheduleDeatilsTable devices={devices} />,
    },
    {
      key: "3",
      label: "Failed",
      children: <ScheduleDeatilsTable devices={[]} />,
    },
  ];

  const getTaskDetails = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/getScheduleTask`,
        {
          id: parms.id,
        },
        {
          headers: {
            Authorization: state.auth.jwt,
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) {
          setTask(res.data[0]);
          let task = res.data[0];
          setName(task.name);
          setDescription(task.description);
          setFleetName(JSON.parse(task.fleet).name);
          setDevices(JSON.parse(task.devices));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Spin spinning={loading} fullscreen />
      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-base-content/70 text-[18px]">
                <Link to="/jobs"> Jobs </Link>
              </li>
              <li className="text-[18px]">{name}</li>
            </ul>
          </div>
          <div className="search-adminBox flex items-center justify-between w-[28rem]">
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                className="input w-full w-40 rounded focus:outline-none focus:border-none focus:outline-offset-none"
                placeholder="Search Fleet.."
              />
            </div>
            <div className="adminBtn flex">
              {/* First Button */}
              <div>
                <button className="btn bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[17px] mr-4 hover:bg-slate-950 min-w-40">
                  Export Job <TfiExport className="pl-2 text-[24px] stroke-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-start flex-col my-6 border-b-2 pb-4">
          <div className="text-[22px] font-[700] landing-[35px]">{name}</div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start mt-3">
              <div className="mr-2 text-[14px] font-[500] landing-[35px] text-base-content/70">
                Descripiton :{" "}
              </div>
              <div className="flex items-center justify-center text-[15px] font-500 landing-[35px] text-base-content/80">
                <span className="mr-2">{description}</span>{" "}
              </div>
            </div>

            <div className="flex items-center">
              <span className="flex items-center text-base-content/70 font-[500]">
                Fleet :
                <span className="ml-2 text-base-content font-[500]">
                  {fleetName}
                </span>
              </span>
              <div className="ml-5">
                <button className="btn bg-gray-200 text-gray-900 border rounded-[18px] border-gray-300 mr-3 mb-3 text-zinc-800 min-h-[36px] h-[40px] text-[16px] font-[500] landing-[35px] px-2 hover:bg-gray-300">
                  Stop{" "}
                  <GoDotFill className="ml-2 text-[32px] text-[#FF2002] stroke-[5px] stroke-[#FF20024D]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Start */}

        <div className="mt-6">
          <div style={{ width: "100%" }}>
            <Tabs
              defaultActiveKey="1"
              items={items.map((item, index) => ({
                ...item,
                label: (
                  <div
                    style={{
                      backgroundColor:
                        activeTab === item.key
                          ? tabBackgroundColors[item.key]
                          : "inherit",
                      color:
                        activeTab === item.key
                          ? tabTextColors[item.key]
                          : "inherit",
                      padding: activeTab === item.key ? "16px 0" : "0",
                      borderTopLeftRadius: index === 0 ? "20px" : "0",
                      borderRadius:
                        item.key === "1"
                          ? "20px 0 0 20px"
                          : item.key === items[items.length - 1].key
                          ? "0 20px 20px 0"
                          : "0",
                    }}
                  >
                    {item.label}
                  </div>
                ),
              }))}
              onChange={(key) => onChange(key, setActiveTab)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobdetail;
