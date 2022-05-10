const path = require('path');
const { short_lang } = require('../functions/lang');

const encode_file_in_base64 = async (file_path) => 
{
    let data, buffer;

    try
    {
        data = await fs.readFile(file_path);
        buffer = await Buffer.from(data).toString('base64');
        return buffer;
    }
    catch (err)
    {
        return null;
    }
};

const retrieve_ebook_format_picker = (req, res) => 
{
    let lang = parseInt(req.params.lang, 10);
    if (isNaN(lang) || lang < 0 || lang > 2)
        lang = 0;

    res.status(200).json({ is_success: true, data: require(`../files/questionnaires/ebook_format_picker/${short_lang(lang)}.json`) });
};

const retrieve_cosmic_dust = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const format = req.params.format.toLowerCase();
    const format_whitelist = ['azw3', 'epub', 'pdf', 'zip'];
    const file_path = path.join(__dirname, `../files/books/cosmic_dust/test.${format}`);
    const file_name = file_path.split(/[\\/]/).pop();

    if (format_whitelist.includes(format))
        res.status(200).download(file_path, file_name);
    else
        res.status(404).json(null);
};

const retrieve_persistence = (req, res) => 
{
    const lang = parseInt(req.params.lang, 10);
    const os = req.params.os;
    const os_whitelist = ['win32', 'win64', 'mac', 'unix', 'linux'];
    let file_path = ''; 
    let file_name = '';

    if (os_whitelist.includes(os))
    {
        if (os === 'win64')
            file_path = path.join(__dirname, `../files/games/persistence_win64bit.zip`);
        else if (os === 'win32')
            file_path = path.join(__dirname, `../files/games/persistence_win32bit.zip`);
        else
            file_path = path.join(__dirname, `../files/games/persistence_default.zip`);

        file_name = file_path.split(/[\\/]/).pop();
        res.status(200).download(file_path, file_name);
    }
    else
    {
        res.status(404).json(null);
    }
};

module.exports = 
{
    encode_file_in_base64,
    retrieve_ebook_format_picker,
    retrieve_cosmic_dust,
    retrieve_persistence
};

