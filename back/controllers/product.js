const Product = require('../models/product');
const {
    success_currencies_retrieval, failure_currencies_retrieval 
} = require('../functions/lang');

const retrieve_full_products = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

const retrieve_full_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_product = req.params.id_product;
    // req.params.id_token
    // req.params.id_account

    Product.findOne({ _id: id_product })
    .then(product => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: product }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

const create_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_product
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

const modify_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_product
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

const remove_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_product
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

const highlight_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_product
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

const retrieve_products_for_display = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

const retrieve_product_for_display = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_product

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

const retrieve_highlighted_product_for_display = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_product

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

module.exports = 
{
    retrieve_full_products,
    retrieve_full_product,
    create_product,
    modify_product,
    remove_product,
    highlight_product,
    retrieve_products_for_display,
    retrieve_product_for_display,
    retrieve_highlighted_product_for_display
};

