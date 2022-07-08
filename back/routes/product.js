const express = require('express');
const controller_product = require('../controllers/product');

const router = express.Router();

// Only for admin
router.get('/:lang/all/full/:id_token/:id_account', controller_product.retrieve_full_products);
router.get('/:lang/full/:id_product/:id_token/:id_account', controller_product.retrieve_full_product);
router.post('/:lang/:id_token/:id_account', controller_product.create_product);
router.put('/:lang/:id_product/:id_token/:id_account', controller_product.modify_product);
router.delete('/:lang/:id_product/:id_token/:id_account', controller_product.remove_product);

router.put('/:lang/highlight/:id_product/:id_token/:id_account', controller_product.highlight_product);

// Not protected
router.get('/:lang/all/display', controller_product.retrieve_products_for_display);
router.get('/:lang/display/:id_product', controller_product.retrieve_product_for_display);
router.get('/:lang/highlight/display', controller_product.retrieve_highlighted_product_for_display);

module.exports = router;

