import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "../style/login.css";
import Icons from "../pictures/icons/icons.js";

export default function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
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
              <Input.Password placeholder="Нууц үгээ оруулна у" />
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

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
