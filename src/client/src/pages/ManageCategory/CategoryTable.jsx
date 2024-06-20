import React from "react";
import { GoDotFill } from "react-icons/go";

export default function CategoryTable({ categories }) {
  const TableRow = ({ name }) => {
    return (
      <>
        <tr className="shadow-[0_3.5px_5.5px_0_#00000005]">
          <td className="bg-base-100 rounded-l-[15px]">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-base-500 font-[500] text-[19px] landing-[35px]">
                  {name}
                </div>
              </div>
            </div>
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
                <th>Category Name</th>
              </tr>
            </thead>
            <br />
            <tbody className="mt-3">
              {categories.map((x) => {
                let { id, name } = x;
                return <TableRow id={id} name={name} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
