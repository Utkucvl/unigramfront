import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../store/securitySlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useCookies } from "react-cookie";
import UIFormInput from "../../libs/UIFormInput";
import './Login.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import img1 from './resim1.png'
import nar from './nar.png'


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
      setCookie("userData", data, { path: "/", expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 100000000) }); // 7 gün geçerli

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
    <div className="Top">
      <div className="cover" style={{ display: "flex", borderRadius: "20px", overflow: "hidden" }}>
        <div style={{ flex: "1", textAlign: "center", backgroundColor: "rgba(255,255,255,255)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              style={{ width: "12%", height: "12%", marginTop: "50px" }}
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
                placeholder="Your Username"
              />
            </div>
            <div style={{ marginBottom: "2px" }}>
              <UIFormInput
                name="password"
                control={control}
                errors={errors}
                type="password"
                placeholder="Your Password"
              />
            </div>
            <div style={{ marginBottom: "10px", textAlign: "left", width: "300px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  defaultChecked={false}
                  style={{ marginRight: "5px" }}
                />
                Keep me logged in
              </label>
            </div>
            <div style={{ alignSelf: "center", marginBottom: "10px" }}>
            <Tooltip>
                <Button
                  type="primary"
                  style={{ width: "300px", backgroundColor: "rgba(9,9,99,255)",color:"white" }}
                  htmlType="submit"
                >
                  Log In
                </Button>
              </Tooltip>
            </div>
            <div style={{ marginTop: "10px" }}>
              Don't have an account yet? <Link to="/signup">Sign up</Link>
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

export default LoginPage;

