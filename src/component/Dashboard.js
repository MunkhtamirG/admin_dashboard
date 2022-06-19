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
import { Button, Drawer, Layout, Menu, Space, Dropdown } from "antd";
import Icons from "../pictures/icons/icons.js";
import { MENU } from "../util/constants";
import { DownOutlined } from "@ant-design/icons";
import react from "react";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import DrawerPanel from "./DrawerPanel";

export default function Dashboard() {
  const { Header, Content, Footer, Sider } = Layout;
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useUser();

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
          <div className="logo-name">
            {<img src={Icons.logo} />}
            <p>Food Delivery</p>
          </div>
          <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
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
      <DrawerPanel visible={visible} onClose={onClose} />
    </>
  );
}
