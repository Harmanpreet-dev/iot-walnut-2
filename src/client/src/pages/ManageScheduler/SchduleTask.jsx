import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function SchduleTask() {
  // const navigate = useNavigate();
  return (
    <>
      <div className="content-wrapper bg-base-200 h-screen">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-base-content text-[18px]">
                <Link to="/jobs">
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
            Create New Job
          </div>
        </div>
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
                    name="fname"
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
                    />
                  </div>
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
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14">
              <button
                type="submit"
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
