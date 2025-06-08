import mongoose from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import dotenv from 'dotenv';
dotenv.config();

import { dbUri } from '../../config/index.js';
import { errorHelper } from '../../utils/index.js';

mongoose.set("strictQuery", false);

// Lazy connection (tidak langsung connect saat file di-import)
let mongoConn;

function getMongoConnection() {
  if (!mongoConn) {
    mongoConn = mongoose.createConnection(dbUri, {});
  }
  return mongoConn;
}

const opts = {
  storeClient: getMongoConnection(),
  tableName: 'rateLimits',
  points: 100,
  duration: 60
};

const rateLimiterMongo = new RateLimiterMongo(opts);

export default (req, res, next) => {
  rateLimiterMongo.consume(req.ip)
    .then(() => next())
    .catch((err) => {
      return res.status(429).json(errorHelper('00024', req, err.message));
    });
};
