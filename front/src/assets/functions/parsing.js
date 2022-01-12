const parse_username = (username) => 
{
    // Remove all spaces
    const parsed_username = username.replace(/\s+/g, '');
    const user_approves = parsed_username === username ? true : window.confirm(`Usernames cannot have spaces. Does "${parsed_username}" suit you?`); 
    return { parsed_username: parsed_username, user_approves: user_approves };
};

const parse_category = (category) => 
{
    // Trim the beginning and ending spaces
    let parsed_category = category.trim();

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

