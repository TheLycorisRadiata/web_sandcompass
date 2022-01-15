import { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEnd, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { DateInLetters, Time } from '../../assets/components/Time';
import { fetch_username_from_id } from '../../assets/functions/blog';

const icon_sorted_old = <FontAwesomeIcon icon={faHourglassEnd} />;
const icon_sorted_recent = <FontAwesomeIcon icon={faHourglassStart} />;

const BlogPage = (props) => 
{
    const [sort, set_sort] = useState('old');
    const [category, set_category] = useState('all');
    const [usernames, set_usernames] = useState([]);

    useLayoutEffect(() => 
    {
        const filter = JSON.parse(localStorage.getItem('blog'));

        const populate_usernames = async () => 
        {
            const arr = [];
            let json = null;
            let username = '';

            for (const article of props.articles)
            {
                json = await fetch_username_from_id(article.author);
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                if (json.is_success)
                    username = json.data;

                arr.push(username !== '' ? username : '[User not found]');
            }

            set_usernames(arr);
        };

        populate_usernames();

        if (filter)
        {
            set_sort(filter.sort);

            /*
                ISSUE: This piece of code doesn't work, help am baby.
                Whether the category exists or not, it's always undefined in the if-statement, yet a console.log() shows it exists.

                // If the saved category no longer exists, replace its ID by 'all' in the local storage
                if (filter.category !== 'all' && props.categories.find(e => e._id === filter.category) === undefined)
                {
                    filter.category = 'all';
                    localStorage.setItem('blog', JSON.stringify(filter));
                }
            */

            set_category(filter.category);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sort_old = () => 
    {
        const filter = { sort: 'old', category: category };
        localStorage.setItem('blog', JSON.stringify(filter));
        set_sort('old');
    };

    const sort_recent = () => 
    {
        const filter = { sort: 'recent', category: category };
        localStorage.setItem('blog', JSON.stringify(filter));
        set_sort('recent');
    };

    const filter_category = e => 
    {
        const selected_category = e.target.value;
        const filter = { sort: sort, category: selected_category };
        localStorage.setItem('blog', JSON.stringify(filter));
        set_category(selected_category);
    };

    return (
        <main>
            <h1 className="title">Blog</h1>
            {!props.articles.length ? 
                <p className="txt_centered">The blog is empty.</p>
            :
            <>
                <div id="sort_buttons">
                    <div>
                        <button className="button" title="Sort from oldest to most recent" onClick={sort_old}>
                            <span className="icon">{icon_sorted_old}</span></button>
                        <button className="button" title="Sort from most recent to oldest" onClick={sort_recent}>
                            <span className="icon">{icon_sorted_recent}</span></button>
                    </div>
                    <div>
                        <select value={category} onChange={filter_category}>
                            <option value="all">All categories</option>
                            {props.categories.map((e, i) => <option key={'cat_' + i} value={e._id}>{i + 1}. {e.name[0]}</option>)}
                        </select>
                    </div>
                </div>

                {category !== 'all' && !props.categories.find(e => e._id === category).articles.length ?
                    <p className="txt_centered">This category is empty.</p>
                :
                <>
                    {sort === 'old' ?
                    props.articles.map((e, i) => 
                        (category === 'all' || category === e.category) && 
                            <article className="blog_section" key={e._id}>
                                <h2 className="sub_title"><Link to={'/blog/article' + e._id}>{e.title}</Link></h2>
                                <ul className="article_info">
                                    <li>Category: {props.categories.find(category => category._id === e.category).name[0]}.</li>
                                    <li>Author: {usernames[i]}.</li>
                                    <li>Created: On the <DateInLetters raw_time={e.time_creation} /> at <Time raw_time={e.time_creation} />.</li>
                                    {e.is_modified && 
                                        <li>Modified: On the <DateInLetters raw_time={e.time_modification} /> at <Time raw_time={e.time_modification} seconds={false} />.</li>}
                                </ul>

                                <div dangerouslySetInnerHTML={{__html: e.content.substring(0, 400) + " [...]"}} />
                                <div className="read_more">
                                    <Link to={'/blog/article' + e._id}>[Read more]</Link>
                                </div>
                            </article>)
                    :
                    props.articles.slice(0).reverse().map((e, i) => 
                        (category === 'all' || category === e.category) && 
                            <article className="blog_section" key={e._id}>
                                <h2 className="sub_title"><Link to={'/blog/article' + e._id}>{e.title}</Link></h2>
                                <ul className="article_info">
                                    <li>Category: {props.categories.find(category => category._id === e.category).name[0]}.</li>
                                    <li>Author: {usernames[i]}.</li>
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
            </>}
        </main>
    );
};

export default BlogPage;

