import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import faker from "faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#51DCA8",
    },
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#DDDDDD",
    },
  ],
};

export default function DeviceGraphData() {
  return (
    <div>
      <div className="mt-6 grid gap-6 xl:grid-cols-12 sm:grid-cols-12">
        <div className="xl:col-span-12 sm:col-span-12">
          <div aria-label="Card" className="card bg-base-100 card-bordered">
            <div className="card-body py-6 px-3 ">
              <div className="px-1">
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[18px] font-[700] landing-[25px] font-semibold">
                    Lorem Ipsum
                  </span>
                </div>
                <div className="text-sm text-base-content/70">Dolor Amet++</div>
              </div>
              <div className="overflow-hidden rounded-xl">
                <div
                  options="[object Object]"
                  height="100"
                  width="100%"
                  style={{ minHeight: "150px" }}
                >
                  <Bar data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
