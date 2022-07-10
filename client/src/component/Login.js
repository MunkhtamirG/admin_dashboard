import React from "react";
import { Form, Input, Button, notification } from "antd";
import "../style/login.css";
import Icons from "../pictures/icons/icons.js";
import { userService } from "../services/userService.js";
import { useUser } from "../contexts/UserContext";

export default function Login() {
  const [user, setUser] = useUser();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Амжилттай нэвтэрлээ",
    });
  };

  const onFinish = (values) => {
    userService

      .loginUser(values)
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          userService.userInfoStorage({
            email: res.data.email,
            userName: res.data.name,
            phone: res.data.phone,
            token: res.token,
          });
          openNotificationWithIcon("success");
          setUser({
            email: res.data.email,
            userName: res.data.name,
            phone: res.data.phone,
            token: res.token,
          });
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-right">
        <div className="inner"></div>
        <div className="login-form">
          <Form
            className="loginForm"
            name="basic"
            labelCol={{
              span: 8,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="logo-of-form">
              <img src={Icons.logo} alt="" />
              <p>MStars Food Delivery</p>
            </div>
            <Form.Item
              label="И-мэйл"
              name="email"
              className="input"
              rules={[
                {
                  required: true,
                  message: "И-мэйл хаягаа оруулна уу!",
                },
              ]}
            >
              <Input placeholder="И-мэйл хаягаа оруулна уу" />
            </Form.Item>

            <Form.Item
              label="Нууц үг"
              name="password"
              className="input"
              rules={[
                {
                  required: true,
                  message: "Нууц үгээ оруулна уу!",
                },
              ]}
            >
              <Input.Password placeholder="Нууц үгээ оруулна уу" />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button className="forget-pass-btn">Нууц үг мартсан?</Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Нэвтрэх
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
