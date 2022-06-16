import moment from "moment";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { userService } from "../../services/userService";
import "../../style/menuStyle/users.css";
import { Checkbox, Input, Space, Table, Tag } from "antd";

export default function Users() {
  const [user, setUser] = useUser();
  const [users, setUsers] = useState();

  useEffect(() => {
    userService
      .getAllUser({ token: user.token })
      .then((e) => e.json())
      .then((e) => setUsers(e.data));
  }, []);
  console.log(users);

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
            <button>:</button>
          </div>
        );
      })}
    </div>
  );
}
