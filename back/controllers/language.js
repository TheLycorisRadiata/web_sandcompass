const Language = require('../models/language');
const {
    success_languages_retrieval, failure_languages_retrieval, 
    failure_language_retrieval, success_language_retrieval 
} = require('../functions/lang');

const retrieve_all_languages = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Language.find()
    .then(languages => res.status(200).json({ is_success: true, message: success_languages_retrieval(lang, languages.length), data: languages }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_languages_retrieval(lang), error: err }));
};

const retrieve_language_by_index = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Language.findOne({ index: req.params.index })
    .then(language => 
    {
        if (!language)
            res.status(400).json({ is_success: false, message: failure_language_retrieval(lang) });
        else
            res.status(200).json({ is_success: true, message: success_language_retrieval(lang), data: language });
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure_language_retrieval(lang), error: err }));
};

module.exports = 
{
    retrieve_all_languages,
    retrieve_language_by_index
};

