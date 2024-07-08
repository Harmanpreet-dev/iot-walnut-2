import React from "react";
import { CiSearch } from "react-icons/ci";
import { TfiExport } from "react-icons/tfi";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

export default function SechdulerDetails() {
  // const navigate = useNavigate();
  return (
    <>
      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-base-content/70 text-[18px]">
                <Link to="/jobs"> Jobs </Link>
              </li>
              <li className="text-[18px]">Job 1</li>
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
          <div className="text-[22px] font-[700] landing-[35px]">Job 1</div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start mt-3">
              <div className="mr-2 text-[14px] font-[500] landing-[35px] text-base-content/70">
                Descripiton :{" "}
              </div>
              <div className="flex items-center justify-center text-[15px] font-500 landing-[35px] text-base-content/80">
                <span className="mr-2">Firmware Update V2</span>{" "}
              </div>
            </div>

            <div className="flex items-center">
              <span className="flex items-center text-base-content/70 font-[500]">
                Fleet :
                <span className="ml-2 text-base-content font-[500]">
                  Fleet Name 1
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
          <div className="col-12">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="border-b-2 border-base-300">
                  <tr className="text-[#B1B1B1] text-[15px] font-[700] landing-[35px]">
                    <th>Device</th>
                    <th>Job Status</th>
                  </tr>
                </thead>
                <br />
                <tbody className="mt-3">
                  {/* row 1 */}

                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                    <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                      Device 1
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-base-content/70">
                      In progress
                    </td>
                  </tr>
                  <br />

                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                    <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                      Device 2
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-[#FF2002]">
                      Failed
                    </td>
                  </tr>
                  <br />
                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                    <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                      Device 3
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-[#14B111]">
                      Success
                    </td>
                  </tr>
                  <br />
                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                    <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                      Device 4
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-[#F0A81D]">
                      In progress
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
}
