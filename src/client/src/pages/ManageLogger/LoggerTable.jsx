import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { LuDownload } from "react-icons/lu";
import { DatePicker, Space, Pagination } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import * as XLSX from "xlsx";

const Loggers = () => {
  const [loggers, setLoggers] = useState([]);
  const [filteredLoggers, setFilteredLoggers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loggersPerPage] = useState(5);
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    getLoggers();
  }, []);

  const getLoggers = (date) => {
    let apiUrl = `${process.env.REACT_APP_API_URL}/getLoggers`;
    if (date) {
      apiUrl += `?date=${moment(date).format("YYYY-MM-DD")}`;
    }

    axios
      .get(apiUrl, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        setLoggers(res.data);
        setFilteredLoggers(res.data);
      })
      .catch((err) => {
        console.log("Error fetching loggers:", err);
      });
  };

  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
    filterLogs(dateString, searchQuery);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    filterLogs(selectedDate, value);
  };

  const filterLogs = (date, query) => {
    let filteredData = loggers;

    if (date) {
      filteredData = filteredData.filter((logger) => {
        const logDate = moment(logger.timestamp).format("YYYY-MM-DD");
        return moment(date).isSame(logDate, "day");
      });
    }

    if (query) {
      filteredData = filteredData.filter((logger) =>
        logger.author_name.toLowerCase().includes(query)
      );
    }

    setFilteredLoggers(filteredData);
    setCurrentPage(1); // Reset to the first page whenever filters are applied
  };

  const handleDownloadLogs = () => {
    const dataToDownload = selectedDate ? filteredLoggers : loggers;

    // Convert dataToDownload to Excel format
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(dataToDownload);
    XLSX.utils.book_append_sheet(workbook, sheet, "Loggers");

    // Generate a Blob from the workbook
    const blob = workbook2blob(workbook);

    // Create a temporary link to trigger the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "loggers.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const workbook2blob = (workbook) => {
    // Convert the workbook to a Blob
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    return blob;
  };

  const s2ab = (s) => {
    // Convert string to ArrayBuffer
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  // Pagination logic
  const indexOfLastLogger = currentPage * loggersPerPage;
  const indexOfFirstLogger = indexOfLastLogger - loggersPerPage;
  const currentLoggers = filteredLoggers.slice(
    indexOfFirstLogger,
    indexOfLastLogger
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content-wrapper bg-base-200 h-screen">
      <div className="flex items-center justify-between">
        <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
          <ul>
            <li className="text-[18px]">Loggers</li>
          </ul>
        </div>
        <div className="search-adminBox flex items-center justify-between w-[32rem]">
          <div className="border px-4 py-2 rounded-[20px] bg-base-100 border border-base-content/20">
            <Space direction="vertical">
              <DatePicker
                onChange={onChange}
                variant="borderless"
                // className="custom-date-picker"
                // className="mr-1 fill-current"
                status="warning"
              />
            </Space>
          </div>
          <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
            <CiSearch className="text-[25px]" />
            <input
              className="input w-full w-40 rounded"
              placeholder="Search.."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="adminBtn flex">
            <button
              className="btn bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[17px] mr-4"
              onClick={handleDownloadLogs}
            >
              Download Logs <LuDownload className="pl-2 text-[26px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Start */}
      <div className="mt-6">
        <div className="col-12">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="border-b-2 border-base-300">
                <tr className="text-[#B1B1B1] text-[15px] font-[700] landing-[35px]">
                  <th>User/Admin</th>
                  <th>Date & Time</th>
                  <th>Task</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="mt-3">
                {currentLoggers.map((logger, index) => (
                  <React.Fragment key={index}>
                    <tr className="shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20">
                      <td className="bg-base-100 rounded-l-[15px]">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`${process.env.REACT_APP_PROFILE_URL}/profile/${logger.author_photo}`}
                                alt="Avatar"
                                className="border-2 border-[#CBCBCB] rounded-[18px]"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">
                              {logger.author_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100">
                        {moment(logger.date_time).format(
                          "MMMM D, YYYY | hh:mm A"
                        )}
                      </td>
                      <td className="text-[16px] font-[500] landing-[35px] bg-base-100">
                        {logger.response}
                      </td>
                      <td
                        className={`text-[16px] font-[500] landing-[35px] bg-base-100 ${
                          logger.status === "success"
                            ? "text-[#16BA7C]"
                            : "text-[#FF2002]"
                        }`}
                      >
                        {logger.status}
                      </td>
                    </tr>
                    <br />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <Pagination
                current={currentPage}
                total={filteredLoggers.length}
                pageSize={loggersPerPage}
                onChange={paginate}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Table End */}
    </div>
  );
};

export default Loggers;
