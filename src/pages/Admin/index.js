import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, fetchProducts, deleteProduct } from './../../redux/Products/products.actions';
import FormInput from './../../components/forms/FormInput';
import { Row, Col } from 'antd'
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const Admin = props => {
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const [productCategory, setProductCategory] = useState('Skirt');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    useEffect(() => {
        dispatch(
            fetchProducts()
        );
    }, []);

    const resetForm = () => {
        setProductCategory('girltop');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(
            addProduct({
                productCategory,
                productName,
                productThumbnail,
                productPrice
            })
        );
        resetForm();
    };

    return (
        <div className='admin'>
            <h2>Quản lý sản phẩm</h2>
            <div className='addNewProductForm'>
                <form onSubmit={handleSubmit}>
                    <FormSelect
                        label='Loại sản phẩm'
                        options={[{
                            value: 'girltop',
                            name: 'Áo nữ'
                        }, {
                            value: 'Skirt',
                            name: 'Chân váy'
                        }, {
                            value: 'hat',
                            name: 'Mũ nón'
                        }, {
                            value: 'shoes',
                            name: 'Giày'
                        }, {
                            value: 'shirt',
                            name: 'Áo sơ mi'
                        }]}
                        handleChange={e => setProductCategory(e.target.value)}
                    />
                    <Row>
                        <Col span={6}>
                            <FormInput
                                label='Tên sản phẩm'
                                type='text'
                                value={productName}
                                handleChange={e => setProductName(e.target.value)}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={6}>
                            <FormInput
                                label='Ảnh minh họa'
                                type='file'
                                handleChange={e => setProductThumbnail(e.target.files[0])}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={4}>
                            <FormInput
                                label='Giá sản phẩm'
                                type='number'
                                min='0.00'
                                max='10000.00'
                                step='0.01'
                                value={productPrice}
                                handleChange={e => setProductPrice(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={4}>
                            <Button type='submit'>
                                Add product
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>

            <div className='manageProducts'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            const {
                                productName,
                                productThumbnail,
                                productPrice,
                                documentID
                            } = product;

                            return (
                                <tr key={index}>
                                    <td style={{ width: 300, height: 300 }}>
                                        <img alt={productName} className='thumb' src={productThumbnail} />
                                    </td>
                                    <td>
                                        {productName}
                                    </td>
                                    <td>
                                        £{productPrice}
                                    </td>
                                    <td>
                                        <Button onClick={() => dispatch(deleteProduct(documentID))}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;