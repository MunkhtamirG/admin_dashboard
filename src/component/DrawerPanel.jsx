import React from "react";
import { Button, Drawer, Form, Input } from "antd";
import { useUser } from "../contexts/UserContext";
import { userService } from "../services/userService";

export default function DrawerPanel(props) {
  const [user, setUser] = useUser();

  let saveUser;
  if (user != null) {
    saveUser = user;
  }
  function onFinish(values) {
    saveUser.name = values.username;
    saveUser.password = values.confirm;
    saveUser.phone = values.phone;
    saveUser.token = user.token;

    userService
      .editUserInfo(saveUser)
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
      });
    localStorage.setItem("userInfo", JSON.stringify(saveUser));
    setUser(saveUser);
    props.onClose();
  }
  function onFinishFailed() {}
  return (
    <Drawer
      title="Тохиргоо"
      placement="right"
      onClose={props.onClose}
      visible={props.visible}
    >
      <Form
        name="basic"
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 32 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="settings-form"
      >
        <Form.Item
          label="Нэр"
          name="username"
          className="settings-form-items"
          rules={[
            {
              required: true,
              message: "Нэрээ оруулна уу!",
            },
          ]}
        >
          <Input placeholder="Нэрээ оруулна уу" />
        </Form.Item>

        <Form.Item
          label="Нууц үг"
          name="password"
          className="settings-form-items"
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
          name="confirm"
          label="Нууц үг"
          dependencies={["password"]}
          className="settings-form-items"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Нууц үгээ давтан оруулна уу!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Нууц үг таарахгүй байна!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Нууц үгээ давтан оруулна уу" />
        </Form.Item>
        <Form.Item
          label="Утас дугаар"
          name="phone"
          className="settings-form-items"
          rules={[
            {
              required: true,
              message: "Утасны дугаараа оруулна уу!",
            },
          ]}
        >
          <Input placeholder="Утасны дугаараа оруулна уу" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 28, span: 32 }}>
          <Button type="primary" htmlType="submit" className="save-button">
            Хадгалах
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
