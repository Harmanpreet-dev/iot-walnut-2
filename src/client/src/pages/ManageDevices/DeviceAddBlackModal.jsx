import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { message, Upload, Button } from "antd";
import TwoFactAuth2 from "../../components/TwoFactAuth2/TwoFactAuth2";
import axiosInstance from "../../utils/axiosInstance";

export default function DeviceAddBlackModal({ getDevices }) {
  const { email, jwt } = useSelector((state) => state.auth);
  const params = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [dublicateData, setDublicateData] = useState([]);
  const { Dragger } = Upload;

  const handleFormSubmit = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fleet", params.fleet);

    axiosInstance
      .post(`/devices/blacklist`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        getDevices();
        document.getElementById("my_modal_4").close();
        messageApi.success("Blacklist is Uploaded");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
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
        return false;
      }
      setFile(file);
      return false;
    },
  };

  const verifyUser = () => {
    axiosInstance
      .post(`/email/otp`, {
        email: email,
      })
      .then((res) => {
        document.getElementById("my_modal_2_2").showModal();
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

  return (
    <>
      {contextHolder}
      <TwoFactAuth2 handle2FA={handle2FA} />
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box bg-base-200 ">
          <form method="dialog">
            <button className="btn text-[20px] btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex items-center justify-center flex-col h-full">
            <div className="mt-3 w-3/4">
              <div>
                <h1>Add Blacklist</h1>
              </div>
              <div className="mb-3">
                <Dragger {...props} maxCount={1}>
                  <p className="ant-upload-drag-icon">
                    {/* <InboxOutlined /> */}
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Upload your IMEI Blacklist File
                  </p>
                </Dragger>
              </div>
              {dublicateData.length === 0 ? (
                <div className="text-center">
                  <p>Upload Only xlxs, csv files</p>
                </div>
              ) : (
                <div>
                  <div className="bg-base-300 collapse collapse-arrow">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title font-medium text-red-400">
                      Dublicate IMEI Numbers
                    </div>
                    <div className="collapse-content">
                      {dublicateData?.map((x, i) => {
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
                  onClick={() => verifyUser()}
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
