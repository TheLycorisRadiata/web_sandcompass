import { username_disclaimer, username_disclaimer_and_display } from './lang';

const parse_username = (ct, username) => 
{
    let parsed_username = !username || typeof username !== 'string' ? '' : username.split('');
    let user_approves = false;
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

    if (parsed_username === username)
        user_approves = true;
    else if (parsed_username === '')
        ct.open_pop_up('alert', username_disclaimer(ct.lang));
    else
        user_approves = window.confirm(username_disclaimer_and_display(ct.lang, parsed_username)); 

    return { parsed_username: parsed_username, user_approves: user_approves };
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

export
{
    parse_username,
    parse_category
};

