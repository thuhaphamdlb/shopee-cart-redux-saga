import React, { useState, useEffect } from "react";
import { database } from "../../../firebase";
import firebase from "../../../firebase";
import FormInput from "./../../../components/forms/FormInput";
import Button from "./../../../components/forms/Button";
import { Col, Row } from "antd";
import { auth } from "./../../../firebase";

import "./styles.scss";

const Transaction = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      firebase
        .database()
        .ref(`shopping-cart`)
        .on("value", function (snapshot) {
          setTransactions(snapshot.val());
          //   const listCart = ((carts && Object.keys(carts)) || []).map(
          //     (key) => carts[key]
          //   );
          //   setTransactions(carts);
          console.log(transactions);
        });
    };
    fetchTransactions();
  }, [transactions]);

  return (
    <div>
      <div>
        <h2>Quản lý danh mục</h2>
        <table className="transaction-tables">
          <thead>
            <tr>
              <th>User ID </th>
              <th>Đơn Hàng ID</th>
              <th>Tổng tiền</th>
              <th>Địa chỉ</th>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {/* {transactions.map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>{transaction}</td>
                  <td>{}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
