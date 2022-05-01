import { useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import {
    legal_notices, wip 
} from '../../assets/functions/lang';

const LegalNotices = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = legal_notices(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', wip(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', legal_notices(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', wip(ct.lang));

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    return (
        <main>
            <h1 className="title">{legal_notices(ct.lang)}</h1>

            <p className="txt_centered">{wip(ct.lang)}</p>
        </main>
    );
};

export default LegalNotices;

