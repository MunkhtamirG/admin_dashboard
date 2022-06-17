import React, { useEffect } from "react";
import { useOrder } from "../../contexts/OrderContext";
import { List, Row, Col, Divider, Checkbox, Pagination } from "antd";
import "../../style/menuStyle/orders.css";
import { otherServices } from "../../services/otherServices";
import { useUser } from "../../contexts/UserContext";
import moment from "moment";
import { useState } from "react";

export default function Orders() {
  const [order, setOrder] = useOrder();
  const [user, setUser] = useUser();
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [""];
  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [page, setPage] = useState(1);
  const [selectClass, setselectClass] = useState("blue");

  const onCheckAllChange = (e) => {
    setCheckAll(e.target.checked);
  };

  function selectChange(e) {
    if (e.target[0].selected == true) {
      setselectClass("blue");
    } else if (e.target[1].selected === true) {
      setselectClass("green");
    } else {
      setselectClass("red");
    }
  }
  function changeHandler(e) {
    console.log(e);
  }

  function switchPage(e) {
    setPage(e);
  }

  useEffect(() => {
    fetch(`https://dev-api.mstars.mn/api/orders?page=${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: user.token }),
    })
      .then((e) => e.json())
      .then((e) => {
        console.log(e);
        setOrder(e.data.docs);
      });
  }, [page]);

  return (
    <div>
      <Divider orientation="left" className="page-header-name">
        <div></div>
        Захиалгууд
      </Divider>
      <List
        header={
          <div className="header">
            <Checkbox onChange={onCheckAllChange} checked={checkAll}></Checkbox>
            <span>Он сар өдөр</span>
            <span>Захиалга #</span>
            <span>Хэрэглэгч</span>
            <span>Захиалга</span>
            <span>Нийт дүн</span>
            <span>Төлбөр</span>
            <span>Утас</span>
            <span>Төлөв</span>
          </div>
        }
        footer={
          <div>
            <Pagination defaultCurrent={1} total={60} onChange={switchPage} />
          </div>
        }
        bordered
        dataSource={order}
        renderItem={(item) => {
          return (
            <>
              <div className="lists">
                <Checkbox
                  onChange={changeHandler}
                  checked={checkAll}
                ></Checkbox>
                <p> {moment(item.created_date).format("YYYY/MM/DD")}</p>
                <p>{item.status}</p>
                <p>{item.payment_type}</p>
                <p>{item.total_price}</p>
                <select
                  name="status"
                  className={selectClass}
                  onChange={selectChange}
                >
                  <option
                    value="waiting"
                    className="waiting"
                    // onChange={selectChange}
                  >
                    Хүлээн авсан
                  </option>
                  <option value="success" className="success">
                    Амжилттай
                  </option>
                  <option value="canceled" className="canceled">
                    Цуцлагдсан
                  </option>
                </select>
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
