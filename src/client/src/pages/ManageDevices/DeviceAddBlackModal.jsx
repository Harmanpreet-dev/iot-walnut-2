import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { message, Upload, Spin, Button } from "antd";
import TwoFactAuth2 from "../../components/TwoFactAuth2/TwoFactAuth2";
import useMessage from "antd/es/message/useMessage";

export default function DeviceAddBlackModal({ getDevices }) {
  const state = useSelector((state) => state.auth);
  const params = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { Dragger } = Upload;

  const handleFormSubmit = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fleet", params.fleet);

    axios
      .post(`${process.env.REACT_APP_API_URL}/uploadBlack`, formData, {
        headers: {
          Authorization: state.jwt,
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
        console.log(err);
      });
  };

  const props = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
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
          <form method="dialog" onSubmit={handleFormSubmit}>
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
                <Dragger {...props}>
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
