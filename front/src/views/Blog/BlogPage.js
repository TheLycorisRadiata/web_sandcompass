import { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { DateInLetters, Time } from '../../assets/components/Time';
import { fetch_username_from_id } from '../../assets/functions/blog';

const BlogPage = (props) => 
{
    const [authors, set_authors] = useState([]);

    useLayoutEffect(() => 
    {
        const populate_authors = async () => 
        {
            const arr = [];
            let json = null;
            let username = '';

            for (const article of props.all_articles)
            {
                json = await fetch_username_from_id(article.author);
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                if (json.is_success)
                    username = json.data;

                arr.push(username !== '' ? username : '[Author not found]');
            }

            set_authors(arr);
        };

        populate_authors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main>
            <h1 className="title">Blog</h1>
            {!props.all_articles.length ? 
                <p className="txt_centered">The blog is empty.</p>
            :
            <>
                {props.all_articles.map((e, i) => 
                    <article className="blog_section" key={e._id}>
                        <h2 className="sub_title"><Link to={'/blog/article' + e._id}>{e.title}</Link></h2>
                        <ul className="article_info">
                            <li>Category: {e.category}.</li>
                            <li>Author: {authors[i]}.</li>
                            <li>Created: On the <DateInLetters raw_time={e.time_creation} /> at <Time raw_time={e.time_creation} />.</li>
                            {e.is_modified && 
                                <li>Modified: On the <DateInLetters raw_time={e.time_modification} /> at <Time raw_time={e.time_modification} seconds={false} />.</li>}
                        </ul>
                        <div dangerouslySetInnerHTML={{__html: e.content.substring(0, 400) + " [...]"}} />
                        <div className="read_more">
                            <Link to={'/blog/article' + e._id}>[Read more]</Link>
                        </div>
                    </article>)}
            </>}
        </main>
    );
};

export default BlogPage;

