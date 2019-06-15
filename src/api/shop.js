/**
 * Mocking client-server processing
 */

import { productNames } from '../../names';
let _products = require('../../data.json');

export default {
  getProducts(cb) {
    cb(_products, productNames);
    setInterval(() => cb(_products, productNames), 15000);
  }
};
