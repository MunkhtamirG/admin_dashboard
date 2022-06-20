import React, { useEffect, useState } from "react";
import { useOrder } from "../../contexts/OrderContext";
import {
  List,
  Menu,
  Dropdown,
  Space,
  Divider,
  Checkbox,
  Pagination,
  Drawer,
  Form,
} from "antd";
import "../../style/menuStyle/orders.css";
import { useUser } from "../../contexts/UserContext";
import moment from "moment";
import Icons from "../../pictures/icons/icons";

export default function Orders() {
  const [order, setOrder] = useOrder();
  const [user, setUser] = useUser();
  const [checkAll, setCheckAll] = useState(false);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState();
  const [deleteOrders, setDeleteOrders] = useState([]);

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
        setOrder(e.data.docs);
      });
  }, [page]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  function switchPage(e) {
    setPage(e);
  }

  function findIndex(i) {
    setIndex(i);
  }

  let indexOfOrder = [];
  let aaa = [];

  function selectOrder(e, i) {
    if (e.target.checked === true) {
      indexOfOrder.push(i);
      aaa.push(order[i]);
    }
    console.log(aaa);
    console.log(indexOfOrder);
  }

  function deleteOrder() {
    setOrder(order.filter((item) => item !== order[index]));
  }
  function deleteSelectedOrders() {
    let ordersAfterDeletion;

    for (let i = 0; i < aaa.length; i++) {
      ordersAfterDeletion = order.filter((item) => {
        return item !== aaa[i];
      });
    }
    console.log(ordersAfterDeletion);

    setOrder(ordersAfterDeletion);
  }

  const menu = (
    <Menu
      items={[
        {
          label: (
            <button className="see-button" onClick={showDrawer}>
              Харах
            </button>
          ),
          key: "0",
        },
        {
          label: (
            <button className="see-button" onClick={deleteOrder}>
              Устгах
            </button>
          ),
          key: "1",
        },
      ]}
    />
  );

  const DeleteAllBtn = (
    <Menu
      items={[
        {
          label: (
            <button className="see-button" onClick={deleteSelectedOrders}>
              Устгах
            </button>
          ),
          key: "0",
        },
      ]}
    />
  );

  return (
    <div>
      <Divider orientation="left" className="page-header-name">
        <div></div>
        Захиалгууд
      </Divider>
      <List
        header={
          <div className="head-section lists">
            <Checkbox></Checkbox>
            <span className="date">Он сар өдөр</span>
            <span className="order-number">Захиалга #</span>
            <span className="user">Хэрэглэгч</span>
            <span className="order">Захиалга</span>
            <span className="order">Нийт дүн</span>
            <span className="order">Төлбөр</span>
            <span className="order">Утас</span>
            <span className="order">Төлөв</span>
            <Dropdown overlay={DeleteAllBtn} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <img src={Icons.dots} alt="" />
                </Space>
              </a>
            </Dropdown>
          </div>
        }
        footer={
          <div>
            <Pagination defaultCurrent={1} total={60} onChange={switchPage} />
          </div>
        }
        bordered
        dataSource={order}
        renderItem={(item, i) => {
          return (
            <>
              <div className="lists">
                <Checkbox
                  onChange={(e) => {
                    selectOrder(e, i);
                  }}
                ></Checkbox>
                <p className="date">
                  {moment(item.created_date).format("YYYY/MM/DD")}
                </p>
                <p className="order-number">001</p>
                <p className="user">Хатанбагана</p>
                <p className="order">{item.orderDetails}</p>
                <p className="order">
                  {item.payment_type === "0" ? "Бэлэн" : "Картаар"}
                </p>
                <p className="order">{item.total_price}</p>
                <p className="order">80395252</p>
                <select name="status" className="select-status">
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
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  className="see-more"
                  onClick={() => {
                    findIndex(i);
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <img src={Icons.dots} alt="" />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <Drawer
                title="#00001"
                placement="right"
                onClose={onClose}
                visible={visible}
              >
                <p>Дэлгэрэнгүй</p>
                <div className="details-order-upper-section">
                  <h5>Захиалга</h5>
                  <hr />
                  <div>
                    <p>
                      Хулууны зутан<span>(1)</span>
                    </p>
                    <p className="price">8,800₮</p>
                  </div>
                  <div>
                    <p>
                      Брокколи зутан<span>(1)</span>
                    </p>
                    <p className="price">8,800₮</p>
                  </div>
                  <div>
                    <p className="total">Нийт: </p>
                    <p></p>
                  </div>
                </div>
                <div>
                  <Form></Form>
                </div>
              </Drawer>
            </>
          );
        }}
      />
    </div>
  );
}
