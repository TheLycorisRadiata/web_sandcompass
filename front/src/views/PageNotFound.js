import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import {
    title_page_not_found, msg_page_not_found, 
    go_back_portfolio 
} from '../assets/functions/lang';

const PageNotFound = (props) =>
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = title_page_not_found(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', msg_page_not_found(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', title_page_not_found(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', msg_page_not_found(ct.lang));

    return (
        <main>
            <h1 className="title">{title_page_not_found(ct.lang)}</h1>
            <p className="txt_centered">{msg_page_not_found(ct.lang)}</p>

            {props.is_portfolio && 
                <div id="go_back_portfolio">
                    <Link to="/portfolio"><button className="button">{go_back_portfolio(ct.lang)}</button></Link>
                </div>}
        </main>
    );
}

export default PageNotFound;

