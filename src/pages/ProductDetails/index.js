import React from 'react';
import { useSelector } from 'react-redux'
import './styles.scss';
import MainLayout from '../../layouts/MainLayout'

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductDetails = props => {
    const { products } = useSelector(mapState);
    return (
        <MainLayout>
            <div style={{ marginTop: 100 }}>
                {products.map((product, index) => (
                    <div>{product.productName}</div>
                ))}
            </div>

        </MainLayout>
    )
}

export default ProductDetails;