import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Spin } from "antd";
import { SELECT_FLEET } from "../../redux/actions/OTAAction";
import axiosInstance from "../../utils/axiosInstance";

export default function OTASelectFleet() {
  const navigate = useNavigate();
  const [fleets, setFleets] = useState([]);
  const [filteredFleets, setFilteredFleets] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState(null);

  const dispatch = useDispatch();

  const { role, id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role == 0) {
      getFleets();
    } else {
      getAdminFeel();
    }
    getUserCategory();
  }, []);

  const getFleets = () => {
    setLoading(true);
    axiosInstance
      .get(`/getFleets`)
      .then(({ data }) => {
        setLoading(false);
        data.map((fleet) => {
          fleet.checked = false;
        });
        setFleets(data);
        setFilteredFleets(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getAdminFeel = () => {
    setLoading(true);
    axiosInstance
      .post(`/getFleet`, { id: id })
      .then(({ data }) => {
        setLoading(false);
        data.map((fleet) => {
          fleet.checked = false;
        });
        setFleets(data);
        setFilteredFleets(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getUserCategory = () => {
    axiosInstance.get(`/getUserCategory`).then(({ data }) => {
      let { users, category } = data;
      users.map((fleet) => {
        fleet.status = false;
      });
      setAdmin(users);
      setCategory(category);
    });
  };

  const handleCheckStatus = (id) => {
    setFilteredFleets((prevFleets) =>
      prevFleets.map((fleet) => ({
        ...fleet,
        checked: fleet.id === id ? !fleet.checked : false,
      }))
    );

    setSelectedFleet(() => {
      const clickedFleet = filteredFleets.find((fleet) => fleet.id === id);
      return clickedFleet.checked ? null : clickedFleet;
    });
  };

  const handleSubmit = () => {
    dispatch(SELECT_FLEET({ fleetId: selectedFleet.id, fleet: selectedFleet }));
    navigate("/ota-select-device");
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    if (!value?.trim()) {
      setFilteredFleets(fleets);
    } else {
      const results = fleets.filter((fleet) =>
        fleet.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFleets(results);
    }
  };

  return (
    <>
      <Spin spinning={loading} fullscreen />
      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-base-content text-[18px]">
                <Link to="/manage-ota-update">
                  <IoIosArrowBack className="mr-3" />
                  Go Back
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between flex-col my-10">
          <div className="text-[29px] font-[500] landing-[29px] text-center">
            Select Fleet for OTA Update
          </div>
          <div className="flex items-center">
            <div className="form-control flex flex-row items-center rounded-[10px] border border-base-content/20 px-2 mx-4  my-10 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                className="input rounded w-[23rem] text-[16px] focus:outline-none focus:border-none focus:outline-offset-none"
                placeholder="Search Fleet..."
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="flex items-center justify-end w-full flex-wrap ">
            <button
              className="btn bg-slate-950 text-slate-50 text-[16px] font-[500] landing-[19px] border rounded-xl w-40 hover:bg-slate-950"
              onClick={() => handleSubmit()}
              disabled={selectedFleet == null ? true : false}
            >
              Continue
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="col-12">
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="border-b-2 border-base-300">
                  <tr className="text-[#B1B1B1] text-[15px] font-[700] landing-[35px] ">
                    <th className="w-2"></th>
                    <th>Fleet Name</th>
                    <th>Category</th>
                    <th>
                      <span className="flex">
                        <GoDotFill className="text-[#51DCA8] mr-1" />
                        Active Devices
                      </span>
                    </th>
                    <th>
                      <span className="flex">
                        <GoDotFill className="text-[#FF2002] mr-1" />
                        Inactive Devices
                      </span>
                    </th>
                    {role == 0 ? (
                      <>
                        <th>Admin</th>
                        <th>Admin Phone</th>
                      </>
                    ) : null}
                  </tr>
                </thead>
                <br />
                <tbody className="mt-3">
                  {filteredFleets.length ? (
                    filteredFleets.map((fleet) => (
                      <>
                        <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
                          <td className="shadow-none ">
                            <label>
                              <input
                                type="checkbox"
                                className="checkbox"
                                checked={fleet.checked}
                                onClick={() => handleCheckStatus(fleet.id)}
                              />
                            </label>
                          </td>
                          <td className="bg-base-100 rounded-l-[15px] ">
                            <div className="flex items-center gap-3">
                              <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                                {fleet.name}
                              </div>
                            </div>
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 ">
                            {
                              category.find(
                                (y) => y.id === parseInt(fleet.category)
                              )?.name
                            }
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 ">
                            19,899
                          </td>
                          <td className="text-[16px] font-[500] landing-[35px] bg-base-100 ">
                            0,189
                          </td>
                          {role == 0 ? (
                            <>
                              <td className="text-[16px] font-[500] landing-[35px] bg-base-100 ">
                                {admin.map((y) => {
                                  if (y.id === parseInt(fleet.admin)) {
                                    return y.name;
                                  }
                                })}
                              </td>
                              <td className="text-[16px] font-[500] landing-[35px] bg-base-100  rounded-r-[15px]">
                                {admin.map((y) => {
                                  if (y.id === parseInt(fleet.admin)) {
                                    return y.phone;
                                  }
                                })}
                              </td>
                            </>
                          ) : null}
                        </tr>
                        <br />
                      </>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-[20px] text-center">
                        {loading || <Empty />}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
