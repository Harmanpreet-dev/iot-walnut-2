import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useSelector } from "react-redux";

export default function SchdulerTable({ navigate }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = useSelector((state) => state);

  useEffect(() => {
    getScheduleTask();
  }, []);

  const getScheduleTask = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/getScheduleTask`, {
        headers: {
          Authorization: state.auth.jwt,
        },
      })
      .then((res) => {
        setLoading(false);
        setTasks(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Spin spinning={loading} fullscreen />
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
                {tasks.map((x) => (
                  <>
                    <tr
                      className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20"
                      onClick={() => navigate(`/scheduler/${x.id}`)}
                    >
                      <td className="bg-base-100 rounded-l-[15px] cursor-pointer">
                        <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                          {x.name}
                        </div>
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer">
                        {x.description}
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer">
                        {JSON.parse(x.fleet).name}
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer">
                        {x.date} | {x.time}
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100 text-gray-500 rounded-r-[15px]">
                        {x.status || "In Progress"}
                      </td>
                    </tr>
                    <br />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
