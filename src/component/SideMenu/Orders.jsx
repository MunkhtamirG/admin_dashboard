import React, { useEffect } from "react";
import { useOrder } from "../../contexts/OrderContext";
import { List, Row, Col, Divider, Checkbox, Pagination } from "antd";
import "../../style/menuStyle/orders.css";
import { otherServices } from "../../services/otherServices";
import { useUser } from "../../contexts/UserContext";
import moment from "moment";
import { userService } from "../../services/userService";

export default function Orders() {
  const [order, setOrder] = useOrder();
  const [user, setUser] = useUser();

  useEffect(() => {
    userService
      .getAllUser({ token: user.token })
      .then((e) => e.json())
      .then((e) => console.log(e));
    otherServices
      .getAllOrders({ token: user.token })
      .then((e) => e.json())
      .then((e) => {
        setOrder(e.data);
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Divider orientation="left" className="page-header-name">
        <div></div>
        Захиалгууд
      </Divider>
      <List
        header={
          <div className="header">
            <Checkbox></Checkbox>
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
        footer={<div></div>}
        bordered
        dataSource={order}
        renderItem={(item) => {
          return (
            <>
              <List.Item className="listItems">
                <Row className="rowss">
                  {/* <Col span={4}>{item.customer}</Col>
                  <Col span={4}>{item.number}</Col>
                  <Col span={4}>{item.customer}</Col>
                  <Col span={4}>{item.customer}</Col>
                  <Col span={4}>{item.customer}</Col>
                  <Col span={4}>{item.customer}</Col> */}
                  <Col
                    className="cols"
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 1, offset: 1 }}
                  >
                    {moment(item.created_date).format("YYYY/MM/DD hh:mm")}
                  </Col>
                  <Col
                    className="cols"
                    xs={{ span: 11, offset: 1 }}
                    lg={{ span: 2, offset: 1 }}
                  >
                    {item.__v}
                  </Col>
                  <Col
                    className="cols"
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 2, offset: 1 }}
                  >
                    {item.status}
                  </Col>
                  <Col
                    className="cols"
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 2, offset: 1 }}
                  >
                    {item.total_price}
                  </Col>
                  <Col
                    className="cols"
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 2, offset: 1 }}
                  >
                    {item.payment_type}
                  </Col>
                  <Col
                    className="cols"
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 2, offset: 1 }}
                  >
                    {item.status}
                  </Col>
                </Row>
              </List.Item>
            </>
          );
        }}
      />
    </div>
  );
}
