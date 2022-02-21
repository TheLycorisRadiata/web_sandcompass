import { useContext } from 'react';
import { AppContext } from '../App';
import { title_page_not_found, msg_page_not_found } from '../assets/functions/lang';

const PageNotFound = () =>
{
    const ct = useContext(AppContext);
    document.title = title_page_not_found(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', msg_page_not_found(ct.lang));

    return (
        <main>
            <h1 className="title">{title_page_not_found(ct.lang)}</h1>
            <p className="txt_centered">{msg_page_not_found(ct.lang)}</p>
        </main>
    );
}

export default PageNotFound;

