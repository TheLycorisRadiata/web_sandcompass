exports.page_not_found = (req, res) => 
{
    res.status(404).json({ status: 404, title: 'Page Not Found', message: 'I\'m sorry, this page doesn\'t exist.' });
};

