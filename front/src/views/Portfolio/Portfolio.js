import { useContext } from 'react';
import { AppContext } from '../../App';
import {
    portfolio, portfolio_desc, 
    code, disclaimer_link_code, 
    real_websites, opt_this_website, 
    web_projects, mobile_projects, software_projects 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

const icon_code = <FontAwesomeIcon icon={faFileCode} />;

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
                <li>
                    <a href="https://www.sandcompass.com" rel="noreferrer" target="_blank">{opt_this_website(ct.lang)}</a>
                    <a href="https://github.com/thelycorisradiata/web_sandcompass" rel="noreferrer" target="_blank" title={code(ct.lang)} className="link_code">
                        <span className="icon">{icon_code}</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.votam.fr" rel="nofollow noreferrer" target="_blank">VOTAM</a>
                    <span className="no_link_code" title={disclaimer_link_code(ct.lang)}>{icon_code}</span>
                </li>
            </ul>

            <h3 className="sub_title">{web_projects(ct.lang)}</h3>
            <ul>
                <li>
                    <a href="https://thelycorisradiata.github.io/web_onepage" rel="noreferrer" target="_blank">Guitar Shop</a>
                    <a href="https://github.com/thelycorisradiata/web_onepage" rel="noreferrer" target="_blank" title={code(ct.lang)} className="link_code">
                        <span className="icon">{icon_code}</span>
                    </a>
                </li>
                <li>
                    <a href="https://thelycorisradiata.github.io/web_todolist" rel="noreferrer" target="_blank">Todo List</a>
                    <a href="https://github.com/thelycorisradiata/web_todolist" rel="noreferrer" target="_blank" title={code(ct.lang)} className="link_code">
                        <span className="icon">{icon_code}</span>
                    </a>
                </li>
                <li>
                    <a href="https://thelycorisradiata.github.io/web_onlineoffice" rel="noreferrer" target="_blank">Online Office</a>
                    <a href="https://github.com/thelycorisradiata/web_onlineoffice" rel="noreferrer" target="_blank" title={code(ct.lang)} className="link_code">
                        <span className="icon">{icon_code}</span>
                    </a>
                </li>
            </ul>

            <h3 className="sub_title">{mobile_projects(ct.lang)}</h3>
            <ul>
                <li>
                    <a href="https://shorturl.at/knEK1" rel="noreferrer" target="_blank">Weather Forecast</a>
                    <a href="https://github.com/thelycorisradiata/app_forecast" rel="noreferrer" target="_blank" title={code(ct.lang)} className="link_code">
                        <span className="icon">{icon_code}</span>
                    </a>
                </li>
                <li>
                    <a href="https://shorturl.at/esL56" rel="noreferrer" target="_blank">Random Cocktail</a>
                    <a href="https://github.com/thelycorisradiata/app_cocktail" rel="noreferrer" target="_blank" title={code(ct.lang)} className="link_code">
                        <span className="icon">{icon_code}</span>
                    </a>
                </li>
            </ul>

            <h3 className="sub_title">{software_projects(ct.lang)}</h3>
            <ul>
                <li>
                    <a href={`${package_info.homepage}/portfolio/persistence`}>Persistence</a>
                    <a href="https://github.com/thelycorisradiata/game_persistence" rel="noreferrer" target="_blank" title={code(ct.lang)} className="link_code">
                        <span className="icon">{icon_code}</span>
                    </a>
                </li>
            </ul>
        </main>
    );
};

export default Portfolio;

