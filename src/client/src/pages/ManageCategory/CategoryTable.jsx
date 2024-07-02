import React from "react";
import { GoDotFill } from "react-icons/go";

export default function CategoryTable({ categories }) {
  const TableRow = ({ name, active, inactive, total }) => {
    return (
      <>
        <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
          <td className="bg-base-100 rounded-l-[15px] ">
            <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
              {name}
            </div>
          </td>
          <td className="text-[16px] font-[500] landing-[35px] bg-base-100">
            {active}
          </td>
          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 ">
            {inactive}
          </td>
          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 rounded-r-[15px] ">
            {total}
          </td>
        </tr>
        <br />
      </>
    );
  };
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
                    Inactive Devices
                  </spa>
                </th>
                <th>Total Devices</th>
              </tr>
            </thead>
            <br />
            <tbody className="mt-3">
              {categories.map((x) => {
                let { id, name } = x;
                return (
                  <TableRow
                    key={id}
                    name={name}
                    active="27682"
                    inactive="27682"
                    total="27682832"
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
