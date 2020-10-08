import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import "./styles.scss";
import { Col, Row } from "antd";

import "antd/dist/antd.css";
import MainLayout from "../../layouts/MainLayout";
import { useParams, Link } from "react-router-dom";

const MainSearch = (props) => {
  let query = useParams();
  const searchTerm = query.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("products").get();
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.productName
        .toString()
        .toLowerCase()
        .indexOf(searchTerm.toString().toLowerCase()) !== -1
    );
  });

  const newPrice = (productPrice, discount) => {
    return Math.round(productPrice - (parseInt(productPrice) / 100 * discount))
  }

  const renderProduct = (post, index) => {
    return (
      <Col key={index} className="product-detail-column" span={6}>
        <Row>
          <Link to={{ pathname: `/product-detail/${post.documentID}`, state: post.documentID }}>
            <img src={post.productThumbnail} style={{ width: 280, height: 350 }} alt="ảnh" />
          </Link>
          <div style={{ padding: 10 }}>
            <div className="product-name">
              {post.productName}
            </div>
            <div style={{ display: 'flex' }}>
              {post.discount && (
                <div style={{ display: "flex" }}>
                  <div style={{ color: "#929292", textDecoration: "line-through" }}>
                    ₫ {parseInt(post.productPrice)}.000
                    </div>
                  <div style={{ color: "orange", fontSize: 14, fontWeight: 400 }}>
                    ₫ {newPrice(post.productPrice, post.discount)}.000
                    </div>
                </div>
              )}
              {!post.discount && (
                <div style={{ color: "orange", fontSize: 14, fontWeight: 400 }}>
                  ₫ {parseInt(post.productPrice)}.000
                </div>
              )}
            </div>
            <div>Stock: {post.stock} </div>
          </div>
        </Row>
      </Col>
    );
  };

  return (
    <MainLayout>
      <Row className='products-search' style={{ marginBottom: 20 }}>
        {filteredProducts.map((product, index) => {
          return renderProduct(product, index);
        })}
      </Row>
    </MainLayout>
  );
};

export default MainSearch;
