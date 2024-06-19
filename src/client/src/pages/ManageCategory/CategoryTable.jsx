import React from "react";
import { GoDotFill } from "react-icons/go";

export default function CategoryTable() {
  return (
    <div className="mt-6">
      <div className="col-12">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="border-b-2 border-base-300">
              <tr className="text-[#B1B1B1] text-[15px] font-[700] landing-[35px] ">
                <th>Category</th>
                <th>
                  <span className="flex">
                    <GoDotFill className="text-[#51DCA8] mr-1" />
                    Active Devices
                  </span>
                </th>
                <th>
                  <spa className="flex">
                    <GoDotFill className="text-[#FF2002] mr-1" />
                    nactive Devices
                  </spa>
                </th>
                <th>Total Devices</th>
              </tr>
            </thead>
            <br />
            <tbody className="mt-3">
              <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
                <td className="bg-base-100 rounded-l-[15px] ">
                  <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                    Solar
                  </div>
                </td>
                <td className="text-[16px] font-[500] landing-[35px] bg-base-100">
                  27682
                </td>
                <td className="text-[16px] font-[500] landing-[35px] bg-base-100 ">
                  27682
                </td>
                <td className="text-[16px] font-[500] landing-[35px] bg-base-100 rounded-r-[15px] ">
                  27682832
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
