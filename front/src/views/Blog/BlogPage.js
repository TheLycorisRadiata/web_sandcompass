import { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { DateInLetters, Time } from '../../assets/components/Time';
import { backend } from '../../../package.json';

const BlogPage = (props) => 
{
    const [authors, set_authors] = useState([]);

    useLayoutEffect(() => 
    {
        const fetch_username = async (id) =>
        {
            let res = await fetch(backend + `/user/username/${id}`);
            res = res.json();
            return res;
        };

        const arr = [];
        let json;

        for (const article of props.all_articles)
        {
            json = fetch_username(article.author);
            
            console.log(json.message);
            if (json.error)
                console.log(json.error);

            arr.push(json.is_success ? json.data : '[Author not found]');
        }

        set_authors(arr);

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

