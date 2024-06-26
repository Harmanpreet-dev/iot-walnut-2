import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_GOOGLE_SECRET } from "../../redux/actions/AuthActions";

export default function Settings() {
  const [googleSecret, setGoogleSecret] = useState();
  const [googleQr, setGoogleQr] = useState();
  const [value, setValue] = useState();

  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  });

  const getData = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/getSingleAdmin`,
        { email: state.email },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        setGoogleQr(res.data.totp_qr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGenerateTOTP = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/generateGoogleOTP`,
        { email: state.email },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        dispatch(UPDATE_GOOGLE_SECRET({ google_secret: res.data.secret }));
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/verifyGoogleOTP`,
        {
          secret: state.google_secret,
          token: value,
        },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Invalid OTP Code");
      });
  };
  return (
    <div>
      <div className="p-4">
        <button
          className="btn btn-neutral"
          onClick={() => handleGenerateTOTP()}
        >
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
    </div>
  );
}
