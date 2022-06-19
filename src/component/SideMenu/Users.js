import moment from "moment";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { userService } from "../../services/userService";
import "../../style/menuStyle/users.css";
import { Dropdown, Menu, Space } from "antd";
import Icons from "../../pictures/icons/icons";

export default function Users() {
  const [user, setUser] = useUser();
  const [users, setUsers] = useState();

  useEffect(() => {
    userService
      .getAllUser({ token: user.token })
      .then((e) => e.json())
      .then((e) => setUsers(e.data));
  }, []);

  const menu = (
    <Menu
      items={[
        {
          label: <>Харах</>,
          key: "0",
        },
        {
          label: <>Устгах</>,
          key: "1",
        },
      ]}
    />
  );

  return (
    <div>
      {users?.map((e, i) => {
        return (
          <div className="users-list" key={i}>
            <p>{i + 1}</p>
            <p>{e.name}</p>
            <p>{e.email}</p>
            <p>{e.address}</p>
            <p>{e.phone}</p>
            <p>{moment(e.created_date).format("YYYY/MM/DD")}</p>
            <Dropdown overlay={menu} trigger={["click"]} className="see-more">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <img src={Icons.dots} alt="" />
                </Space>
              </a>
            </Dropdown>
          </div>
        );
      })}
    </div>
  );
}
