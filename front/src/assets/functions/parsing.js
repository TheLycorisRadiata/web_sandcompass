import { username_disclaimer, username_disclaimer_and_display } from './lang';

const handle_required_field = (field_name) =>
{
    const field = document.querySelector(`input[name="${field_name}"]`);
    const eye_button = field_name === 'password' ? document.getElementById('eye1') 
        : field_name === 'repeat_password' ? document.getElementById('eye2') 
        : null;

    // return a boolean on whether the field is not empty
    if (field.value === '')
    {
        field.classList.add('required');
        if (eye_button)
            eye_button.classList.add('required');
        return false;
    }
    else
    {
        field.classList.remove('required');
        if (eye_button)
            eye_button.classList.remove('required');
        return true;
    }
};

const parse_username = async (ct, username) => 
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
        ct.popup('alert', ct.lang, username_disclaimer(ct.lang));
    else
        user_approves = await ct.popup('confirm', ct.lang, username_disclaimer_and_display(ct.lang, parsed_username));

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
    handle_required_field,
    parse_username,
    parse_category
};

