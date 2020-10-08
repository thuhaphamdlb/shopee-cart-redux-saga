import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import MainLayout from '../../layouts/MainLayout'
import 'antd/dist/antd.css';
import { fetchProducts } from '../../redux/Products/products.actions';
import firebase from "../../firebase";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, message } from 'antd';

const mapState = ({ user, productsData }) => ({
  products: productsData.products,
  currentUser: user.currentUser
})

const ProductsDetail = (props) => {
  let query = useParams();
  const productQuery = query.id;
  const { products, currentUser } = useSelector(mapState)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      fetchProducts()
    )
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.documentID
        .indexOf(productQuery) !== -1
    );
  });

  const newPrice = (productPrice, discount) => {
    return Math.round(productPrice - (parseInt(productPrice) / 100 * discount))
  }

  function addToCardUser(userID, productObj) {
    if (userID) {
      // xác định có user đăng nhập hay chưa
      let product;
      firebase
        .database()
        .ref(`carts/${userID}/${productObj.documentID}`)
        .on("value", function (snapshot) {
          product = snapshot.val();
        });
      if (product) {
        // nếu biến product tồn tại thì tăng số lượng sản phẩm đó thêm 1
        let count;
        firebase
          .database()
          .ref(`carts/${userID}/${productObj.documentID}/amount`)
          .on("value", function (snapshot) {
            // lấy số lượng hiện tại của sản phẩm bị trùng + 1
            count = snapshot.val();
          });
        firebase
          .database()
          .ref(`carts/${userID}/${productObj.documentID}/amount`) // set lại số lượng sản phẩm
          .set(count + 1);
      } else {
        // sản phẩm thêm vào không bị trùng thì tạo 1 sản phẩm mới
        firebase
          .database()
          .ref(`carts/${userID}/${productObj.documentID}/`)
          .set({ amount: 1, ...productObj }); // đẩy thông tin sản phẩm vào giỏ hàng và set số lượng sản phẩm bằng 1
      }
      message.success("Add to cart success!");
    } else {
      // nếu user chưa đăng nhập thì chuyển san trang đăng nhập
      alert("You must Login");
      history.push("/login");
    }
  }

  const redirectToLogin = () => {
    if (window.confirm("You must login!")) {
      history.push("/signin");
    }
  };

  return (
    <MainLayout>
      {filteredProducts.map((product, index) => {
        return (
          <div key={index} className='product-detail-container'>
            <h3>Chi tiết sản phẩm: {product.productName}</h3>
            <div className='product-detail'>
              <div className="product-thumbnail">
                <img src={product.productThumbnail} style={{ width: '100%' }} alt={product.productName} />
              </div>
              <div className="detail-content">
                <div className='detail-product-name'>
                  <span>[Mã WAL7D50 giảm 15k đơn 50K] {product.productName}</span>
                </div>
                <div>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  |
                  <span style={{ marginLeft: 10, marginRight: 10 }}> 3 Đánh giá</span>
                  |
                  <span style={{ marginLeft: 10, marginRight: 10 }}> 12 Đã bán</span>
                </div>
                <div className='detail-price'>
                  {product.discount && (
                    <>
                      <div className="_3_ISdg">
                        ₫ {parseInt(product.productPrice)}.000
                    </div>
                      <div className="_3n5NQx">
                        ₫ {newPrice(product.productPrice, product.discount)}.000
                    </div>
                      <div className="MITExd">
                        {product.discount}% giảm
                  </div>
                    </>
                  )}

                  {!product.discount && (
                    <div className="_3n5NQx">
                      ₫ {parseInt(product.productPrice)}.000
                    </div>
                  )}
                </div>
                <div className='_3DepLY'>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={4}>
                      <div>
                        Vận chuyển
                      </div>
                    </Col>
                    <Col span={20}>
                      <div>
                        Miễn Phí Vận Chuyển
                        </div>
                      <div>
                        Miễn Phí Vận Chuyển khi đơn đạt giá trị tối thiểu
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={4}>
                      <div>
                        Màu sắc
                      </div>
                    </Col>
                    <Col span={20}>
                      <div className="button-color">
                        <button className="product-button-color">
                          ĐEN
                            </button>
                        <button className="product-button-color">
                          HỒNG
                            </button>
                        <button className="product-button-color">
                          BE
                            </button>
                        <button className="product-button-color">
                          CAM ĐỎ
                            </button>
                        <button className="product-button-color">
                          XANH
                            </button>
                        <button className="product-button-color">
                          NÂU
                            </button>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={4}>
                      <div className="_2iNrDS">
                        Số lượng
                    </div>
                    </Col>
                    <Col span={20}>
                      <input className="_1zT8xu _18Y8Ul" style={{ marginRight: 20 }} type="number" min={1} max={product.stock} />
                      {product.stock} sản phẩm có sẵn
                    </Col>
                  </Row>

                  <Row style={{ marginTop: 20 }}>
                    <div>
                      {currentUser && (
                        <button className='add-to-cart-detail' onClick={async () => addToCardUser(currentUser.id, product)}>Thêm vào giỏ hàng</button>
                      )}
                      {!currentUser && (
                        <button className='add-to-cart-detail' onClick={redirectToLogin}>Thêm vào giỏ hàng</button>
                      )}
                    </div>
                    <div>
                      <button className='buy-now'>Mua ngay</button>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </div >
        )
      })}
    </MainLayout >
  )
}

export default ProductsDetail