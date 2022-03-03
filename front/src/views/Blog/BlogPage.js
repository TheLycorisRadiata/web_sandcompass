import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    blog, blog_is_empty, sort_from_oldest, sort_from_most_recent,
    all_categories, category_is_empty, 
    go_first_page, go_last_page, go_previous_page, go_next_page, go_precise_page, 
    info_categories, info_author, info_created, info_modified, 
    dot, comma_and_space, 
    category_not_found, user_not_found 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEnd, faHourglassStart, faBackward, faForward, faFastBackward, faFastForward, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { date_in_letters, time } from '../../assets/functions/time';
import ArticleExcerpt from '../../assets/components/ArticleExcerpt';
import package_info from '../../../package.json';

const icon_sorted_old = <FontAwesomeIcon icon={faHourglassEnd} />;
const icon_sorted_recent = <FontAwesomeIcon icon={faHourglassStart} />;
const icon_previous_page = <FontAwesomeIcon icon={faBackward} />;
const icon_next_page = <FontAwesomeIcon icon={faForward} />;
const icon_first_page = <FontAwesomeIcon icon={faFastBackward} />;
const icon_last_page = <FontAwesomeIcon icon={faFastForward} />;
const icon_reach_page = <FontAwesomeIcon icon={faFlagCheckered} />;

