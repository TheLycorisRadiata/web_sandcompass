const parse_username = (username) => 
{
    // Remove all spaces
    const parsed_username = username.replace(/\s+/g, '');
    const user_approves = parsed_username === username ? true : window.confirm(`Usernames cannot have spaces. Does "${parsed_username}" suit you?`); 
    return { parsed_username: parsed_username, user_approves: user_approves };
};

export
{
    parse_username
};

