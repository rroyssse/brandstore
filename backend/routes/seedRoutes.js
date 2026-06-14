import express from 'express';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import Translation from '../models/translationModel.js';
import data from '../data.js';
import translationEntries from '../translationSeed.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth } from '../utils.js';

const seedRouter = express.Router();

const buildOrderItem = (product, quantity) => ({
  slug: product.slug,
  name: product.name,
  nameUk: product.nameUk || '',
  quantity,
  image: product.image,
  price: product.price,
  product: product._id,
});

const buildSeedOrders = (createdUsers, createdProducts) => {
  const usersByEmail = Object.fromEntries(
    createdUsers.map((user) => [user.email, user])
  );
  const productsBySlug = Object.fromEntries(
    createdProducts.map((product) => [product.slug, product])
  );

  const firstOrderItems = [
    buildOrderItem(productsBySlug['defreiya-classic-white-shirt'], 1),
    buildOrderItem(productsBySlug['polivik-linen-embroidered-corset'], 1),
  ];
  const firstOrderItemsPrice = firstOrderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const secondOrderItems = [
    buildOrderItem(productsBySlug['defreiya-black-vegan-suit'], 1),
    buildOrderItem(productsBySlug['polivik-gold-embroidered-suit'], 1),
  ];
  const secondOrderItemsPrice = secondOrderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const thirdOrderItems = [
    buildOrderItem(productsBySlug['defreiya-flower-print-dress'], 1),
    buildOrderItem(productsBySlug['polivik-embroidered-hoodie'], 2),
  ];
  const thirdOrderItemsPrice = thirdOrderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return [
    {
      orderItems: firstOrderItems,
      shippingAddress: {
        fullName: 'Olena Koval',
        address: '12 Hrushevskoho St',
        city: 'Kyiv',
        postalCode: '01001',
        country: 'Ukraine',
      },
      paymentMethod: 'PayPal',
      paymentResult: {
        id: 'PAY-ORDER-001',
        status: 'COMPLETED',
        update_time: '2026-06-08T10:15:00Z',
        email_address: 'olena.koval@example.com',
      },
      itemsPrice: firstOrderItemsPrice,
      shippingPrice: 12,
      discountPrice: 10,
      totalPrice: firstOrderItemsPrice + 12 - 10,
      user: usersByEmail['olena.koval@example.com']._id,
      isPaid: true,
      paidAt: new Date('2026-06-08T10:15:00Z'),
      isDelivered: true,
      deliveredAt: new Date('2026-06-09T14:30:00Z'),
      createdAt: new Date('2026-06-08T09:50:00Z'),
      updatedAt: new Date('2026-06-09T14:30:00Z'),
    },
    {
      orderItems: secondOrderItems,
      shippingAddress: {
        fullName: 'Marta Ivanenko',
        address: '8 Soborna Sq',
        city: 'Lviv',
        postalCode: '79008',
        country: 'Ukraine',
      },
      paymentMethod: 'PayPal',
      paymentResult: {
        id: 'PAY-ORDER-002',
        status: 'COMPLETED',
        update_time: '2026-06-09T12:05:00Z',
        email_address: 'marta.ivanenko@example.com',
      },
      itemsPrice: secondOrderItemsPrice,
      shippingPrice: 15,
      discountPrice: 0,
      totalPrice: secondOrderItemsPrice + 15,
      user: usersByEmail['marta.ivanenko@example.com']._id,
      isPaid: true,
      paidAt: new Date('2026-06-09T12:05:00Z'),
      isDelivered: false,
      createdAt: new Date('2026-06-09T11:20:00Z'),
      updatedAt: new Date('2026-06-09T12:05:00Z'),
    },
    {
      orderItems: thirdOrderItems,
      shippingAddress: {
        fullName: 'Olena Koval',
        address: '12 Hrushevskoho St',
        city: 'Kyiv',
        postalCode: '01001',
        country: 'Ukraine',
      },
      paymentMethod: 'PayPal',
      itemsPrice: thirdOrderItemsPrice,
      shippingPrice: 12,
      discountPrice: 5,
      totalPrice: thirdOrderItemsPrice + 12 - 5,
      user: usersByEmail['olena.koval@example.com']._id,
      isPaid: false,
      isDelivered: false,
      createdAt: new Date('2026-06-10T08:40:00Z'),
      updatedAt: new Date('2026-06-10T08:40:00Z'),
    },
  ];
};

seedRouter.get('/', isAuth, isAdmin, async (req, res) => {
  await Order.deleteMany({});
  await Translation.deleteMany({});
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  const createdTranslations = await Translation.insertMany(translationEntries);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  const createdOrders = await Order.insertMany(
    buildSeedOrders(createdUsers, createdProducts)
  );
  res.send({
    createdProducts,
    createdTranslations,
    createdUsers,
    createdOrders,
  });
});

export default seedRouter;
