import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const CategoryScreen = () => {
  const { category } = useParams();

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const categoryResult = await axios.get('/api/products/categories');
        const categories = categoryResult.data;
        // Перевірка, чи вибрана категорія існує у списку отриманих категорій
        if (categories.includes(category)) {
          const result = await axios.get(
            `/api/products?categories/${category}`
          );
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        } else {
          dispatch({ type: 'FETCH_FAIL', payload: 'Invalid category' });
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div>
      <Helmet>
        <title>{category} - UAFashion</title>
      </Helmet>
      <h1>{category}</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={6} md={4} lr={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default CategoryScreen;
