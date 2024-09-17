import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_GOOGLE_SECRET } from "../../redux/actions/authActions";
import axiosInstance from "../../utils/axiosInstance";

export default function Settings() {
  const [googleQr, setGoogleQr] = useState();
  const [value, setValue] = useState();
  const { id, email, google_secret } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  });

  const getData = () => {
    axiosInstance
      .get(`/users/${id}`)
      .then(({ data }) => {
        setGoogleQr(data?.totp_qr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGenerateTOTP = () => {
    axiosInstance
      .post(`/google/otp`, { email: email })
      .then((res) => {
        dispatch(UPDATE_GOOGLE_SECRET({ google_secret: res.data.secret }));
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = () => {
    axiosInstance
      .post(`/google/verify-otp`, {
        secret: google_secret,
        token: value,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <button className="btn btn-neutral" onClick={() => handleGenerateTOTP()}>
        Generate Google Authenticator QR
      </button>
      <div className="p-4">
        <div className="my-4">
          <h5>Google Auth QR Code</h5>
        </div>
        {getData !== null ? (
          <>
            <img src={googleQr} />
            <div className="my-4">
              <div>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button className="btn btn-neutral" onClick={handleSubmit}>
                  Test Google Auth
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
