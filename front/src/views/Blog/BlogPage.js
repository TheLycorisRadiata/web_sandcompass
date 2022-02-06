import { useState, useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    blog, blog_is_empty, sort_from_oldest, sort_from_most_recent,
    all_categories, category_is_empty, 
    info_category, info_author, info_created, info_modified, 
    category_not_found, user_not_found 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEnd, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { date_in_letters, time } from '../../assets/functions/time';
import ArticleExcerpt from '../../assets/components/ArticleExcerpt';
import { backend } from '../../../package.json';

const icon_sorted_old = <FontAwesomeIcon icon={faHourglassEnd} />;
const icon_sorted_recent = <FontAwesomeIcon icon={faHourglassStart} />;

const BlogPage = (props) => 
{
    const ct = useContext(AppContext);

    const [category, set_category] = useState('all');
    const [sort, set_sort] = useState('old');
    const [page, set_page] = useState(1);
    const [articles, set_articles] = useState([]);
    const [is_blog_empty, set_is_blog_empty] = useState(false);

    useLayoutEffect(() => 
    {
        const filter = JSON.parse(localStorage.getItem('blog'));

        if (filter)
        {
            set_category(filter.category);
            set_sort(filter.sort);
        }

        set_page(1);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => 
    {
        fetch(`${backend}/blog/${ct.lang}/articles/${category}/${sort}/${page}`)
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);

            if (json.is_success)
            {
                set_is_blog_empty(json.is_blog_empty);
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
    }, [category, sort, page]);

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
                            {props.categories.map((e, i) => <option key={'cat_' + i} value={e._id}>{i + 1}. {e.name[ct.lang]}</option>)}
                        </select>
                    </div>
                </div>

                {!articles.length ? <p className="txt_centered">{category_is_empty(ct.lang)}</p>
                :
                articles.map(e => 
                    <article className="blog_section" key={e._id}>
                        <h2 className="sub_title"><Link to={'/blog/article' + e._id}>{e.title[ct.lang]}</Link></h2>
                        <ul className="article_info">
                            <li>{info_category(ct.lang)}
                                {props.categories.find(cat => cat._id === e.category).name[ct.lang] /*!e.txt_category ? category_not_found(ct.lang) : e.txt_category[ct.lang]*/}.</li>
                            <li>{info_author(ct.lang)}{'Lycoris' /*!e.txt_author ? user_not_found(ct.lang) : e.txt_author*/}.</li>
                            <li>{info_created(ct.lang, date_in_letters(ct.lang, e.time_creation), time(e.time_creation, false))}</li>
                            {e.is_modified && 
                                <li>{info_modified(ct.lang, date_in_letters(ct.lang, e.time_modification), time(e.time_modification, false))}</li>}
                        </ul>

                        <ArticleExcerpt content={e.content[ct.lang]} id={e._id} />
                    </article>)
                }
            </>}
        </main>
    );
};

export default BlogPage;

