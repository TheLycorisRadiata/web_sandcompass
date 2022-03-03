import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { AppContext } from '../../App';
import {
    home, title_about_website, msg_about_website, sub_newsletter, 
    home_cosmic_dust, catch_phrase_cosmic_dust, summary_cosmic_dust, 
    title_last_article 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import DisplayCover from '../../assets/components/DisplayCover';
import SocialMedia from '../../assets/components/SocialMedia';
import ArticleExcerpt from '../../assets/components/ArticleExcerpt';
import package_info from '../../../package.json';

const icon_newsletter = <FontAwesomeIcon icon={faEnvelope} />;

const Home = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = home(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', msg_about_website(ct.lang).substring(0, 400) + '...');
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', home(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', msg_about_website(ct.lang).substring(0, 400) + '...');

    const [last_article, set_last_article] = useState(null);

    useLayoutEffect(() => 
    {
        fetch(`${package_info.api}/blog/${ct.lang}/article/last`)
        .then(res => res.json())
        .then(json => 
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);
            if (json.is_success) 
                set_last_article(json.data);
        });
        //.catch(err => console.log(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => document.querySelector('main')?.scrollIntoView(), []);

    return (
        <main>
            <h1 className="title">{home(ct.lang)}</h1>

            <article>
                <h2 className="sub_title">{title_about_website(ct.lang)}</h2>
                <div>{Parser(msg_about_website(ct.lang))}</div>

                <div id="subscribe_newsletter">
                    <Link to={{ pathname: '/user/signup', state: { user_wants_newsletter: true } }} className="button">
                        <span className="icon">{icon_newsletter}</span>
                        <span>{sub_newsletter(ct.lang)}</span>
                        <span className="icon">{icon_newsletter}</span>
                    </Link>
                </div>
            </article>

            <section>
                <h2 className="sub_title"><Link to="/works">{home_cosmic_dust(ct.lang)}</Link></h2>

                <div id="book_presentation">
                    <Link to="/works"><DisplayCover lang={ct.lang} /></Link>

                    <div>
                        <p id="catch_phrase"><em>{catch_phrase_cosmic_dust(ct.lang)}</em></p>

                        {summary_cosmic_dust(ct.lang).map((e, i) => <p key={'summary_' + i}>{e}</p>)}
                        <p className="clear"></p>
                    </div>
                </div>
            </section>

            <SocialMedia />

            {last_article && 
            <section>
                <div>
                    <h2 className="sub_title"><Link to={'/blog/article/' + last_article.code}>{title_last_article(ct.lang)}</Link></h2>
                    <h3 id="last_article_title" className="sub_title">{last_article.title[ct.lang]}</h3>
                </div>

                <ArticleExcerpt content={last_article.content[ct.lang]} code={last_article.code} />
            </section>}
        </main>
    );
};

export default Home;

