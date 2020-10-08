import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./styles.scss";
import firebase from "./../../firebase";
import { deleteProduct } from './../../redux/Products/products.actions';
import { Row, Col, Button, message, Input } from "antd";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";

const ShoppingCart = (props) => {
  const history = useHistory()
  const mapState = ({ user }) => ({
    currentUser: user.currentUser,
  });

  let totalMoney = 0;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (currentUser) {
      firebase
        .database()
        .ref(`carts/${currentUser.id}`)
        .on("value", function (snapshot) {
          const carts = snapshot.val();
          const listCart = ((carts && Object.keys(carts)) || []).map(
            (key) => carts[key]
          );
          setShoppingCart(listCart);
        });
    }
  }, [currentUser]);

  function ShoppingCart(userID, productObj) {
    const timestamp = new Date();

    if (userID) {
      firebase.database().ref(`shopping-cart/${userID}`).push({
        products: productObj,
        customer: currentUser.displayName,
        email: currentUser.email,
        address: address,
        phonenumber: phonenumber,
        TotalMoney: totalMoney,
        isAccept: false,
        isDelivery: false,
        createdDate: timestamp,
      });
      firebase
        .database()
        .ref(`carts/${userID}`)
        .remove()
      message.success("Add to Order success!");
      history.push('/dashboard')
    } else {
      message.success("You must to login");
    }
  }

  return (
    <div className="container-shoppingCart">
      <Row>
        <Col className="item-advert1" span={18}>
          <h3>Shoppe | Shopping Cart</h3>
        </Col>
      </Row>
      <Row className="title-table">
        <Col span={6}>Sản Phẩm</Col>
        <Col span={4}>Đơn Giá</Col>
        <Col span={4}>Số Lượng</Col>
        <Col span={4}>Số Tiền</Col>
        <Col span={2}>Thao Tác</Col>
      </Row>
      {shoppingCart.map((shoppingcart, index) => (
        <Row key={index} className="item-shoppingCart">
          {
            (totalMoney +=
              parseInt(shoppingcart.productPrice) *
              parseInt(shoppingcart.amount))
          }
          <Col span={6}>
            <Row>
              <img
                src={shoppingcart.productThumbnail}
                style={{
                  borderImage: "30",
                  width: "100%",
                  height: "60%",
                }}
                alt="ảnh"
              />
            </Row>
            <Row>
              <span>Name product: {shoppingcart.productName}</span>
            </Row>
            <Row>
              <span>Category: {shoppingcart.productCategory}</span>
            </Row>
            <Row>
              <span>ID: {shoppingcart.id}</span>
            </Row>
          </Col>
          <Col span={4}>
            <span>{shoppingcart.productPrice} VND </span>
          </Col>
          <Col span={4}>
            <span>{shoppingcart.amount}</span>
          </Col>
          <Col span={4}>
            <span>{shoppingcart.productPrice * shoppingcart.amount} VND</span>
          </Col>

          <Col>
            <Button onClick={() => dispatch(deleteProduct(shoppingcart.id))}>Delete</Button>
          </Col>
        </Row>
      ))}
      <Row
        style={{
          marginBottom: 20,
          fontSize: 20,
          fontWeight: "bolder",
        }}
      >
        <span> Vui lòng nhập địa chỉ nhận hàng: </span>
        <Input
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="Vui Lòng Nhập địa chỉ nhận hàng"
        ></Input>
      </Row>
      <Row
        style={{
          marginBottom: 20,
          fontSize: 20,
          fontWeight: "bolder",
        }}
      >
        <span> Vui lòng nhập số điện thoại: </span>
        <Input
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="number"
          required
          placeholder="Vui Lòng Nhập số điện thoại"
        ></Input>
      </Row>
      <Row>
        <Col span={12}></Col>
        <Col
          style={{
            fontWeight: "bolder",
            fontSize: 20,
          }}
          span={6}
        >
          Tổng Tiền: {totalMoney} VNĐ
        </Col>
        <Col span={6}>
          <Button
            onClick={async () => ShoppingCart(currentUser.id, shoppingCart)}
          >
            Mua Hàng
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ShoppingCart;