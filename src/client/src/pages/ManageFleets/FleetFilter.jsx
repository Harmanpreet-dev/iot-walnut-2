import React from "react";
import { Drawer } from "antd";

export default function FleetFilter({
  drawerOpen,
  drawerClose,
  admin,
  handleFilterDataBySider,
}) {
  return (
    <Drawer title="FILTER" onClose={drawerClose} open={drawerOpen}>
      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-[20px] font-[600]">Categories</div>
        <div className="collapse-content">
          <div className="flex justify-start items-center mb-4">
            <input
              type="checkbox"
              fill="fill-current"
              className="checkbox mr-2 rounded-sm text-[19] font-[500] landing-[35px]"
            />
            <span className="text-[19px] landing-[20px] font-[300]">
              {" "}
              solar
            </span>
          </div>
        </div>
      </div>

      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-[20px] font-[600]">Admins</div>
        <div className="collapse-content">
          {admin.map((x) => {
            return (
              <div className="flex justify-start items-center mb-4">
                <input
                  type="checkbox"
                  fill="fill-current"
                  className="checkbox mr-2 rounded-sm text-[19] font-[500] landing-[35px]"
                  onChange={(e) =>
                    handleFilterDataBySider(e.target.checked, x.id)
                  }
                />
                <span className="text-[19px] landing-[20px] font-[300]">
                  {" "}
                  {x.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Drawer>
  );
}
