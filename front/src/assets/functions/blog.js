import { backend } from '../../../package.json';

const fetch_username_from_id = async (lang, id) => 
{
    const res = await fetch(`${backend}/user/${lang}/username/${id}`);
    const json = await res.json();
    return json;
};

export
{
    fetch_username_from_id
};

