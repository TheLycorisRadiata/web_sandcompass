import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    home, title_about_website, msg_about_website, 
    home_cosmic_dust, catch_phrase_cosmic_dust, summary_cosmic_dust, 
    last_article, read_more 
} from '../../assets/functions/lang';
import DisplayCover from '../../assets/components/DisplayCover';
import SocialMedia from '../../assets/components/SocialMedia';

const Home = (props) => 
{
    const ct = useContext(AppContext);

    return (
        <main>
            <h1 className="title">{home(ct.lang)}</h1>

            <article>
                <h2 className="sub_title">{title_about_website(ct.lang)}</h2>
                <div dangerouslySetInnerHTML={{__html: msg_about_website(ct.lang)}} />
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

            {props.last_article !== undefined &&
            <section>
                <div>
                    <h2 className="sub_title"><Link to={'/blog/article' + props.last_article._id}>{last_article(ct.lang)}</Link></h2>
                    <h3 id="last_article_title" className="sub_title">{props.last_article.title}</h3>
                </div>

                <div dangerouslySetInnerHTML={{__html: props.last_article.content.substring(0, 400) + " [...]"}} />

                <div className="read_more">
                    <Link to={'/blog/article' + props.last_article._id}>{read_more(ct.lang)}</Link>
                </div>
            </section>}
        </main>
    );
};

export default Home;

