import React, { useEffect } from "react";
import { otherServices } from "../../services/otherServices";
import { useOrder } from "../../contexts/OrderContext";
import { List, Row, Col, Divider, Checkbox } from "antd";
import "../../style/menuStyle/orders.css";
import { useUser } from "../../contexts/UserContext";
export default function Orders() {
  const [order, setOrder] = useOrder();
  const [user, setUser] = useUser();

  useEffect(() => {
    otherServices
      .getAllOrders(user.token)
      .then((e) => e.json())
      .then((e) => {
        setOrder(e.Orders);
        console.log(e);
      });
  }, []);

  console.log(order);
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
                    lg={{ span: 6, offset: 2 }}
                  >
                    {item.customer}
                  </Col>
                  <Col
                    className="cols"
                    xs={{ span: 11, offset: 1 }}
                    lg={{ span: 6, offset: 2 }}
                  >
                    {item.customer}
                  </Col>
                  <Col
                    className="cols"
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 6, offset: 2 }}
                  >
                    {item.customer}
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
