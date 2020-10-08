import React from 'react';
import './showproduct.css';
import { Row } from 'antd';
import { Link } from 'react-router-dom';

const PostsProduct = ({ posts, loading }) => {

  const newPrice = (productPrice, discount) => {
    return Math.round(productPrice - (parseInt(productPrice) / 100 * discount))
  }

  return (
    <Row className='products'>
      {posts.map((post, index) => (
        <div className='product' key={index}>
          <Link to={{ pathname: `/product-detail/${post.documentID}`, state: post.documentID }}>
            <img className="img-product" src={post.productThumbnail} alt="ảnh" />
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
        </div>
      ))}
    </Row>
  );
};

PostsProduct.defaultProps = {
  currentUser: null,
};

export default PostsProduct;
