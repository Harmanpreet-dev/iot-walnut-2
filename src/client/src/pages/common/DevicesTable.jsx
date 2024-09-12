import React from "react";
import { Empty } from "antd";
import { message } from "antd";
import copy from "copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";

export default function DevicesTable({ devices }) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = (imei) => {
    console.log("ok");
    copy(imei);
    messageApi.open({
      type: "success",
      content: "Text copied to clipboard!",
    });
  };

  return (
    <>
      {contextHolder}
      <div className="col-12">
        <div className="overflow-x-auto">
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
              {devices?.length ? (
                devices.map((x) => {
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
                          In progress
                        </td>
                      </tr>
                      <br />
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-[20px] text-center">
                    <Empty />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