const BlogPage = (props) => 
{
    const ct = useContext(AppContext);

    const [category, set_category] = useState('all');
    const [sort, set_sort] = useState('old');
    const [articles, set_articles] = useState([]);
    const [is_blog_empty, set_is_blog_empty] = useState(false);
    const [last_page_number, set_last_page_number] = useState(1);
    const [input_blog_page, set_input_blog_page] = useState(1);

    // HTML standard meta tags
    document.title = blog(ct.lang) + '| Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', articles.map(e => { return ' ' + e.title[ct.lang] }));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', blog(ct.lang) + '| Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', articles.map(e => { return ' ' + e.title[ct.lang] }));
    document.querySelector('meta[property="og:type"').setAttribute('content', 'blog');

    useLayoutEffect(() => 
    {
        const filter = JSON.parse(localStorage.getItem('blog'));

        // Read filters and page from URL (/blog/all/old/1)
        const path_parts = window.location.pathname.split('/');
        // path_parts[1] is 'blog'
        const path_category = path_parts[2];
        const path_sort = path_parts[3];
        const path_page = parseInt(path_parts[4], 10);
        if (path_category === 'all' || path_category?.length === 4)
            set_category(path_category);
        if (path_sort === 'old' || path_sort === 'recent')
            set_sort(path_sort);
        if (Number.isInteger(path_page) && path_page > 0)
            props.set_blog_page(path_page); // 1 by default in App.js

        if (filter)
        {
            if (path_category === undefined)
                set_category(filter.category);
            if (path_sort === undefined)
                set_sort(filter.sort);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => 
    {
        window.history.replaceState(null, 'Sand Compass', `/blog/${category}/${sort}/${props.blog_page}`);

        fetch(`${package_info.api}/blog/${ct.lang}/articles/${category}/${sort}/${props.blog_page}`)
        .then(res => res.json())
        .then(json => 
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);

            if (json.is_success)
            {
                set_is_blog_empty(json.is_blog_empty);
                set_last_page_number(json.last_page_number);
                set_articles(json.data);
            }

            // If the saved category no longer exists, replace its ID by 'all'
            if (json.category_not_found)
            {
                localStorage.setItem('blog', JSON.stringify({ category: 'all', sort: sort }));
                set_category('all');
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, sort, props.blog_page]);

    useLayoutEffect(() => 
    {
        if (props.blog_page !== 1 && !articles.length)
            props.set_blog_page(last_page_number);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articles]);

    useEffect(() => document.querySelector('main')?.scrollIntoView(), []);

    const sort_old = () => 
    {
        const filter = { category: category, sort: 'old' };
        localStorage.setItem('blog', JSON.stringify(filter));
        set_sort('old');
    };

    const sort_recent = () => 
    {
        const filter = { category: category, sort: 'recent' };
        localStorage.setItem('blog', JSON.stringify(filter));
        set_sort('recent');
    };

    const filter_category = e => 
    {
        const selected_category = e.target.value;
        const filter = { category: selected_category, sort: sort };
        localStorage.setItem('blog', JSON.stringify(filter));
        set_category(selected_category);
    };

    const go_to_page = () => 
    {
        const number = parseInt(input_blog_page, 10);

        if (Number.isInteger(number))
        {
            if (number < 1)
                props.set_blog_page(1);
            else if (number > last_page_number)
                props.set_blog_page(last_page_number);
            else
                props.set_blog_page(number);
        }
        else
            props.set_blog_page(1);

        set_input_blog_page(1);
    };

    const handle_key_press = e => 
    {
        if (e.key === 'Enter')
            go_to_page();
    };

    const display_categories = txt_categories => 
    {
        let string = category_not_found(ct.lang) + dot(ct.lang);
        let i;

        if (txt_categories?.length)
        {
            string = '';

            for (i = 0; i < txt_categories.length; ++i)
            {
                if (i === txt_categories.length - 1)
                {
                    string += txt_categories[i][ct.lang] + dot(ct.lang);
                    break;
                }

                string += txt_categories[i][ct.lang] + comma_and_space(ct.lang);
            }
        }

        return string;
    };

    return (
        <main>
            <h1 className="title">{blog(ct.lang)}</h1>
            {is_blog_empty ? 
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
                            {props.categories?.map((e, i) => <option key={'cat_' + i} value={e.code}>{i + 1}. {e.name[ct.lang]}</option>)}
                        </select>
                    </div>
                </div>

                {!articles.length ? <p className="txt_centered">{category_is_empty(ct.lang)}</p>
                :
                <>
                    {articles.map((e, i) => 
                    <article className="blog_section" key={'article_' + i}>
                        <h2 className="sub_title"><Link to={'/blog/article/' + e.code}>{e.title[ct.lang]}</Link></h2>
                        <ul className="article_info">
                            <li>{info_categories(ct.lang)}
                                {display_categories(e.txt_categories)}</li>
                            <li>{info_author(ct.lang)}{(!e.txt_author ? user_not_found(ct.lang) : e.txt_author) + dot(ct.lang)}</li>
                            <li>{info_created(ct.lang, date_in_letters(ct.lang, e.time_creation), time(e.time_creation, false))}</li>
                            {e.is_modified && 
                                <li>{info_modified(ct.lang, date_in_letters(ct.lang, e.time_modification), time(e.time_modification, false))}</li>}
                        </ul>

                        <ArticleExcerpt content={e.content[ct.lang]} code={e.code} />
                    </article>)}

                    {last_page_number !== 1 && 
                    <div id="page_buttons">
                        <div id="arrows">
                            <div>
                                <button className="button" title={go_first_page(ct.lang)} 
                                    onClick={() => props.set_blog_page(1)}>
                                    <span className="icon">{icon_first_page}</span>
                                </button>

                                <button className="button" title={go_previous_page(ct.lang)} 
                                    onClick={() => props.set_blog_page(props.blog_page === 1 ? 1 : props.blog_page - 1)}>
                                    <span className="icon">{icon_previous_page}</span>
                                </button>
                            </div>

                            <p>{props.blog_page}/{last_page_number}</p>

                            <div>
                                <button className="button" title={go_next_page(ct.lang)} 
                                    onClick={() => props.set_blog_page(props.blog_page === last_page_number ? props.blog_page : props.blog_page + 1)}>
                                    <span className="icon">{icon_next_page}</span>
                                </button>

                                <button className="button" title={go_last_page(ct.lang)} 
                                    onClick={() => props.set_blog_page(last_page_number)}>
                                    <span className="icon">{icon_last_page}</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <input type="number" step="1" min="1" width="auto" id="page_number" value={input_blog_page} onChange={e => set_input_blog_page(e.target.value)} onKeyPress={handle_key_press} />
                            <button className="button" title={go_precise_page(ct.lang)} onClick={go_to_page}><span className="icon">{icon_reach_page}</span></button>
                        </div>
                    </div>}
                </>}
            </>}
        </main>
    );
};

export default BlogPage;

