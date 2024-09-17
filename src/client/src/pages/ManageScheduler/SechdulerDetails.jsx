import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiExport } from "react-icons/tfi";
import { GoDotFill } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";
import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";
import exportToExcel from "../../utils/exportToExcel";
import { MdOutlineContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";
import axiosInstance from "../../utils/axiosInstance";

const Jobdetail = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [fleetName, setFleetName] = useState();
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [jobArn, setJobArn] = useState("");
  const [jobStatus, setJobStatus] = useState("true");
  const state = useSelector((state) => state.auth);
  const parms = useParams();

  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = (imei) => {
    copy(imei);
    messageApi.open({
      type: "success",
      content: "Text copied to clipboard!",
    });
  };

  useEffect(() => {
    getTaskDetails();
  }, []);

  const getTaskDetails = () => {
    axiosInstance.get(`/schedulers/${parms.id}`).then((res) => {
      if (res.data) {
        let task = res.data;
        setName(task.name);
        setDescription(task.description);
        setFleetName(JSON.parse(task.fleet).name);
        setFilteredDevices(JSON.parse(task.devices));
        getJobDetails(task.arn, JSON.parse(task.devices));
        setJobArn(task.arn);
        setJobStatus(task.status);
      }
    });
  };

  const getJobDetails = (arn, m_devices) => {
    axiosInstance
      .post(`/job-details`, {
        arn,
      })
      .then((res) => {
        let oldData = m_devices;

        oldData.map((x) => {
          res.data.map((y) => {
            if (x.arn === y.thingArn) {
              x.response = y.jobExecutionSummary.status;
            }
          });
        });
        setDevices(oldData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStopJob = () => {
    axiosInstance
      .post(`/stopJob`, {
        id: parms.id,
        arn: jobArn,
        type: "SCH",
      })
      .then((res) => {
        setJobStatus("false");
        messageApi.success("Job Stoped Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyUser = (value) => {
    axiosInstance
      .post(`/email/otp`, {
        email: state.email,
      })
      .then((res) => {
        console.log(res.data);
        document.getElementById("my_modal_2").showModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handle2FA = (response) => {
    console.log(response);
    if (response === true) {
      handleStopJob();
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    if (!value?.trim()) {
      setFilteredDevices(devices);
    } else {
      const results = devices.filter((device) =>
        device.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDevices(results);
    }
  };

  const ExportData = () => {
    const jobs = devices.map(({ name, fleet, imei, status }) => {
      return {
        name,
        fleet,
        imei,
        status,
      };
    });
    exportToExcel({
      data: jobs,
      filename: "schedular_devices.xlsx",
    });
  };

  const getCount = (state) => {
    let count = 0;
    let d = devices;

    d.map((x) => {
      if (state === x.response) {
        count++;
      }
    });

    return count;
  };

  return (
    <>
      {contextHolder}

      <TwoFactAuth handle2FA={handle2FA} />

      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-base-content/70 text-[18px]">
                <Link to="/manage-scheduler"> Task Scheduler </Link>
              </li>
              <li className="text-[18px]">{name}</li>
            </ul>
          </div>
          <div className="search-adminBox flex items-center justify-between w-[28rem]">
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                handleSearch
                className="input w-full w-40 rounded focus:outline-none focus:border-none focus:outline-offset-none"
                placeholder="Search Devices..."
                onChange={handleSearch}
              />
            </div>
            <div className="adminBtn flex">
              <div>
                <button
                  onClick={ExportData}
                  className="btn bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[17px] mr-4 hover:bg-slate-950 min-w-40"
                >
                  Export <TfiExport className="text-[24px]" />
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
                <button
                  className="btn bg-gray-200 text-gray-900 border rounded-[18px] border-gray-300 mr-3 mb-3 text-zinc-800 min-h-[36px] h-[40px] text-[16px] font-[500] landing-[35px] px-2 hover:bg-gray-300"
                  onClick={() => verifyUser()}
                  disabled={jobStatus === "true" ? false : true}
                >
                  Stop{" "}
                  <GoDotFill className="ml-2 text-[32px] text-[#FF2002] stroke-[5px] stroke-[#FF20024D]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div role="tablist" className="tabs tabs-boxed bg-white w-1/2">
            <a
              role="tab"
              className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
              onClick={() => setActiveTab(1)}
            >
              QUEUED ({getCount("QUEUED")})
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
              onClick={() => setActiveTab(2)}
            >
              IN PROGRESS ({getCount("IN_PROGRESS")})
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === 3 ? "tab-active" : ""}`}
              onClick={() => setActiveTab(3)}
            >
              SUCCEEDED ({getCount("SUCCEEDED")})
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === 4 ? "tab-active" : ""}`}
              onClick={() => setActiveTab(4)}
            >
              FAILED ({getCount("FAILED")})
            </a>
          </div>
        </div>

        {/* Table Start */}

        <div className="mt-6">
          <table className="table">
            <thead className="border-b-2 border-base-300">
              <tr className="text-[#B1B1B1] text-[15px] font-[700] landing-[35px]">
                <th>Device</th>
                <th>IMEI</th>
                <th>Job Status</th>
              </tr>
            </thead>
            <br />
            <tbody className="mt-3">
              {devices.map((x) => {
                if (activeTab === 1) {
                  if (x.response === "QUEUED") {
                    return (
                      <>
                        <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                          <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                            {x.name}
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer  ">
                            {/* {x.imei} */}
                            <div
                              className="flex items-center justify-start cursor-pointer"
                              onClick={() => handleCopy(x.imei)}
                            >
                              {x.imei}{" "}
                              <span className="ml-2 text-slate-400">
                                <MdOutlineContentCopy />
                              </span>
                            </div>
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-base-content/70">
                            {x.response}
                          </td>
                        </tr>
                        <br />
                      </>
                    );
                  }
                }
                if (activeTab === 2) {
                  if (x.response === "IN_PROGRESS") {
                    return (
                      <>
                        <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                          <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                            {x.name}
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer  ">
                            {/* {x.imei} */}
                            <div
                              className="flex items-center justify-start cursor-pointer"
                              onClick={() => handleCopy(x.imei)}
                            >
                              {x.imei}{" "}
                              <span className="ml-2 text-slate-400">
                                <MdOutlineContentCopy />
                              </span>
                            </div>
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-base-content/70">
                            {x.response}
                          </td>
                        </tr>
                        <br />
                      </>
                    );
                  }
                }
                if (activeTab === 3) {
                  if (x.response === "SUCCEEDED") {
                    return (
                      <>
                        <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                          <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                            {x.name}
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer  ">
                            {/* {x.imei} */}
                            <div
                              className="flex items-center justify-start cursor-pointer"
                              onClick={() => handleCopy(x.imei)}
                            >
                              {x.imei}{" "}
                              <span className="ml-2 text-slate-400">
                                <MdOutlineContentCopy />
                              </span>
                            </div>
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-base-content/70">
                            {x.response}
                          </td>
                        </tr>
                        <br />
                      </>
                    );
                  }
                }
                if (activeTab === 4) {
                  if (x.response === "FAILED") {
                    return (
                      <>
                        <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                          <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                            {x.name}
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer  ">
                            {/* {x.imei} */}
                            <div
                              className="flex items-center justify-start cursor-pointer"
                              onClick={() => handleCopy(x.imei)}
                            >
                              {x.imei}{" "}
                              <span className="ml-2 text-slate-400">
                                <MdOutlineContentCopy />
                              </span>
                            </div>
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-base-content/70">
                            {x.response}
                          </td>
                        </tr>
                        <br />
                      </>
                    );
                  }
                }
              })}
            </tbody>
          </table>
          {/* <div style={{ width: "100%" }}>
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Jobdetail;
