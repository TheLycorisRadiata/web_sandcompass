const Language = require('../models/language');

const retrieve_all_languages = (req, res) => 
{
    Language.find()
    .then(languages => res.status(200).json({ is_success: true, message: languages.length + ' languages loaded.', data: languages }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The languages can\'t be retrieved.', error: err }));
};

const retrieve_language_by_index = (req, res) => 
{
    Language.findOne({ index: req.params.index })
    .then(language => 
    {
        if (!language)
            res.status(400).json({ is_success: false, message: 'Error: The language cannot be retrieved.' });
        else
            res.status(200).json({ is_success: true, message: 'Language loaded.', data: language });
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The language cannot be retrieved.', error: err }));
};

module.exports = 
{
    retrieve_all_languages,
    retrieve_language_by_index
};

