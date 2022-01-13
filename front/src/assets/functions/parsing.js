const parse_username = (username) => 
{
    // Remove spaces and what is not a number or a letter (case insensitive)
    const parsed_username = username.replace(/[^a-z0-9]/gi,'');

    let user_approves = false;
    if (parsed_username === username)
        user_approves = true;
    else if (parsed_username === '')
        alert('Usernames can only have letters and numbers.');
    else
        user_approves = window.confirm(`Usernames can only have letters and numbers. Does "${parsed_username}" suit you?`); 

    return { parsed_username: parsed_username, user_approves: user_approves };
};

const parse_category = (category) => 
{
    // Trim the beginning and ending spaces
    let parsed_category = category.trim();

    // No more than one space between characters
    parsed_category = parsed_category.replace(/ {2,}/g, ' ');

    // Allow spaces, but remove everything else that isn't a number or a letter (case insensitive)
    parsed_category = parsed_category.replace(/[^a-z0-9 ]/gi,'');

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

