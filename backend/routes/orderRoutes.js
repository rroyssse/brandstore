import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const orderRouter = express.Router();
const canAccessOrder = (order, user) =>
  user.isAdmin || order.user.toString() === user._id;
const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (!req.body.orderItems || req.body.orderItems.length === 0) {
      return res.status(400).send({ message: 'Cart is empty' });
    }

    const productIds = req.body.orderItems.map((item) => item._id);
    const products = await Product.find({ _id: { $in: productIds } });
    const productsById = new Map(
      products.map((product) => [product._id.toString(), product])
    );

    const orderItems = [];

    for (const item of req.body.orderItems) {
      const product = productsById.get(item._id);

      if (!product) {
        return res.status(404).send({ message: `Product not found: ${item._id}` });
      }

      if (!item.quantity || item.quantity < 1) {
        return res
          .status(400)
          .send({ message: `Invalid quantity for product: ${product.name}` });
      }

      if (product.countInStock < item.quantity) {
        return res
          .status(400)
          .send({ message: `Product out of stock: ${product.name}` });
      }

      orderItems.push({
        slug: product.slug,
        name: product.name,
        nameUk: product.nameUk || '',
        quantity: item.quantity,
        image: product.image,
        price: product.price,
        product: product._id,
      });
    }

    const itemsPrice = round2(
      orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
    const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
    const discountPrice = round2(0.05 * itemsPrice);
    const totalPrice = round2(itemsPrice + shippingPrice - discountPrice);

    const newOrder = new Order({
      orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice,
      shippingPrice,
      discountPrice,
      totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (!canAccessOrder(order, req.user)) {
        return res.status(403).send({ message: 'Forbidden' });
      }
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (!canAccessOrder(order, req.user)) {
        return res.status(403).send({ message: 'Forbidden' });
      }
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.send({ message: 'Order Deleted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
