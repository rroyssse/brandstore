import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Translation from '../models/translationModel.js';

const translationRouter = express.Router();

translationRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const domain = req.query.domain || 'fashion';
    const kind = req.query.kind;

    const filters = {
      ...(from ? { from } : {}),
      ...(to ? { to } : {}),
      ...(domain ? { domain } : {}),
      ...(kind ? { kind } : {}),
    };

    const translations = await Translation.find(filters).sort({
      priority: -1,
      source: 1,
    });

    res.send(translations);
  })
);

export default translationRouter;
