import { useContext } from 'react';
import { AppContext } from '../../App';
import {
    licenses, license_contact, free, bought, 
    font, favicon, banner, round_country_flags, 
    logo_youtube, logo_github, logo_reddit, 
    book_cover_cosmic_dust 
} from '../../assets/functions/lang';

const Licenses = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = licenses(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', license_contact(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', licenses(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', license_contact(ct.lang));

    return (
        <main id="licenses">
            <h1 className="title">{licenses(ct.lang)}</h1>

            <p className="txt_centered txt_italic">{license_contact(ct.lang)}</p>

            <p className="txt_centered txt_bold">{free(ct.lang)}</p>
            <ul>
                <li><a href="https://fonts.google.com/specimen/Fira+Sans#license" rel="nofollow noreferrer" target="_blank">{font(ct.lang, 'Fira Sans', 'light')}</a></li>
                <li><a href="https://openclipart.org/share" rel="nofollow noreferrer" target="_blank">{favicon(ct.lang)}</a></li>
                <li><a href="https://commons.wikimedia.org/wiki/File:Old_temple_-URUK_Ancient_city.jpg" rel="nofollow noreferrer" target="_blank">{banner(ct.lang)}</a></li>
                <li><a href="https://www.youtube.com/about/brand-resources/#logos-icons-colors" rel="nofollow noreferrer" target="_blank">{logo_youtube(ct.lang)}</a></li>
                <li><a href="https://github.com/logos" rel="nofollow noreferrer" target="_blank">{logo_github(ct.lang)}</a></li>
                <li><a href="https://www.redditinc.com/brand" rel="nofollow noreferrer" target="_blank">{logo_reddit(ct.lang)}</a></li>
            </ul>

            <p className="txt_centered txt_bold">{bought(ct.lang)}</p>
            <ul>
                <li><a href="https://www.countryflags.com/license-agreement/" rel="nofollow noreferrer" target="_blank">{round_country_flags(ct.lang)}</a></li>
                <li><a href="https://500px.com/p/madalinv?view=photos" rel="nofollow noreferrer" target="_blank">{book_cover_cosmic_dust(ct.lang)}</a></li>
            </ul>
        </main>
    );
};

export default Licenses;

