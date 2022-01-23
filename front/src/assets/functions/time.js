const date_in_letters = (lang, raw_time) =>
{
    // raw_time --> ISODate

    const date = new Date(raw_time);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    let day_ending = '';
    let month_in_letters = '';
    let final_string = '';

    if (lang === 1) // French
    {
        day_ending = day === 1 ? 'er' : '';

        month_in_letters = month === 1 ? 'janvier' : month === 2 ? 'février' : month === 3 ? 'mars' : month === 4 ? 'avril' : month === 5 ? 'mai' 
        : month === 6 ? 'juin' : month === 7 ? 'juillet' : month === 8 ? 'août' : month === 9 ? 'septembre' : month === 10 ? 'octobre' : month === 11 ? 'novembre' : 'décembre';

        final_string = day + day_ending + ' ' + month_in_letters + ' ' + year;
    }
    else if (lang === 2) // Japanese
    {
        final_string = year + '年' + month + '月' + day + '日';
    }
    else // English
    {
        day_ending = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';

        month_in_letters = month === 1 ? 'January' : month === 2 ? 'February' : month === 3 ? 'March' : month === 4 ? 'April' : month === 5 ? 'May' 
        : month === 6 ? 'June' : month === 7 ? 'July' : month === 8 ? 'August' : month === 9 ? 'September' : month === 10 ? 'October' : month === 11 ? 'November' : 'December';

        final_string = day + day_ending + ' of ' + month_in_letters + ' ' + year;
    }

    return final_string;
};

const time = (raw_time, add_seconds) =>
{
    // raw_time --> ISODate
    // add_seconds --> boolean

    const date = new Date(raw_time);
    const hours = date.getUTCHours() + 1;
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + (!add_seconds ? '' : ':' + (seconds < 10 ? '0' + seconds : seconds));
};

export { date_in_letters, time };

