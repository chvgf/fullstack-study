import React, { useState } from 'react';
import { addToProductList } from './productSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductList(props) {

  const dispatch = useDispatch();
  const aa = useSelector(state => state.product.productList);

  const [productName, setProductName] = useState('');

  const handleAddProduct = () => {
    dispatch(addToProductList(productName));
  }

  return (
    <>
      <p>
        상품 추가:
        <input
          type="text"
          value={undefined}
          onChange={(e) => { setProductName(e.target.value) }}
        />
        <button
          type='button'
          onClick={handleAddProduct}
        >
          추가
        </button>
      </p>
      <p>상품 목록</p>
      <ul>
        {aa.map((product, index) => {
          return <li key={index}>{product}</li>
        })}
      </ul>
    </>
  );
}

export default ProductList;