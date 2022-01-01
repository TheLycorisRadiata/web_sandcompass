const Rank = require('../models/rank');

const retrieve_all_ranks = (req, res) => 
{
    Rank.find()
    .then(ranks => res.status(200).json({ is_success: true, message: ranks.length + ' ranks loaded.', data: ranks }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The ranks can\'t be retrieved.', error: err }));
};

module.exports = 
{
    retrieve_all_ranks
};

