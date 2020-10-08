import React from "react";
import "./styles.scss";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

export const ShowCartOption = ({ listShow }) => {

  return (
    <>
      <Row className="cart-headling">
        <Col span={3}>Sản phẩm</Col>
        <Col span={5}>Ảnh sản phẩm</Col>
        <Col span={2}>Số lượng</Col>
        <Col span={3}>Trạng thái</Col>
        <Col span={3}>Giao hàng</Col>
        <Col span={2}>Tổng tiền</Col>
      </Row>
      {listShow.map((shoppingcart, index) => (
        <Row key={index} className="item-shoppingCart" style={{ borderBottom: "1px solid orangered" }}>
          <Col span={3}>
            {shoppingcart.products.map((product, i) => (
              <div className="cart-product-image" key={i}>
                <span>{product.productName}</span>
                <br />
              </div>
            ))}
          </Col>
          <Col span={5}>
            {shoppingcart.products.map((product, ind) => (
              <div className="cart-product-image" key={ind}>
                <img src={product.productThumbnail} style={{ width: 180, height: 150 }} alt={product.productName}></img>
                <br />
              </div>
            ))}
          </Col>
          <Col span={2}>
            {shoppingcart.products.map((product, index) => (
              <div className="cart-product-image" key={index}>
                <span>{product.amount}</span>
                <br />
              </div>
            ))}
          </Col>
          <Col span={3}>
            <span>
              {shoppingcart.isAccept ? (
                <span>Đã Xác Nhận</span>
              ) : (
                  <span>Chưa Xác Nhận</span>
                )}
            </span>
          </Col>
          <Col span={3}>
            <span>
              {shoppingcart.isDelivery ? (
                <span>Đã Giao Hàng</span>
              ) : (
                  <span>Chưa Giao Hàng</span>
                )}
            </span>
          </Col>
          <Col span={2}>
            <span>{shoppingcart.TotalMoney}</span>
          </Col>
          {!shoppingcart.isDelivery && (
            <Col span={2}>
              <button disabled={shoppingcart.isDelivery}>Xóa</button>
            </Col>
          )}
        </Row>
      ))}
    </>
  );
};

export default ShowCartOption;
