const Product = require('../models/product');
const {
    success_full_products_retrieval, failure_full_products_retrieval,
    success_full_product_retrieval, failure_full_product_retrieval,
    success_product_created, failure_product_created,
    success_product_edited, failure_product_edited,
    success_product_removed, failure_product_removed,
    success_product_highlighted, failure_product_highlighted,
    success_products_retrieval_for_display, failure_products_retrieval_for_display,
    success_product_retrieval_for_display, failure_product_retrieval_for_display,
    success_highlighted_product_retrieval_for_display, failure_highlighted_product_retrieval_for_display
} = require('../functions/lang');

const retrieve_full_products = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_full_products_retrieval(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_full_products_retrieval(lang), error: err }));
};

const retrieve_full_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_product = req.params.id_product;
    // req.params.id_token
    // req.params.id_account

    Product.findOne({ _id: id_product })
    .then(product => res.status(200).json({ is_success: true, message: success_full_product_retrieval(lang), data: product }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_full_product_retrieval(lang), error: err }));
};

const create_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_product_created(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_product_created(lang), error: err }));
};

const modify_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_product = req.params.id_product;
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_product_edited(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_product_edited(lang), error: err }));
};

const remove_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_product = req.params.id_product;
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_product_removed(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_product_removed(lang), error: err }));
};

const highlight_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_product = req.params.id_product;
    // req.params.id_token
    // req.params.id_account

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_product_highlighted(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_product_highlighted(lang), error: err }));
};

const retrieve_products_for_display = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_products_retrieval_for_display(lang, products.length), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_products_retrieval_for_display(lang), error: err }));
};

const retrieve_product_for_display = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_product = req.params.id_product;

    Product.find()
    .then(products => res.status(200).json({ is_success: true, message: success_product_retrieval_for_display(lang), data: products }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_product_retrieval_for_display(lang), error: err }));
};

const retrieve_highlighted_product_for_display = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const highlighted_product = {};

    Product.findOne({ is_highlighted: true })
    .then(product => 
    {
        if (product)
        {
            highlighted_product.title = [...product.title];
            highlighted_product.subtype_and_genre_combined = [...product.subtype_and_genre_combined];
            highlighted_product.catch_phrase = [...product.catch_phrase];
            highlighted_product.summary = [...product.summary];
            highlighted_product.cover_picture = [...product.cover_picture];
            res.status(200).json({ is_success: true, message: success_highlighted_product_retrieval_for_display(lang), data: highlighted_product });
        }
        else
        {
            // If no highlighted product, then use the most recent one
            Product.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, last_product) => 
            {
                // If no product at all
                if (!last_product)
                    res.status(200).json({ is_success: true, message: success_highlighted_product_retrieval_for_display(lang), data: null });
                else
                {
                    highlighted_product.title = [...last_product.title];
                    highlighted_product.subtype_and_genre_combined = [...last_product.subtype_and_genre_combined];
                    highlighted_product.catch_phrase = [...last_product.catch_phrase];
                    highlighted_product.summary = [...last_product.summary];
                    highlighted_product.cover_picture = [...last_product.cover_picture];
                    res.status(200).json({ is_success: true, message: success_highlighted_product_retrieval_for_display(lang), data: highlighted_product });
                }
            });
        }    
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_highlighted_product_retrieval_for_display(lang), error: err }));
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

