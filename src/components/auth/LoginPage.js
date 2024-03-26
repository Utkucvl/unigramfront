import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../store/securitySlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useCookies } from "react-cookie";
import UIFormInput from "../../libs/UIFormInput";


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userData"]); // Use useCookies

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      rememberMe: false, // Added rememberMe field with default value false
    },
  });

  const saveToCookie = (data) => {
    if (data.rememberMe) {
      setCookie("userData", data, { path: "/" });
    } else {
      // If rememberMe is unchecked, remove the userData cookie
      setCookie("userData", data, { path: "/", expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // 7 gün geçerli

    }
  };

  useEffect(() => {
    // Sayfa yüklendiğinde, çerezden kullanıcı bilgilerini kontrol et ve giriş yap
    const userData = cookies["userData"];
    if (userData && userData.userName && userData.password) {
      dispatch(login(userData));
      // Eğer kullanıcı giriş yapmış ve rememberMe seçeneği işaretlenmişse,
      if (userData.rememberMe) {
        navigate("/");
      }
    }
  }, [cookies, dispatch, navigate]);

  const onSubmit = async (data) => {
    await dispatch(login({ userName: data.userName, password: data.password }));

    if (localStorage.getItem("accessToken") !== null) {
      alertify.success("You have logged in");
      navigate("/");
      saveToCookie(data);
    } else {
      alertify.error("You could not log in");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        marginBottom: "125px",
      }}
    >
      <div style={{ width: "50%", textAlign: "center" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            style={{ width: "30%", height: "30%" }}
            src="https://png.pngtree.com/png-clipart/20220823/original/pngtree-open-wooden-door-png-image_8476659.png"
            alt="AGU Logo"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "inline-block", textAlign: "center" }}
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
            <label>
              <input
                type="checkbox"
                {...register("rememberMe")} // register fonksiyonunu kullan
                defaultChecked={false}
              />
              Remember Me
            </label>
          </div>
          <div style={{ alignSelf: "center", marginBottom: "10px" }}>
            <Tooltip>
              <Button
                type="primary"
                style={{
                  height: "50px",
                  width: "180px",
                  fontSize: "24px",
                  backgroundColor: "#b33b3c",
                }}
                htmlType="submit"
              >
                Log In
              </Button>
            </Tooltip>
          </div>
          <div style={{ marginTop: "10px" }}>
            Don't you have an account? Click to <Link to="/signup">sign up</Link>
          </div>
        </form>
      </div>
      <div style={{ width: "50%", borderLeft: "1px solid #ccc", padding: "0 20px", height: "100%" }}>
        <img
          src="https://i.pinimg.com/564x/e2/19/16/e2191675372d855ffd12addb695946b6.jpg"
          alt="AGU Logo"
          style={{ width: "40%", display: "block", margin: "0 auto" ,marginTop:"150px" }}
        />
      </div>
    </div>
  );
}

export default LoginPage;
