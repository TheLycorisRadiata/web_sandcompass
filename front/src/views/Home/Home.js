import { Link } from 'react-router-dom';
import Book_Cover from '../../assets/images/cosmic_dust_cover_eng.png';
import SocialMedia from '../../assets/components/SocialMedia';

const Home = (props) => 
{
    return (
        <main>
            <h1>Home</h1>

            <article>
                <h2>What is this website?</h2>
                <div id="presentation_website">
                    <p>"Sand Compass" is the name of a future French company. Sand Compass has for ambition to go tickle the known world's frontiers, but will for now settle for its 
                    favorite domain: storytelling! This website therefore presents the fictitious works of Lycoris Radiata, self-proclaimed CEO, and... Lil' lady whose coding skills 
                    surely need some refining.</p>
                    <p>If this is not your first visit, welcome back! I thank you for your patience and loyalty, they will be rewarded.</p>
                </div>
            </article>

            <section id="current_work">
                <h2><Link to="/works/">Cosmic Dust: Sci-fi standalone novel</Link></h2>

                <div id="book_presentation">
                    <Link to="/works/"><img src={Book_Cover} alt="Book cover Cosmic Dust" id="book_cover" /></Link>

                    <div>
                        <p id="book_catch_phrase"><em>Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly?</em></p>

                        <div id="book_summary">
                            <p>Zekharia Bettelheim is an unpretentious citizen of the Society of Arks, a spaceship on a quest for a new planet. Suffering, he tries to find an 
                            explanation to his affliction and is helped for this by the character he created. His imaginary friend helps with putting his thoughts in order, but 
                            he knows that someday he will need to call on a real person.</p>
                            <p>A chain of circumstances leads him to contact a former classmate who, contrary to Zekharia, seems to blossom in their little world and have 
                            everything going for him. This man can become the friend he needs, but first his being trustworthy has yet to be confirmed.</p>
                            <p>There is a real difference between a creation we know about and a human being, who always keeps their share of mystery and is therefore able of 
                            betrayal. In a world elevating the useful in dogma, it is difficult to admit to anyone that art makes us going through the day, even more so to a 
                            person who could as well be the Society personified. But is it this crazy to say that art is not only useful, but also essential?</p>
                            <p>Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly? No matter the answer, two roads lie 
                            before him: twisting himself to fit in or finding the way to change mentalities.</p>
                        </div>
                    </div>
                </div>
            </section>

            <SocialMedia />

            {props.last_article !== undefined &&
            <section id="last_article">
                <div>
                    <h2><Link to={'/blog/article' + props.last_article._id + '.html'}>Last article</Link></h2>
                    <p id="last_article_title">{props.last_article.title}</p>
                </div>

                <div dangerouslySetInnerHTML={{__html: props.last_article.content.substring(0, 400) + " [...]"}} />

                <div className="read_more">
                    <Link to={'/blog/article' + props.last_article._id + '.html'}>[Read more]</Link>
                </div>
            </section>}
        </main>
    );
};

export default Home;

