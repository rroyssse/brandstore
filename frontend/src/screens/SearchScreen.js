import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import Product from '../components/Product';
import { useTranslation } from '../i18n';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const stockOptions = [
  { key: 'inStock', value: 'in' },
  { key: 'outOfStock', value: 'out' },
];

const parseMultiValue = (value) => {
  if (!value || value === 'all') {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const toggleValue = (values, value) =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const roundCurrency = (value) => Math.round(value);

const formatPriceUah = (value) =>
  new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(value);

const buildSearchParams = (filters) => {
  const params = new URLSearchParams();

  if (filters.query && filters.query !== 'all') {
    params.set('query', filters.query);
  }

  if (filters.category?.length) {
    params.set('category', filters.category.join(','));
  }

  if (filters.brand?.length) {
    params.set('brand', filters.brand.join(','));
  }

  if (filters.fabric?.length) {
    params.set('fabric', filters.fabric.join(','));
  }

  if (filters.color?.length) {
    params.set('color', filters.color.join(','));
  }

  if (filters.tag?.length) {
    params.set('tag', filters.tag.join(','));
  }

  if (filters.stock && filters.stock !== 'all') {
    params.set('stock', filters.stock);
  }

  if (filters.order && filters.order !== 'newest') {
    params.set('order', filters.order);
  }

  if (filters.page && filters.page !== 1) {
    params.set('page', String(filters.page));
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    params.set('minPrice', String(filters.minPrice));
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    params.set('maxPrice', String(filters.maxPrice));
  }

  return params;
};

export default function SearchScreen() {
  const { t, tv, language, translateTerm } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const categoryParam = sp.get('category') || 'all';
  const brandParam = sp.get('brand') || 'all';
  const fabricParam = sp.get('fabric') || 'all';
  const colorParam = sp.get('color') || 'all';
  const tagParam = sp.get('tag') || 'all';

  const selectedCategories = parseMultiValue(categoryParam);
  const selectedBrands = parseMultiValue(brandParam);
  const selectedFabrics = parseMultiValue(fabricParam);
  const selectedColors = parseMultiValue(colorParam);
  const selectedTags = parseMultiValue(tagParam);
  const stock = sp.get('stock') || 'all';
  const query = sp.get('query') || 'all';
  const order = sp.get('order') || 'newest';
  const page = Number(sp.get('page') || 1);
  const minPriceUsd = parseNumber(sp.get('minPrice'));
  const maxPriceUsd = parseNumber(sp.get('maxPrice'));

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [colors, setColors] = useState([]);
  const [tags, setTags] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [priceBoundsUsd, setPriceBoundsUsd] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [draftPriceRangeUah, setDraftPriceRangeUah] = useState({
    min: 0,
    max: 0,
  });

  const labelColor = language === 'uk' ? '\u041a\u043e\u043b\u0456\u0440' : 'Color';
  const labelTag = language === 'uk' ? '\u0422\u0435\u0433' : 'Tag';
  const labelApply =
    language === 'uk' ? '\u0417\u0430\u0441\u0442\u043e\u0441\u0443\u0432\u0430\u0442\u0438' : 'Apply';
  const labelPriceRange =
    language === 'uk'
      ? '\u0414\u0456\u0430\u043f\u0430\u0437\u043e\u043d \u0446\u0456\u043d\u0438'
      : 'Price range';
  const labelPrice = language === 'uk' ? '\u0426\u0456\u043d\u0430' : 'Price';

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const categoryValues = parseMultiValue(categoryParam);
        const brandValues = parseMultiValue(brandParam);
        const fabricValues = parseMultiValue(fabricParam);
        const colorValues = parseMultiValue(colorParam);
        const tagValues = parseMultiValue(tagParam);
        const params = buildSearchParams({
          query,
          category: categoryValues,
          brand: brandValues,
          fabric: fabricValues,
          color: colorValues,
          tag: tagValues,
          stock,
          order,
          page,
          minPrice: minPriceUsd,
          maxPrice: maxPriceUsd,
        });
        const { data } = await axios.get(
          `/api/products/search?${params.toString()}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [
    query,
    categoryParam,
    brandParam,
    fabricParam,
    colorParam,
    tagParam,
    stock,
    order,
    page,
    minPriceUsd,
    maxPriceUsd,
  ]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [
          categoriesResponse,
          brandsResponse,
          fabricsResponse,
          colorsResponse,
          tagsResponse,
          exchangeRateResponse,
        ] = await Promise.all([
          axios.get('/api/products/categories'),
          axios.get('/api/products/brands'),
          axios.get('/api/products/fabrics'),
          axios.get('/api/products/colors'),
          axios.get('/api/products/tags'),
          axios.get('/api/exchange/usd-uah'),
        ]);

        setCategories(
          categoriesResponse.data.sort((a, b) => a.localeCompare(b))
        );
        setBrands(brandsResponse.data.sort((a, b) => a.localeCompare(b)));
        setFabrics(fabricsResponse.data.sort((a, b) => a.localeCompare(b)));
        setColors(colorsResponse.data.sort((a, b) => a.localeCompare(b)));
        setTags(tagsResponse.data.sort((a, b) => a.localeCompare(b)));
        setExchangeRate(exchangeRateResponse.data.rate);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchPriceBounds = async () => {
      try {
        const categoryValues = parseMultiValue(categoryParam);
        const brandValues = parseMultiValue(brandParam);
        const fabricValues = parseMultiValue(fabricParam);
        const colorValues = parseMultiValue(colorParam);
        const tagValues = parseMultiValue(tagParam);
        const params = buildSearchParams({
          query,
          category: categoryValues,
          brand: brandValues,
          fabric: fabricValues,
          color: colorValues,
          tag: tagValues,
          stock,
          order: 'newest',
          page: 1,
        });
        const { data } = await axios.get(
          `/api/products/price-range?${params.toString()}`
        );
        setPriceBoundsUsd({
          minPrice: data.minPrice || 0,
          maxPrice: data.maxPrice || 0,
        });
      } catch (err) {
        toast.error(getError(err));
      }
    };

    fetchPriceBounds();
  }, [query, categoryParam, brandParam, fabricParam, colorParam, tagParam, stock]);

  useEffect(() => {
    if (!exchangeRate) {
      return;
    }

    const minBoundUah = roundCurrency(priceBoundsUsd.minPrice * exchangeRate);
    const maxBoundUah = roundCurrency(priceBoundsUsd.maxPrice * exchangeRate);
    const nextMin = clamp(
      roundCurrency((minPriceUsd ?? priceBoundsUsd.minPrice) * exchangeRate),
      minBoundUah,
      maxBoundUah
    );
    const nextMax = clamp(
      roundCurrency((maxPriceUsd ?? priceBoundsUsd.maxPrice) * exchangeRate),
      minBoundUah,
      maxBoundUah
    );

    setDraftPriceRangeUah({
      min: Math.min(nextMin, nextMax),
      max: Math.max(nextMin, nextMax),
    });
  }, [exchangeRate, minPriceUsd, maxPriceUsd, priceBoundsUsd]);

  const getFilterUrl = (filter) => {
    const params = buildSearchParams({
      query: filter.query ?? query,
      category: filter.category ?? selectedCategories,
      brand: filter.brand ?? selectedBrands,
      fabric: filter.fabric ?? selectedFabrics,
      color: filter.color ?? selectedColors,
      tag: filter.tag ?? selectedTags,
      stock: filter.stock ?? stock,
      order: filter.order ?? order,
      page: filter.page ?? page,
      minPrice: filter.minPrice === undefined ? minPriceUsd : filter.minPrice,
      maxPrice: filter.maxPrice === undefined ? maxPriceUsd : filter.maxPrice,
    });

    const queryString = params.toString();
    return queryString ? `/search?${queryString}` : '/search';
  };

  const toggleFilterValue = (type, value, selectedValues) => {
    navigate(
      getFilterUrl({
        [type]: toggleValue(selectedValues, value),
        page: 1,
      })
    );
  };

  const applyPriceRange = () => {
    if (!exchangeRate) {
      return;
    }

    const normalizedMinUah = Math.min(
      draftPriceRangeUah.min,
      draftPriceRangeUah.max
    );
    const normalizedMaxUah = Math.max(
      draftPriceRangeUah.min,
      draftPriceRangeUah.max
    );
    const minBoundUah = roundCurrency(priceBoundsUsd.minPrice * exchangeRate);
    const maxBoundUah = roundCurrency(priceBoundsUsd.maxPrice * exchangeRate);

    const isFullRange =
      normalizedMinUah <= minBoundUah && normalizedMaxUah >= maxBoundUah;

    navigate(
      getFilterUrl({
        minPrice: isFullRange
          ? null
          : Number((normalizedMinUah / exchangeRate).toFixed(2)),
        maxPrice: isFullRange
          ? null
          : Number((normalizedMaxUah / exchangeRate).toFixed(2)),
        page: 1,
      })
    );
  };

  const renderCheckboxFilter = (items, selectedValues, type, renderLabel) => (
    <ul className="search-filter-list">
      {items.map((item) => (
        <li key={item} className="mb-1">
          <Form.Check
            type="checkbox"
            id={`${type}-${item}`}
            label={renderLabel(item)}
            checked={selectedValues.includes(item)}
            onChange={() => toggleFilterValue(type, item, selectedValues)}
          />
        </li>
      ))}
    </ul>
  );

  const activeFiltersSummary = [
    query !== 'all' ? query : null,
    selectedCategories.length
      ? selectedCategories.map((item) => tv('category', item)).join(', ')
      : null,
    selectedBrands.length ? selectedBrands.join(', ') : null,
    selectedFabrics.length
      ? selectedFabrics.map((item) => tv('fabric', item)).join(', ')
      : null,
    selectedColors.length
      ? `${labelColor} ${selectedColors
          .map((item) => translateTerm(item, { kind: 'color' }))
          .join(', ')}`
      : null,
    selectedTags.length
      ? `${labelTag} ${selectedTags
          .map((item) => translateTerm(item, { kind: 'tag' }))
          .join(', ')}`
      : null,
    minPriceUsd !== null && maxPriceUsd !== null && exchangeRate
      ? `${labelPriceRange} ${formatPriceUah(
          roundCurrency(minPriceUsd * exchangeRate)
        )} - ${formatPriceUah(roundCurrency(maxPriceUsd * exchangeRate))}`
      : null,
    stock === 'in' ? t('search.inStock') : null,
    stock === 'out' ? t('search.outOfStock') : null,
  ].filter(Boolean);

  const minBoundUah = exchangeRate
    ? roundCurrency(priceBoundsUsd.minPrice * exchangeRate)
    : 0;
  const maxBoundUah = exchangeRate
    ? roundCurrency(priceBoundsUsd.maxPrice * exchangeRate)
    : 0;
  const priceStep = 50;

  return (
    <div>
      <Helmet>
        <title>{t('search.title')}</title>
      </Helmet>
      <Row>
        <Col md={3} className="mb-4">
          <aside className="search-filters-panel">
            <div className="search-filter-section">
              <h3>{t('search.category')}</h3>
              {renderCheckboxFilter(
                categories,
                selectedCategories,
                'category',
                (item) => tv('category', item)
              )}
            </div>

            <div className="search-filter-section">
              <h3>{t('search.brand')}</h3>
              {renderCheckboxFilter(
                brands,
                selectedBrands,
                'brand',
                (item) => item
              )}
            </div>

            <div className="search-filter-section">
              <h3>{t('search.fabric')}</h3>
              {renderCheckboxFilter(
                fabrics,
                selectedFabrics,
                'fabric',
                (item) => tv('fabric', item)
              )}
            </div>

            <div className="search-filter-section">
              <h3>{labelColor}</h3>
              {renderCheckboxFilter(
                colors,
                selectedColors,
                'color',
                (item) => translateTerm(item, { kind: 'color' })
              )}
            </div>

            <div className="search-filter-section">
              <h3>{labelTag}</h3>
              {renderCheckboxFilter(
                tags,
                selectedTags,
                'tag',
                (item) => translateTerm(item, { kind: 'tag' })
              )}
            </div>

            <div className="search-filter-section">
              <h3>{t('search.availability')}</h3>
              <ul className="search-filter-list">
                <li className="mb-1">
                  <Form.Check
                    type="radio"
                    name="stock"
                    id="stock-all"
                    label={t('common.any')}
                    checked={stock === 'all'}
                    onChange={() =>
                      navigate(getFilterUrl({ stock: 'all', page: 1 }))
                    }
                  />
                </li>
                {stockOptions.map((option) => (
                  <li key={option.value} className="mb-1">
                    <Form.Check
                      type="radio"
                      name="stock"
                      id={`stock-${option.value}`}
                      label={t(`search.${option.key}`)}
                      checked={stock === option.value}
                      onChange={() =>
                        navigate(
                          getFilterUrl({ stock: option.value, page: 1 })
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="search-filter-section">
              <h3>{labelPrice}</h3>
              {exchangeRate ? (
                <>
                  <div className="mb-2">
                    {labelPriceRange}:{' '}
                    <strong>
                      {formatPriceUah(draftPriceRangeUah.min)} -{' '}
                      {formatPriceUah(draftPriceRangeUah.max)}
                    </strong>
                  </div>
                  <div className="mb-2 small text-muted">
                    {formatPriceUah(minBoundUah)} - {formatPriceUah(maxBoundUah)}
                  </div>
                  <Form.Range
                    min={minBoundUah}
                    max={maxBoundUah}
                    step={priceStep}
                    value={draftPriceRangeUah.min}
                    onChange={(e) =>
                      setDraftPriceRangeUah((currentRange) => ({
                        ...currentRange,
                        min: Math.min(Number(e.target.value), currentRange.max),
                      }))
                    }
                  />
                  <Form.Range
                    min={minBoundUah}
                    max={maxBoundUah}
                    step={priceStep}
                    value={draftPriceRangeUah.max}
                    onChange={(e) =>
                      setDraftPriceRangeUah((currentRange) => ({
                        ...currentRange,
                        max: Math.max(Number(e.target.value), currentRange.min),
                      }))
                    }
                  />
                  <div className="d-grid mt-2">
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={applyPriceRange}
                    >
                      {labelApply}
                    </Button>
                  </div>
                </>
              ) : (
                <LoadingBox />
              )}
            </div>
          </aside>
        </Col>

        <Col md={9}>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={7}>
                  <div>
                    {countProducts === 0 ? t('common.no') : countProducts}{' '}
                    {t('common.results')}
                    {activeFiltersSummary.length > 0 &&
                      ` : ${activeFiltersSummary.join(' : ')}`}
                    {(activeFiltersSummary.length > 0 ||
                      order !== 'newest') && (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                        aria-label={t('common.clear')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    )}
                  </div>
                </Col>
                <Col className="text-end">
                  {t('search.sortBy')}{' '}
                  <select
                    value={order}
                    onChange={(e) =>
                      navigate(
                        getFilterUrl({ order: e.target.value, page: 1 })
                      )
                    }
                  >
                    <option value="newest">{t('search.newestArrivals')}</option>
                    <option value="lowest">{t('search.priceLowToHigh')}</option>
                    <option value="highest">
                      {t('search.priceHighToLow')}
                    </option>
                  </select>
                </Col>
              </Row>

              {products.length === 0 && (
                <MessageBox>{t('search.noProductFound')}</MessageBox>
              )}

              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
