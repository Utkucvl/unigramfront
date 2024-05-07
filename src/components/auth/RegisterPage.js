import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/securitySlice";
import { useNavigate } from "react-router";
import { Button, Tooltip, notification } from "antd";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UIFormInput from "../../libs/UIFormInput";
import img1 from './resim1.png'
import nar from './nar.png'

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRegistered, err } = useDispatch((state) => state.security);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  useEffect(() => {
    if (err) {
      notification.error({ message: "Error", description: err });
    }
    if (isRegistered) {
      navigate("/", { replace: true });
    }
  }, [isRegistered, navigate, err]);

  const onSubmit = async (data) => {
    const response = await dispatch(
      register({ userName: data.userName, password: data.password })
    );

    if (response.payload && response.payload.error) {
      alertify.error("Username is invalid", 2);
    } else {
      alertify.success("You have registered");
      navigate("/signin");
    }
  };

  return (
    <div className="Top">
      <div className="cover" style={{ display: "flex", borderRadius: "20px", overflow: "hidden" }}>
        <div style={{ flex: "1", textAlign: "center", backgroundColor: "rgba(255,255,255,255)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              style={{ width: "12%", height: "12%", marginTop: "125px" }}
              src={nar}
              alt="AGU Logo"
            />
          </div>
          <h2 style={{ fontWeight: 'bold' }}>Welcome to UNIGRAM</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div style={{ marginBottom: "2px" }}>
              <UIFormInput
                name="userName"
                control={control}
                errors={errors}
                placeholder="Enter a Username"
              />
            </div>
            <div style={{ marginBottom: "2px" }}>
              <UIFormInput
                name="password"
                control={control}
                errors={errors}
                type="password"
                placeholder="Enter a  Password"
              />
            </div>
            <div style={{ marginBottom: "2px" }}>
              <UIFormInput
                name="email"
                control={control}
                errors={errors}
                placeholder="Enter an AGU email"
              />
            </div>

            <div style={{ alignSelf: "center", marginBottom: "10px" }}>
            <Tooltip>
                <Button
                  type="primary"
                  style={{ width: "300px", backgroundColor: "rgba(9,9,99,255)",color:"white" }}
                  htmlType="submit"
                >
                  SIGN UP
                </Button>
              </Tooltip>
            </div>
            <div style={{ marginTop: "10px" }}>
            Have you an account? Click to{" "}
              <Link to="/signin">
                Log In{" "}
              </Link>

            </div>
          </form>
        </div>
        <div style={{ flex: "1", padding: "0 20px", backgroundColor: "rgba(230,242,255,255)" }}>
          <img
            src={img1}
            alt="AGU Logo"
            style={{ width: "100%", display: "block", margin: "0 auto" }}
          />
        </div>
      </div>

    </div>
    
    
  );
}

export default RegisterPage;


