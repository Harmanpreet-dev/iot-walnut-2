import React, { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { message, Upload, Spin, Button } from "antd";
import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";

export default function DeviceAddModal({ getDevices }) {
  const state = useSelector((state) => state.auth);
  const params = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dublicateData, setDublicateData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const draggerRef = useRef(null); // Create a ref for Dragger

  const { Dragger } = Upload;

  const handleFormSubmit = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fleet", params.fleet);

    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          Authorization: state.jwt,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        getDevices();
        document.getElementById("my_modal_3").close();
        messageApi.success("Whitlist is Uploaded");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status == 400) {
          setDublicateData(err.response.data.duplicates);
          console.log(err.response.data.duplicates);
        }
      });
  };

  const props = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      const isXlsxOrCsv =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "text/csv";
      if (!isXlsxOrCsv) {
        message.error("You can only upload XLSX or CSV file!");
        handleReset();
        return false;
      }
      setFile(file);
      return false;
    },
  };

  const verifyUser = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/sendEmailOTP`,
        {
          email: state.email,
        },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        document.getElementById("my_modal_2").showModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handle2FA = (response) => {
    if (response === true) {
      handleFormSubmit();
    }
  };

  const handleReset = () => {
    setFile(null); // Clear the file state
    if (draggerRef.current) {
      draggerRef.current.onReset(); // Clear the Dragger input
    }
  };

  return (
    <>
      {contextHolder}
      <TwoFactAuth handle2FA={handle2FA} />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-base-200 ">
          <form method="dialog">
            <button className="btn text-[20px] btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex items-center justify-center flex-col h-full">
            <div className="mt-3 w-3/4">
              <div>
                <h1>Add Whitelist</h1>
              </div>
              <div className="mb-3">
                <Dragger {...props} ref={draggerRef} maxCount={1}>
                  <p className="ant-upload-drag-icon"></p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Upload your IMEI Whitelist File
                  </p>
                </Dragger>
              </div>
              {dublicateData.length == 0 ? (
                <div className="text-center">
                  <p>Upload Only xlxs, csv files</p>
                </div>
              ) : (
                <div>
                  <div className="bg-base-300 collapse collapse-arrow">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-titleAszqw23gy5s font-medium text-red-400">
                      Dublicate IMEI Numbers
                    </div>
                    <div className="collapse-content">
                      {dublicateData.map((x, i) => {
                        return (
                          <div>
                            {i + 1}
                            {". "}
                            {x}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              <div>
                <Button
                  type="primary"
                  className="mt-5 btn bg-slate-950 text-slate-50 font-bold rounded-[10px] flex items-center text-[17px] mr-4 hover:bg-slate-950"
                  block
                  loading={loading}
                  disabled={!file || loading}
                  onClick={() => handleFormSubmit()}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
