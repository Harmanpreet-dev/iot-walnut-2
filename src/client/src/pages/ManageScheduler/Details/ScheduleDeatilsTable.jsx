import React from "react";

export default function ScheduleDeatilsTable({ devices }) {
  return (
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
            {devices.map((x) => {
              console.log(x);
              return (
                <>
                  <tr className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 ">
                    <td className="text-[20px] font-[700] landing-[35px] bg-base-100 cursor-pointer rounded-l-[15px] ">
                      {x.name}
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer  ">
                      {x.imei}
                    </td>
                    <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px] text-base-content/70">
                      In progress
                    </td>
                  </tr>
                  <br />
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
