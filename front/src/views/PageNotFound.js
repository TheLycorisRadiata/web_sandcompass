import { useEffect, useContext } from 'react';
import { AppContext } from '../App';
import {
    title_page_not_found, msg_page_not_found 
} from '../assets/functions/lang';

const PageNotFound = () =>
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = title_page_not_found(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', msg_page_not_found(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', title_page_not_found(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', msg_page_not_found(ct.lang));

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    return (
        <main>
            <h1 className="title">{title_page_not_found(ct.lang)}</h1>
            <p className="txt_centered">{msg_page_not_found(ct.lang)}</p>
        </main>
    );
}

export default PageNotFound;

