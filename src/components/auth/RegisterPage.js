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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        marginBottom: "125px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://universitetercihleri.com/uni/logo/24_160.png"
          alt="AGU Logo"
        />
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ marginBottom: "10px" }}>
              <UIFormInput
                name="userName"
                control={control}
                errors={errors}
                placeholder="Enter a username"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <UIFormInput
                name="password"
                control={control}
                errors={errors}
                type="password"
                placeholder="Enter a password"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <UIFormInput
                name="email"
                control={control}
                errors={errors}
                placeholder="Enter an AGU email"
              />
            </div>
            <div style={{ alignSelf: "center" }}>
              <Tooltip>
                <Button
                  type="primary"
                  style={{
                    height: "50px", // Buton yüksekliği
                    width: "180px", // Buton genişliği
                    fontSize: "24px", // Simge boyutu
                    backgroundColor: "#b33b3c",
                  }}
                  htmlType="submit"
                >
                  Sign Up
                </Button>
              </Tooltip>
            </div>

            <div
              style={{
                marginBottom: "10px",
                textAlign: "center",
                marginTop: "22px",
              }}
            >
              Have you an account? Click to{" "}
              <Link to="/" style={{ color: "#1890ff" }}>
                login{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
