import React from "react";

import { Spin } from "antd";

export default function SchdulerTable({
  navigate,
  filteredTasks,
  loading,
  error,
}) {
  return (
    <>
      <Spin spinning={loading} fullscreen />
      <div className="mt-6">
        <div className="col-12">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="border-b-2 border-base-300">
                <tr className="text-[#B1B1B1] text-[15px] font-[700] leading-[35px]">
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Fleet</th>
                  <th>Date & Time</th>
                  <th>Task Status</th>
                </tr>
              </thead>
              <br />
              <tbody className="mt-3">
                {error ? (
                  <tr>
                    <td colSpan="5" className="text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-[20px] text-center">
                      No matching data found
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <React.Fragment key={task.id}>
                      <tr
                        className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20"
                        onClick={() => navigate(`/scheduler/${task.id}`)}
                      >
                        <td className="bg-base-100 rounded-l-[15px] cursor-pointer">
                          <div className="font-bold text-base-500 font-[900] text-[19px] leading-[35px]">
                            {task.name}
                          </div>
                        </td>
                        <td className="text-[16px] font-[500] leading-[35px] bg-base-100 cursor-pointer">
                          {task.description}
                        </td>
                        <td className="text-[16px] font-[500] leading-[35px] bg-base-100 cursor-pointer">
                          {JSON.parse(task.fleet).name}
                        </td>
                        <td className="text-[16px] font-[500] leading-[35px] bg-base-100 cursor-pointer">
                          {new Date(task.date).toLocaleDateString()} |{" "}
                          {task.time}
                        </td>
                        <td className="text-[16px] font-[500] leading-[35px] bg-base-100 text-gray-500 rounded-r-[15px]">
                          {task.status || "In Progress"}
                        </td>
                      </tr>
                      <br />
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
