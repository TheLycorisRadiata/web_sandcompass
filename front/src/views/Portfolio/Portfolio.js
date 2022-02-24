import { useContext } from 'react';
import { AppContext } from '../../App';
import {
    portfolio, portfolio_desc, 
    real_websites, opt_this_website, 
    web_projects 
} from '../../assets/functions/lang';

const Portfolio = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = portfolio(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', portfolio_desc(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', portfolio(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', portfolio_desc(ct.lang));

    return (
        <main id="portfolio">
            <h1 className="title">{portfolio(ct.lang)}</h1>
            <p className="txt_centered">{portfolio_desc(ct.lang)}</p>

            <h2 className="sub_title">{real_websites(ct.lang)}</h2>
            <ul>
                <li><a href="https://www.sandcompass.com" target="_blank">{opt_this_website(ct.lang)}</a></li>
                <li><a href="https://www.votam.fr" target="_blank">VOTAM</a></li>
                <li>Mobile : Forecast</li>
                <li>Mobile : Cocktail</li>
            </ul>

            <h3 className="sub_title">{web_projects(ct.lang)}</h3>
            <ul>
                <li><a href="https://www.sandcompass.com/portfolio/guitar_shop" target="_blank">Guitar Shop (one page)</a></li>
            </ul>
        </main>
    );
};

export default Portfolio;

