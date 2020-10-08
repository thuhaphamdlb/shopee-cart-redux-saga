import React, { useState, useEffect } from 'react';
import PostsProduct from '../Products/PostProducts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/Products/products.actions';
import Pagination from '../Products/Pagination';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const MainProducts = () => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    dispatch(
      fetchProducts()
    );
  }, []);

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastProducts - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastProducts);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='products-container'>
      <PostsProduct posts={currentProducts} />
      <div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default MainProducts;
