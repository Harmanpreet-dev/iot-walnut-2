import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { DatePicker, Input, Spin, TimePicker, notification } from "antd";
import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";
import axiosInstance from "../../utils/axiosInstance";

export default function SchduleTask() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useState("constant");
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [json, setJson] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [maxPerMintue, setMaxPerMintue] = useState();
  const [baseRatePerMinute, setBaseRatePerMinute] = useState();
  const [incrementFactor, setIncrementFactor] = useState();
  const [maxPerMintue2, setMaxPerMintue2] = useState();
  const [api, contextHolder] = notification.useNotification();
  const { schdule, auth } = useSelector((state) => state);

  const handleChange = (event) => {
    setRate(event.target.value);
  };

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message,
    });
  };

  const handleSubmit = () => {
    let dataJson = {
      fleetId: schdule.fleetId,
      fleet: schdule.fleet,
      devices: schdule.devices,
      name: name.replace(" ", "_"),
      description,
      json,
      isOpen,
      date,
      time,
      rate,
      maxPerMintue,
      baseRatePerMinute,
      incrementFactor,
      maxPerMintue2,
    };
    axiosInstance
      .post(`/schedulers`, dataJson)
      .then((res) => {
        openNotificationWithIcon("success", "Schedule Task is Added");
        setTimeout(() => {
          navigate("/manage-scheduler");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyUser = (value) => {
    axiosInstance
      .post(`/email/otp`, {
        email: auth.email,
      })
      .then((res) => {
        console.log(res.data);
        document.getElementById("my_modal_2").showModal();
      })
      .catch((err) => {
        if (err.response.data.error === "Email already exists") {
        }
      });
  };

  const handle2FA = (response) => {
    console.log(response);
    if (response === true) {
      handleSubmit();
    }
  };

  const validateJson = (value) => {
    try {
      JSON.parse(value);
      setIsValid(true);
      setError("");
    } catch (e) {
      setIsValid(false);
      setError(e.message);
    }
  };

  const handleJsonChange = (e) => {
    const value = e.target.value;
    setJson(value);
    validateJson(value);
  };

  return (
    <>
      <TwoFactAuth handle2FA={handle2FA} />
      {contextHolder}
      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-base-content text-[18px]">
                <Link to="/schdule-select-device">
                  <IoIosArrowBack className="mr-3" />
                  Go Back{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Assign Fleets start */}

        <div className="flex items-center justify-between flex-col my-10">
          <div className="text-[29px] font-[500] landing-[29px] text-center">
            Schedule a Task
          </div>
        </div>
        <div
          className="mt-3 w-3/5 m-auto "
          style={{
            backgroundColor: "#e2e2e2",
            padding: "1rem",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #8F8F8F",
            marginBottom: "2rem",
          }}
        >
          <span style={{ color: "#6f6a6a" }}>Number of Selected Devices</span>
          <span
            style={{ color: "#6f6a6a", fontWeight: "bold", fontSize: "18px" }}
          >
            {schdule.totalDeviceNo}
          </span>
        </div>
        <div
          className="mt-3 w-3/5 m-auto"
          style={{ border: "1px dashed #DEDEDE" }}
        ></div>
        <div className="mt-3 w-3/5 m-auto">
          <form>
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                    Job Name
                  </span>
                </label>
                <div className="form-control flex flex-row items-center rounded-[15px] h-16 bg-base-100 px-3 shadow">
                  <input
                    type="text"
                    className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="form-control mt-3 w-1/2 mr-4">
                  <label className="label">
                    <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                      Description
                    </span>
                  </label>
                  <div className="form-control flex flex-row items-center rounded-[15px] bg-base-100 px-3 shadow">
                    <textarea
                      className="input w-full h-28 focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                      name="descriptiontext"
                      rows="40"
                      cols="50"
                      style={{ height: "150px", resize: "none" }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]"></span>
                </div>

                <div className="form-control mt-3 w-1/2 ml-4">
                  <label className="label">
                    <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                      JSON
                    </span>
                  </label>
                  <div className="form-control flex flex-row items-center rounded-[15px] bg-base-100 px-3 shadow">
                    <textarea
                      className="input w-full h-28 focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                      name="jsontext"
                      rows="40"
                      cols="50"
                      style={{ height: "150px", resize: "none" }}
                      value={json}
                      onChange={handleJsonChange}
                      // onChange={(e) => setJson(e.target.value)}
                    />
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                    {!isValid && <p className="text-red-500 mt-2">{error}</p>}
                  </span>
                </div>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                    Schedule
                  </span>
                </label>
                <div
                  tabIndex={0}
                  className="collapse  border-base-300 bg-base-200 border"
                >
                  <input type="checkbox" onChange={() => setIsOpen(!isOpen)} />
                  <div
                    className="collapse-title text-xl font-medium"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      paddingInlineEnd: "1rem",
                    }}
                  >
                    <span className="mr-2 text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                      Set Date & Time
                    </span>
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={isOpen}
                      onChange={() => setIsOpen(!isOpen)}
                    />
                  </div>
                  <div className="collapse-content">
                    <div className="flex items-center justify-between mt-4">
                      <div className="form-control mt-3 w-1/2 mr-4">
                        <label className="label">
                          <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                            Date
                          </span>
                        </label>
                        <DatePicker
                          size="large"
                          // value={date}
                          onChange={(timestamp, date) => setDate(date)}
                        />
                      </div>

                      <div className="form-control mt-3 w-1/2 ml-4">
                        <label className="label">
                          <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                            Time
                          </span>
                        </label>
                        <TimePicker
                          size="large"
                          // value={time}
                          onChange={(timestamp, time) => setTime(time)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="form-control mt-3 w-1/2 mr-4">
                        <label
                          className="label"
                          style={{
                            justifyContent: "flex-start",
                          }}
                        >
                          <input
                            type="radio"
                            name="radio-2"
                            value="constant"
                            className="radio"
                            checked={rate === "constant"}
                            onChange={handleChange}
                          />
                          <span className="ml-2 text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                            Constant Rate
                          </span>
                        </label>
                      </div>

                      <div className="form-control mt-3 w-1/2 ml-4">
                        <label
                          className="label"
                          style={{
                            justifyContent: "flex-start",
                          }}
                        >
                          <input
                            type="radio"
                            name="radio-2"
                            value="exponential"
                            className="radio"
                            checked={rate === "exponential"}
                            onChange={handleChange}
                          />
                          <span className="ml-2 text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                            Exponential Rate
                          </span>
                        </label>
                      </div>
                    </div>
                    {rate === "constant" ? (
                      <div className="form-control mt-4">
                        <label className="label">
                          <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                            Maximum Per Minute Rate (1-1000)
                          </span>
                        </label>
                        <Input
                          size="large"
                          value={maxPerMintue}
                          onChange={(e) => setMaxPerMintue(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="form-control mt-3 w-1/2 mr-4">
                            <label className="label">
                              <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                                Base Rate Per Minute (1-1000)
                              </span>
                            </label>
                            <Input
                              size="large"
                              value={baseRatePerMinute}
                              onChange={(e) =>
                                setBaseRatePerMinute(e.target.value)
                              }
                            />
                          </div>

                          <div className="form-control mt-3 w-1/2 ml-4">
                            <label className="label">
                              <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                                Increment Factor (1.2-5.0)
                              </span>
                            </label>
                            <Input
                              size="large"
                              value={incrementFactor}
                              onChange={(e) =>
                                setIncrementFactor(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="form-control mt-3 w-1/2 mr-4">
                            <label className="label">
                              <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                                Maximum Per Minute (1-1000)
                              </span>
                            </label>
                            <Input
                              size="large"
                              value={maxPerMintue2}
                              onChange={(e) => setMaxPerMintue2(e.target.value)}
                            />
                          </div>

                          <div className="form-control mt-3 w-1/2 ml-4">
                            <label className="label">
                              <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                                {/* Rate Increase Criteria */}
                              </span>
                            </label>
                            {/* <Input size="large" /> */}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14">
              <button
                type="button"
                onClick={() => verifyUser()}
                className="btn bg-slate-950 gap-2 btn-neutral btn-block rounded text-[17px] font-[500] landing-[19px] hover:bg-slate-950"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
