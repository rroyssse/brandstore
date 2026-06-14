import dotenv from 'dotenv';
import mongoose from 'mongoose';
import data from '../data.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import Translation from '../models/translationModel.js';
import translationEntries from '../translationSeed.js';

dotenv.config({ path: './.env' });

const productsBySlug = new Map(data.products.map((product) => [product.slug, product]));

const syncProducts = async () => {
  const products = await Product.find({});
  let updatedProducts = 0;

  for (const product of products) {
    const seedProduct = productsBySlug.get(product.slug);

    if (!seedProduct) {
      continue;
    }

    const nextNameUk = seedProduct.nameUk || '';
    const nextDescriptionUk = seedProduct.descriptionUk || '';
    const nextColor = seedProduct.color || '';
    const nextTags = seedProduct.tags || [];

    if (
      product.nameUk !== nextNameUk ||
      product.descriptionUk !== nextDescriptionUk ||
      product.color !== nextColor ||
      JSON.stringify(product.tags || []) !== JSON.stringify(nextTags)
    ) {
      product.nameUk = nextNameUk;
      product.descriptionUk = nextDescriptionUk;
      product.color = nextColor;
      product.tags = nextTags;
      await product.save();
      updatedProducts += 1;
    }
  }

  return updatedProducts;
};

const syncOrderItems = async () => {
  const orders = await Order.find({});
  let updatedOrders = 0;

  for (const order of orders) {
    let changed = false;

    order.orderItems = order.orderItems.map((item) => {
      const seedProduct = productsBySlug.get(item.slug);

      if (!seedProduct) {
        return item;
      }

      const nextNameUk = seedProduct.nameUk || '';

      if (item.nameUk !== nextNameUk) {
        changed = true;
        return {
          ...item.toObject(),
          nameUk: nextNameUk,
        };
      }

      return item;
    });

    if (changed) {
      await order.save();
      updatedOrders += 1;
    }
  }

  return updatedOrders;
};

const syncTranslations = async () => {
  let createdTranslations = 0;
  let updatedTranslations = 0;

  for (const entry of translationEntries) {
    const existingTranslation = await Translation.findOne({
      source: entry.source,
      from: entry.from,
      to: entry.to,
      domain: entry.domain || 'fashion',
      kind: entry.kind || 'term',
    });

    if (!existingTranslation) {
      await Translation.create(entry);
      createdTranslations += 1;
      continue;
    }

    if (
      existingTranslation.target !== entry.target ||
      existingTranslation.priority !== (entry.priority || 50)
    ) {
      existingTranslation.target = entry.target;
      existingTranslation.priority = entry.priority || 50;
      await existingTranslation.save();
      updatedTranslations += 1;
    }
  }

  return { createdTranslations, updatedTranslations };
};

try {
  await mongoose.connect(process.env.MONGODB_URI);

  const updatedProducts = await syncProducts();
  const updatedOrders = await syncOrderItems();
  const { createdTranslations, updatedTranslations } = await syncTranslations();

  console.log(
    JSON.stringify(
      {
        message: 'Catalog data synced successfully',
        updatedProducts,
        updatedOrders,
        createdTranslations,
        updatedTranslations,
      },
      null,
      2
    )
  );
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
