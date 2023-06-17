import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
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

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products?page=${page}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.products });
        setPages(result.data.pages);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [page]);

  const navigateToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <Helmet>
        <title>UAFashion</title>
      </Helmet>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <Row>
              {products.map((product) => (
                <Col sm={6} md={4} key={product._id} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
            <div className="pagination">
              {[...Array(pages).keys()].map((pageNumber) => (
                <button
                  key={pageNumber + 1}
                  className={pageNumber + 1 === page ? 'active' : ''}
                  onClick={() => navigateToPage(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
