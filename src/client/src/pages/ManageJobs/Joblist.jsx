import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const Joblist = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-[18px]">Jobs</li>
            </ul>
          </div>
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
                placeholder="Search Fleet.."
              />
            </div>
            <div className="adminBtn flex">
              <div>
                <button
                  className="btn bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[17px] mr-4 hover:bg-slate-950"
                  onClick={() => navigate("/assignfleetjob")}
                >
                  Create Job <FaPlus className="pl-2 text-[24px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Start */}

        <div className="mt-6">
          <div className="col-12">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="border-b-2 border-base-300">
                  <tr className="text-[#B1B1B1] text-[15px] font-[700] landing-[35px]">
                    <th>Job Name</th>
                    <th>Description</th>
                    <th>Fleet</th>
                    <th>Date & Time</th>
                    <th>Job Status</th>
                  </tr>
                </thead>
                <br />
                <tbody className="mt-3">
                  {/* row 1 */}

                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
                    <td
                      className="bg-base-100 rounded-l-[15px] cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                        Job 1
                      </div>
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      Firmware Update V2
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      Fleet 2
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      June 7, 2024 | 03:45 PM
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 text-gray-500 rounded-r-[15px]">
                      Stopped
                    </td>
                  </tr>
                  <br />
                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
                    <td
                      className="bg-base-100 rounded-l-[15px] cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                        Job 2
                      </div>
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      Firmware Update V1
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      Fleet 2
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      June 7, 2024 | 03:45 PM
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 text-[#FF2002] rounded-r-[15px]">
                      Failed
                    </td>
                  </tr>
                  <br />
                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
                    <td
                      className="bg-base-100 rounded-l-[15px] cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                        Job 3
                      </div>
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      Firmware Update VN
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      Fleet 2
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      June 7, 2024 | 03:45 PM
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 text-[#14B111] rounded-r-[15px]">
                      Success
                    </td>
                  </tr>
                  <br />

                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
                    <td
                      className="bg-base-100 rounded-l-[15px] cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                        Job 4
                      </div>
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      Firmware Update V3
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      Fleet 2
                    </td>
                    <td
                      className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer"
                      onClick={() => navigate("/jobdetail")}
                    >
                      June 7, 2024 | 03:45 PM
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 text-[#F0A81D] rounded-r-[15px]">
                      In Progess
                    </td>
                  </tr>
                  <br />
                </tbody>
              </table>
            </div>
          </div>

          {/* Table End */}
        </div>
      </div>
    </>
  );
};

export default Joblist;
