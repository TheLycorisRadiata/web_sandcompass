import { Link } from 'react-router-dom';
import { DateInLetters, Time } from '../../assets/components/Time';

const BlogPage = (props) => 
{
    return (
        <main>
            <h1 className="title">Blog</h1>
            {props.all_articles.map(article => 
                <article className="blog_section" key={article._id}>
                    <h2 className="sub_title"><Link to={'/blog/article' + article._id + '.html'}>{article.title}</Link></h2>
                    <p className="article_info">Category: {article.category}.<br />
                    Created: On the <DateInLetters raw_time={article.time_creation} /> at <Time raw_time={article.time_creation} />.
                    {article.is_modified && 
                    <>
                        <br />
                        <span>Modified: On the <DateInLetters raw_time={article.time_modification} /> at <Time raw_time={article.time_modification} seconds={false} />.</span>
                    </>}
                    </p>
                    <div dangerouslySetInnerHTML={{__html: article.content.substring(0, 400) + " [...]"}} />
                    <div className="read_more">
                        <Link to={'/blog/article' + article._id + '.html'}>[Read more]</Link>
                    </div>
                </article>)}
        </main>
    );
};

export default BlogPage;

