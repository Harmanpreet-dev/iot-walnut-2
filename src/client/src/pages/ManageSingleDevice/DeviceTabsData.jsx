import React from "react";

export default function DeviceTabsData() {
  const DeviceTab = () => {
    return (
      <div aria-label="Card" className="card bg-base-100 dark:#51DCA8 shadow">
        <div className="card-body gap-2">
          <div className="flex items-center gap-2 text-sm">
            <div>
              <p className="font-medium text-base-content/70">Lorem Ipsum</p>
              <div className="mt-4 flex items-center gap-2">
                <h5 className="inline text-2xl/none font-semibold">Dolor</h5>
                <div
                  aria-label="Badge"
                  className="badge rounded gap-1 border-0 bg-success/10 py-3 text-xs font-semibold text-success badge-sm"
                >
                  +55%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        <DeviceTab />
        <DeviceTab />
        <DeviceTab />
      </div>
    </div>
  );
}
