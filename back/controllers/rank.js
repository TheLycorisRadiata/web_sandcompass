const Rank = require('../models/rank');
const {
    success_ranks_retrieval, failure_ranks_retrieval, 
    failure_rank_retrieval, success_rank_retrieval 
} = require('../lang');

const retrieve_all_ranks = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Rank.find()
    .then(ranks => res.status(200).json({ is_success: true, message: success_ranks_retrieval(lang, ranks.length), data: ranks }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_ranks_retrieval(lang), error: err }));
};

const retrieve_rank_by_index = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Rank.findOne({ index: req.params.index })
    .then(rank => 
    {
        if (!rank)
            res.status(400).json({ is_success: false, message: failure_rank_retrieval(lang) });
        else
            res.status(200).json({ is_success: true, message: success_rank_retrieval(lang), data: rank });
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_rank_retrieval(lang), error: err }));
};

module.exports = 
{
    retrieve_all_ranks,
    retrieve_rank_by_index
};

