import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { useTranslation } from '../i18n';
import { getLocalizedField } from '../utils/productText';

function Product(props) {
  const { product } = props;
  const { t, language, dictionaryEntries } = useTranslation();
  const localizedName = getLocalizedField(
    product,
    'name',
    language,
    dictionaryEntries
  );

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert(t('product.outOfStockAlert'));
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card key={product.slug} className="h-100 product-card">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top product-card__image"
          alt={localizedName}
        />
      </Link>
      <Card.Body className="product-card__body">
        <Link
          to={`/product/${product.slug}`}
          className="product-card__title-link"
        >
          <Card.Title className="product-card__title">
            {localizedName}
          </Card.Title>
        </Link>
        <Card.Text className="product-card__meta">{product.brand}</Card.Text>
        <Card.Text className="product-card__price">${product.price}</Card.Text>
        <div className="product-card__actions">
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              {t('product.outOfStock')}
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(product)}>
              {t('product.addToCart')}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default Product;
