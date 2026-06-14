import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

// Number of products shown on one page.
const PAGE_SIZE = 15;

const getPageNumber = (value, defaultValue = 1) => {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : defaultValue;
};

const getNumberOrNull = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const parseMultiValue = (value) => {
  if (!value || value === 'all') {
    return [];
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const buildMultiValueFilter = (field, value) => {
  const values = parseMultiValue(value);
  return values.length > 0 ? { [field]: { $in: values } } : {};
};

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildTokenFilter = (token) => {
  const escapedToken = escapeRegExp(token);

  return {
    $or: [
      {
        name: {
          $regex: escapedToken,
          $options: 'i',
        },
      },
      {
        nameUk: {
          $regex: escapedToken,
          $options: 'i',
        },
      },
      {
        category: {
          $regex: escapedToken,
          $options: 'i',
        },
      },
      {
        brand: {
          $regex: escapedToken,
          $options: 'i',
        },
      },
      {
        fabric: {
          $regex: escapedToken,
          $options: 'i',
        },
      },
      {
        color: {
          $regex: escapedToken,
          $options: 'i',
        },
      },
      {
        tags: {
          $elemMatch: {
            $regex: escapedToken,
            $options: 'i',
          },
        },
      },
      {
        description: {
          $regex: escapedToken,
          $options: 'i',
        },
      },
      {
        descriptionUk: {
          $regex: escapedToken,
          $options: 'i',
        },
      },
    ],
  };
};

const buildWeightedMatchExpression = (fieldPath, value, weight) => ({
  $cond: [
    {
      $regexMatch: {
        input: { $ifNull: [fieldPath, ''] },
        regex: escapeRegExp(value),
        options: 'i',
      },
    },
    weight,
    0,
  ],
});

const buildSearchScoreExpression = (searchQuery, searchTokens) => {
  const scoreExpressions = [];

  if (searchQuery && searchQuery !== 'all') {
    scoreExpressions.push(
      buildWeightedMatchExpression('$name', searchQuery, 30),
      buildWeightedMatchExpression('$nameUk', searchQuery, 30),
      buildWeightedMatchExpression('$category', searchQuery, 22),
      buildWeightedMatchExpression('$brand', searchQuery, 20),
      buildWeightedMatchExpression('$slug', searchQuery, 18),
      buildWeightedMatchExpression('$fabric', searchQuery, 16),
      buildWeightedMatchExpression('$color', searchQuery, 15),
      buildWeightedMatchExpression('$description', searchQuery, 8),
      buildWeightedMatchExpression('$descriptionUk', searchQuery, 8)
    );
  }

  for (const token of searchTokens) {
    scoreExpressions.push(
      buildWeightedMatchExpression('$name', token, 12),
      buildWeightedMatchExpression('$nameUk', token, 12),
      buildWeightedMatchExpression('$category', token, 9),
      buildWeightedMatchExpression('$brand', token, 8),
      buildWeightedMatchExpression('$slug', token, 7),
      buildWeightedMatchExpression('$fabric', token, 6),
      buildWeightedMatchExpression('$color', token, 5),
      buildWeightedMatchExpression('$description', token, 2),
      buildWeightedMatchExpression('$descriptionUk', token, 2)
    );
  }

  return { $add: [...scoreExpressions, 0] };
};

const getSortOrder = (order, useRelevance = false) => {
  const secondarySort =
    order === 'lowest'
      ? { price: 1, _id: -1 }
      : order === 'highest'
      ? { price: -1, _id: -1 }
      : order === 'newest'
      ? { createdAt: -1, _id: -1 }
      : { _id: -1 };

  return useRelevance ? { searchScore: -1, ...secondarySort } : secondarySort;
};

const buildSearchFilters = (query) => {
  const category = query.category || '';
  const brand = query.brand || '';
  const fabric = query.fabric || '';
  const color = query.color || '';
  const tag = query.tag || '';
  const stock = query.stock || '';
  const searchQuery = query.query ? query.query.trim() : '';
  const minPrice = getNumberOrNull(query.minPrice);
  const maxPrice = getNumberOrNull(query.maxPrice);
  const searchTokens = searchQuery
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  const queryFilter =
    searchTokens.length > 0 && searchQuery !== 'all'
      ? {
          $and: searchTokens.map((token) => buildTokenFilter(token)),
        }
      : {};
  const categoryFilter = buildMultiValueFilter('category', category);
  const brandFilter = buildMultiValueFilter('brand', brand);
  const fabricFilter = buildMultiValueFilter('fabric', fabric);
  const colorFilter = buildMultiValueFilter('color', color);
  const tagValues = parseMultiValue(tag);
  const tagFilter = tagValues.length > 0 ? { tags: { $in: tagValues } } : {};
  const stockFilter =
    stock === 'in'
      ? { countInStock: { $gt: 0 } }
      : stock === 'out'
      ? { countInStock: { $lte: 0 } }
      : {};
  const priceFilter =
    minPrice !== null || maxPrice !== null
      ? {
          price: {
            ...(minPrice !== null ? { $gte: minPrice } : {}),
            ...(maxPrice !== null ? { $lte: maxPrice } : {}),
          },
        }
      : {};

  return {
    filters: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...fabricFilter,
      ...colorFilter,
      ...tagFilter,
      ...stockFilter,
    },
    searchQuery,
    searchTokens,
  };
};

productRouter.get('/', async (req, res) => {
  const { query } = req;
  const page = getPageNumber(query.page);
  const pageSize = getPageNumber(query.pageSize, PAGE_SIZE);

  const products = await Product.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  const countProducts = await Product.countDocuments();

  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: 'name ' + Date.now(),
      nameUk: '',
      slug: 'sample-slug-' + Date.now(),
      image: '/images/p1.jpg',
      price: 0,
      category: 'category',
      color: '',
      tags: [],
      brand: 'brand',
      countInStock: 0,
      fabric: 'fabric',
      description: 'description',
      descriptionUk: '',
    });
    const product = await newProduct.save();
    res.send({ message: 'Product Created', product });
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      product.name = req.body.name;
      product.nameUk = req.body.nameUk || '';
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.color = req.body.color || '';
      product.tags = Array.isArray(req.body.tags) ? req.body.tags : [];
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.fabric = req.body.fabric;
      product.description = req.body.description;
      product.descriptionUk = req.body.descriptionUk || '';
      await product.save();
      res.send({ message: 'Product Updated' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = getPageNumber(query.page);
    const pageSize = getPageNumber(query.pageSize, PAGE_SIZE);

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = getPageNumber(query.pageSize, PAGE_SIZE);
    const page = getPageNumber(query.page);
    const order = query.order || '';
    const { filters, searchQuery, searchTokens } = buildSearchFilters(query);

    const countProducts = await Product.countDocuments(filters);
    const shouldUseRelevanceSort = searchTokens.length > 0;
    let products;

    if (shouldUseRelevanceSort) {
      products = await Product.aggregate([
        { $match: filters },
        {
          $addFields: {
            searchScore: buildSearchScoreExpression(searchQuery, searchTokens),
          },
        },
        { $sort: getSortOrder(order, true) },
        { $skip: pageSize * (page - 1) },
        { $limit: pageSize },
      ]);
    } else {
      products = await Product.find(filters)
        .sort(getSortOrder(order))
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    }

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/price-range',
  expressAsyncHandler(async (req, res) => {
    const { filters } = buildSearchFilters(req.query);
    const aggregation = await Product.aggregate([
      { $match: filters },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    const priceRange = aggregation[0] || { minPrice: 0, maxPrice: 0 };
    res.send(priceRange);
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/brands',
  expressAsyncHandler(async (req, res) => {
    const brands = await Product.find().distinct('brand');
    res.send(brands);
  })
);

productRouter.get(
  '/fabrics',
  expressAsyncHandler(async (req, res) => {
    const fabrics = await Product.find().distinct('fabric');
    res.send(fabrics);
  })
);

productRouter.get(
  '/colors',
  expressAsyncHandler(async (req, res) => {
    const colors = await Product.find({
      color: { $exists: true, $nin: ['', null] },
    }).distinct('color');
    res.send(colors);
  })
);

productRouter.get(
  '/tags',
  expressAsyncHandler(async (req, res) => {
    const tags = await Product.find({
      tags: { $exists: true, $ne: [] },
    }).distinct('tags');
    res.send(tags);
  })
);

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
