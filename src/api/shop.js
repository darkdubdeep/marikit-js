/**
 * Mocking client-server processing
 */

import { productNames } from '../../names';
let products = require('../../data.json');

export default {
  getProducts(cb) {
    cb(products, productNames);
    setInterval(() => cb(products, productNames), 15000);
  }
};
