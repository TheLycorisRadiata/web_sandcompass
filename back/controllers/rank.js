const Rank = require('../models/rank');

const retrieve_all_ranks = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Rank.find()
    .then(ranks => res.status(200).json({ is_success: true, message: ranks.length + ' ranks loaded.', data: ranks }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The ranks can\'t be retrieved.', error: err }));
};

const retrieve_rank_by_index = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Rank.findOne({ index: req.params.index })
    .then(rank => 
    {
        if (!rank)
            res.status(400).json({ is_success: false, message: 'Error: The rank cannot be retrieved.' });
        else
            res.status(200).json({ is_success: true, message: 'Rank loaded.', data: rank });
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The rank cannot be retrieved.', error: err }));
};

module.exports = 
{
    retrieve_all_ranks,
    retrieve_rank_by_index
};

