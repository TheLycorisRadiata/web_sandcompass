const { short_lang } = require('../lang');

const retrieve_ebook_format_picker = (req, res) => 
{
    const lang = parseInt(req.params.lang);
    const ebook_format_picker = require(`../files/${short_lang(lang)}/questionnaire_ebook_format_picker.json`);
    res.status(200).json({ data: ebook_format_picker });
};

module.exports = 
{
    retrieve_ebook_format_picker
};

