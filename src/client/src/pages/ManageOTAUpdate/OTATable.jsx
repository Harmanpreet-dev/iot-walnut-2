import React from "react";
import { Spin, Empty } from "antd";

export default function SchdulerTable({ navigate, OTAUpdates }) {
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
              {OTAUpdates.length ? (
                OTAUpdates?.map((OTAUpdate) => (
                  <>
                    <tr
                      key={OTAUpdate?.id}
                      className="shadow-[0_3.5px_5.5px_0_#00000005] h-20"
                      onClick={() => navigate(`/ota/${OTAUpdate?.id}`)}
                    >
                      <td className="bg-base-100 rounded-l-[15px] cursor-pointer">
                        <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                          {OTAUpdate.name}
                        </div>
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer">
                        {OTAUpdate.description}
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer">
                        {JSON.parse(OTAUpdate.fleet)?.name}
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer">
                        {new Date(OTAUpdate.created_at).toLocaleString()}
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer text-gray-500 rounded-r-[15px]">
                        {OTAUpdate.status || "In Progress"}
                      </td>
                    </tr>
                    <br key={new Date(OTAUpdate.created_at).toLocaleString()} />
                  </>
                ))
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
    </div>
  );
}
