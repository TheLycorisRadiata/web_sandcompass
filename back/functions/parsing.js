const parse_username = (username) => 
{
    let parsed_username = !username || typeof username !== 'string' ? '' : username.split('');
    let i;

    // Remove < > [ ] and `
    for (i = 0; i < parsed_username.length; ++i)
    {
        if (parsed_username[i] === '<' || parsed_username[i] === '>' || parsed_username[i] === '[' || parsed_username[i] === ']' || parsed_username[i] === '`')
            parsed_username[i] = '';
    }
    parsed_username = parsed_username.join('');

    // Remove spaces
    parsed_username = parsed_username.replace(/\s/g, '');

    return parsed_username;
};

const parse_category = (category) => 
{
    let parsed_category = !category || typeof category !== 'string' ? '' : category.split('');
    let i;

    // Remove < > [ ] and `
    for (i = 0; i < parsed_category.length; ++i)
    {
        if (parsed_category[i] === '<' || parsed_category[i] === '>' || parsed_category[i] === '[' || parsed_category[i] === ']' || parsed_category[i] === '`')
            parsed_category[i] = '';
    }
    parsed_category = parsed_category.join('');

    // Trim the beginning and ending spaces
    parsed_category = parsed_category.trim();

    // No more than one space between characters
    parsed_category = parsed_category.replace(/ {2,}/g, ' ');

    if (parsed_category !== '')
    {
        // First character as uppercase and the rest lowercase
        parsed_category = parsed_category.toLowerCase();
        parsed_category = parsed_category[0].toUpperCase() + parsed_category.substring(1);
    }

    return parsed_category;
};

module.exports = 
{
    parse_username,
    parse_category
};

