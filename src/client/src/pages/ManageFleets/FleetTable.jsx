import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { ADD_FLEET } from "../../redux/actions/CommonAction";

export default function FleetTable({ fleets, admin, category, error, role }) {
  const navigate = useNavigate();
  const dipatch = useDispatch();

  const openFleet = (name) => {
    navigate(`/manage-devices/${name}`);
    dipatch(ADD_FLEET({}));
  };

  return (
    <div className="mt-6">
      <div className="col-12">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="border-b-2 border-base-300">
              <tr className="text-[#B1B1B1] text-[15px] font-[700] landing-[35px]">
                {/* <th className="w-2">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th> */}
                <th>Fleet name</th>
                <th>Category</th>
                {role == 0 ? (
                  <>
                    <th>Admin</th>
                    <th>Admin Phone</th>
                  </>
                ) : null}
                <th></th>
              </tr>
            </thead>
            <br />
            <tbody className="mt-3">
              {error && (
                <tr>
                  <td colSpan="5" className="text-[20px] text-center">
                    {error}
                  </td>
                </tr>
              )}
              {fleets.map((x) => {
                return (
                  <React.Fragment key={x.id}>
                    <tr
                      className="shadow-[0_3.5px_5.5px_0_#00000005] h-20 mb-3 cursor-pointer"
                      onClick={() => openFleet(x.name)}
                    >
                      {/* <th className="shadow-none">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th> */}
                      <td className="bg-base-100 rounded-l-[15px]">
                        <div className="flex items-center gap-3">
                          <div className="text-base-500 font-[700] text-[19px] landing-[35px]">
                            {x.name}
                          </div>
                        </div>
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100">
                        {category.map((y) => {
                          if (y.id === parseInt(x.category)) {
                            return y.name;
                          }
                        })}
                      </td>
                      {role == 0 ? (
                        <>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 ">
                            {admin.map((y) => {
                              if (y.id === parseInt(x.admin)) {
                                return y.name;
                              }
                            })}
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 ">
                            {admin.map((y) => {
                              if (y.id === parseInt(x.admin)) {
                                return y.phone;
                              }
                            })}
                          </td>
                        </>
                      ) : null}
                      <td
                        className="bg-base-100 rounded-r-[15px] w-8"
                        // onClick={() => openFleet(x.name)}
                      >
                        <div className="text-[20px] font-[500] landing-[35px] text-neutral-500 ">
                          <IoIosArrowForward />
                        </div>
                      </td>
                    </tr>
                    <br />
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
