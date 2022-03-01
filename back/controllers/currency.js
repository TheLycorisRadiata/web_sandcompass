const Currency = require('../models/currency');
const {
    success_currencies_retrieval, failure_currencies_retrieval 
} = require('../functions/lang');

const retrieve_all_currencies = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Currency.find()
    .then(currencies => res.status(200).json({ is_success: true, message: success_currencies_retrieval(lang, currencies.length), data: currencies }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_currencies_retrieval(lang), error: err }));
};

module.exports = 
{
    retrieve_all_currencies
};

