import { Breadcrumb } from "antd";
import React from "react";

export default function Dashboard() {
  return (
    <div className="content-wrapper bg-base-200 h-screen">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "Dashboard",
            },
          ]}
        />
      </div>
      {/* content */}
    </div>
  );
}
