const User = require('../models/user');
const Product = require('../models/product');
const {
    failure, 
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
    const id_token = req.params.id_token;
    const id_hashed_account = req.params.id_account;

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    Product.find()
                    .then(products => res.status(200).json({ is_success: true, message: success_full_products_retrieval(lang, products.length), data: products }))
                    .catch(err => res.status(400).json({ is_success: false, message: failure_full_products_retrieval(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const retrieve_full_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.params.id_token;
    const id_hashed_account = req.params.id_account;
    const id_product = req.params.id_product;

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    Product.findOne({ _id: id_product })
                    .then(product => res.status(200).json({ is_success: true, message: success_full_product_retrieval(lang), data: product }))
                    .catch(err => res.status(400).json({ is_success: false, message: failure_full_product_retrieval(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const create_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;
    const obj_product = req.body.product;

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    Product.findOne({ _id: product._id })
                    .then(() => 
                    {
                        Product.find()
                        .then(products => res.status(200).json({ is_success: true, message: success_product_created(lang, products.length), data: products }))
                        .catch(err => res.status(400).json({ is_success: false, message: failure_product_created(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const modify_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;
    const obj_product = req.body.product;

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    Product.findOne({ _id: obj_product._id })
                    .then(() => 
                    {
                        Product.find()
                        .then(products => res.status(200).json({ is_success: true, message: success_product_edited(lang, products.length), data: products }))
                        .catch(err => res.status(400).json({ is_success: false, message: failure_product_edited(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const remove_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;
    const id_product = req.body.id_product;

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    Product.deleteOne({ _id: id_product })
                    .then(() => 
                    {
                        Product.find()
                        .then(products => res.status(200).json({ is_success: true, message: success_product_removed(lang), data: products }))
                        .catch(err => res.status(400).json({ is_success: false, message: failure_product_removed(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const highlight_product = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_token = req.body.id_token;
    const id_hashed_account = req.body.id_account;
    const id_product = req.body._id;

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (admin && bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted

                    // Remove the highlight on the current highlighted product
                    Product.updateOne({ is_highlighted: true }, { is_highlighted: false })
                    .then(() => 
                    {
                        // Set the highlight on the requested product
                        Product.updateOne({ _id: id_product }, { is_highlighted: true })
                        .then(() => 
                        {
                            // Return the updated collection
                            Product.find()
                            .then(products => res.status(200).json({ is_success: true, message: success_product_highlighted(lang), data: products }))
                            .catch(err => res.status(400).json({ is_success: false, message: failure_product_highlighted(lang), error: err }));
                        })
                        .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

/* THE CONTROLLERS BELOW ARE NOT TO BE PROTECTED ------------------------------------------------ */

const retrieve_products_for_display = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);

    Product.find()
    .then(products => 
    {
        for (const product of products)
            delete product.files;

        res.status(200).json({ is_success: true, message: success_products_retrieval_for_display(lang, products.length), data: products });
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_products_retrieval_for_display(lang), error: err }));
};

const retrieve_product_for_display = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const id_product = req.params.id_product;

    Product.findOne({ _id: id_product })
    .then(product => 
    {
        delete product.files;
        res.status(200).json({ is_success: true, message: success_product_retrieval_for_display(lang), data: product });
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_product_retrieval_for_display(lang), error: err }));
};

// This controller is for display on the home page, so the product only needs:
// title, subtype, genre, catch_phrase, summary, cover_picture
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
            highlighted_product.subtype = [...product.subtype];
            highlighted_product.genre = [...product.genre];
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
                    highlighted_product.subtype = [...last_product.subtype];
                    highlighted_product.genre = [...last_product.genre];
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

