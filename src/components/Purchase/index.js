import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import firebase from "./../../firebase";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { ShowCartOption } from "./ShowCartOption";

const { TabPane } = Tabs;

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export const Purchase = (props) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    if (currentUser) {
      firebase
        .database()
        .ref(`shopping-cart/${currentUser.id}`)
        .on("value", function (snapshot) {
          const carts = snapshot.val();
          const listCart = ((carts && Object.keys(carts)) || []).map(
            (key) => carts[key]
          );
          setShoppingCart(listCart);
        });
    }

  }, [currentUser]);

  const acceptList = shoppingCart.filter(cart => cart.isAccept === true)
  const deliveryList = shoppingCart.filter(cart => cart.isDelivery === true)

  return (
    <div>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="All" key="1">
          <ShowCartOption listShow={shoppingCart} />
        </TabPane>
        <TabPane tab="Accept" key="2">
          <ShowCartOption listShow={acceptList} />
        </TabPane>
        <TabPane tab="Delivery" key="3">
          <ShowCartOption listShow={deliveryList} />
        </TabPane>
      </Tabs>
    </div >
  );
};

export default Purchase;
