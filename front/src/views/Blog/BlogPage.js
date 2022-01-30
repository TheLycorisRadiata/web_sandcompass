import { useState, useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    blog, blog_is_empty, sort_from_oldest, sort_from_most_recent,
    all_categories, category_is_empty, 
    info_category, info_author, info_created, info_modified, 
    user_not_found 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEnd, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { date_in_letters, time } from '../../assets/functions/time';
import { fetch_username_from_id } from '../../assets/functions/blog';
import ArticleExcerpt from '../../assets/components/ArticleExcerpt';

const icon_sorted_old = <FontAwesomeIcon icon={faHourglassEnd} />;
const icon_sorted_recent = <FontAwesomeIcon icon={faHourglassStart} />;

const BlogPage = (props) => 
{
    const ct = useContext(AppContext);

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
                json = await fetch_username_from_id(ct.lang, article.author);
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                if (json.is_success)
                    username = json.data;

                arr.push(username !== '' ? username : user_not_found(ct.lang));
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
            <h1 className="title">{blog(ct.lang)}</h1>
            {!props.articles.length ? 
                <p className="txt_centered">{blog_is_empty(ct.lang)}</p>
            :
            <>
                <div id="sort_buttons">
                    <div>
                        <button className="button" title={sort_from_oldest(ct.lang)} onClick={sort_old}>
                            <span className="icon">{icon_sorted_old}</span></button>
                        <button className="button" title={sort_from_most_recent(ct.lang)} onClick={sort_recent}>
                            <span className="icon">{icon_sorted_recent}</span></button>
                    </div>
                    <div>
                        <select value={category} onChange={filter_category}>
                            <option value="all">{all_categories(ct.lang)}</option>
                            {props.categories.map((e, i) => <option key={'cat_' + i} value={e._id}>{i + 1}. {e.name[ct.lang]}</option>)}
                        </select>
                    </div>
                </div>

                {category !== 'all' && !props.articles.filter(e => e.category === category).length ? <p className="txt_centered">{category_is_empty(ct.lang)}</p>
                :
                <>
                    {sort === 'old' ?
                    props.articles.map((e, i) => 
                        (category === 'all' || category === e.category) && ct.lang === e.language  && 
                            <article className="blog_section" key={e._id}>
                                <h2 className="sub_title"><Link to={'/blog/article' + e._id}>{e.title}</Link></h2>
                                <ul className="article_info">
                                    <li>{info_category(ct.lang)}{props.categories.find(category => category._id === e.category).name[ct.lang]}.</li>
                                    <li>{info_author(ct.lang)}{usernames[i]}.</li>
                                    <li>{info_created(ct.lang, date_in_letters(ct.lang, e.time_creation), time(e.time_creation, false))}</li>
                                    {e.is_modified && 
                                        <li>{info_modified(ct.lang, date_in_letters(ct.lang, e.time_modification), time(e.time_modification, false))}</li>}
                                </ul>

                                <ArticleExcerpt content={e.content} id={e._id} />
                            </article>)
                    :
                    props.articles.slice(0).reverse().map((e, i) => 
                        (category === 'all' || category === e.category) && ct.lang === e.language && 
                            <article className="blog_section" key={e._id}>
                                <h2 className="sub_title"><Link to={'/blog/article' + e._id}>{e.title}</Link></h2>
                                <ul className="article_info">
                                    <li>{info_category(ct.lang)}{props.categories.find(category => category._id === e.category).name[ct.lang]}.</li>
                                    <li>{info_author(ct.lang)}{usernames[i]}.</li>
                                    <li>{info_created(ct.lang, date_in_letters(ct.lang, e.time_creation), time(e.time_creation, false))}</li>
                                    {e.is_modified && 
                                        <li>{info_modified(ct.lang, date_in_letters(ct.lang, e.time_modification), time(e.time_modification, false))}</li>}
                                </ul>

                                <ArticleExcerpt content={e.content} id={e._id} />
                            </article>)}
                </>}
            </>}
        </main>
    );
};

export default BlogPage;

