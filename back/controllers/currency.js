const Currency = require('../models/currency');
const {
} = require('../lang');

const retrieve_all_currencies = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Currency.find()
    .then(currencies => res.status(200).json({ is_success: true, message: currencies.length + ' currencies loaded.', data: currencies }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The currencies can\'t be retrieved.', error: err }));
};

module.exports = 
{
    retrieve_all_currencies
};

