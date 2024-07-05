import React from "react";

export default function SchdulerTable({ navigate }) {
  return (
    <div className="mt-6">
      <div className="col-12">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="border-b-2 border-base-300">
              <tr className="text-[#B1B1B1] text-[15px] font-[700] landing-[35px]">
                <th>Task Name</th>
                <th>Description</th>
                <th>Fleet</th>
                <th>Date & Time</th>
                <th>Task Status</th>
              </tr>
            </thead>
            <br />
            <tbody className="mt-3">
              <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
                <td
                  className="bg-base-100 rounded-l-[15px] cursor-pointer"
                  onClick={() => navigate("/jobdetail")}
                >
                  <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                    Task 1
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
