import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ControlPanel from "./SideMenu/ControlPanel";
import Orders from "./SideMenu/Orders";
import Invoices from "./SideMenu/Invoices";
import FoodMenu from "./SideMenu/FoodMenu";
import Users from "./SideMenu/Users";
import Deliverymen from "./SideMenu/Deliverymen";
import "antd/dist/antd.css";
import "../style/main.css";
import { Toast } from "toaster-js";
import {
  Button,
  Drawer,
  Layout,
  Menu,
  Space,
  Dropdown,
  Form,
  Input,
  Checkbox,
} from "antd";
import Icons from "../pictures/icons/icons.js";
import { MENU } from "../util/constants";
import { DownOutlined } from "@ant-design/icons";
import react from "react";
import { useState } from "react";
import { userService } from "../services/userService";
import { useUser } from "../contexts/UserContext";

export default function Dashboard() {
  const [user, setUser] = useUser();
  const { Header, Content, Footer, Sider } = Layout;
  const [visible, setVisible] = useState(false);
  let saveUser;
  if (user != null) {
    saveUser = user;
  }

  function onFinish(values) {
    saveUser.name = values.username;
    saveUser.password = values.confirm;
    saveUser.phone = values.phone;
    saveUser.token = user.token;
    console.log(saveUser);
    console.log(user);
    userService
      .editUserInfo(saveUser)
      .then((res) => res.json())
      .then((res) => console.log(res));
    localStorage.setItem("userInfo", JSON.stringify(saveUser));
    setUser(saveUser);
  }
  function onFinishFailed() {}

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  function logout() {
    localStorage.removeItem("userInfo");
    setUser();
  }

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Button className="dropdown-items" onClick={showDrawer}>
              Тохиргоо
              <Drawer
                title="Тохиргоо"
                placement="right"
                onClose={onClose}
                visible={visible}
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

                          return Promise.reject(
                            new Error("Нууц үг таарахгүй байна!")
                          );
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
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="save-button"
                    >
                      Хадгалах
                    </Button>
                  </Form.Item>
                </Form>
              </Drawer>
            </Button>
          ),
          key: "1",
        },
        {
          label: (
            <Button className="dropdown-items" onClick={logout}>
              Гарах
            </Button>
          ),
          key: "2",
        },
      ]}
    />
  );
  return (
    <>
      <Layout style={{ margin: "0" }}>
        <Sider theme="light" className="sider">
          <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
            <div className="logo-name">
              {<img src={Icons.logo} />}
              <p>Food Delivery</p>
            </div>

            {MENU.map((e) => {
              return (
                <Menu.Item
                  key={e.id}
                  icon={<img src={Icons[e.page]} />}
                  style={{ margin: "26px 0" }}
                >
                  <span>{e.name}</span>
                  <Link to={`/${e.page}`} />
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout className="contentLay">
          <Header className="header">
            <Dropdown overlay={menu} className="admin-button">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {<img src={Icons.user} />}
                  Админ
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Routes
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<ControlPanel />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/foods" element={<FoodMenu />} />
              <Route path="/users" element={<Users />} />
              <Route path="/deliveryman" element={<Deliverymen />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: "right",

              bottom: 0,
              float: "right",
            }}
          >
            <span className="fooder"></span>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
