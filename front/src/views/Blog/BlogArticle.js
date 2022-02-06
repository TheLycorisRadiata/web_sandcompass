import { useState, useLayoutEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Parser from 'html-react-parser';
import { AppContext } from '../../App';
import {
    blog, other_articles, like, dislike, vote_instruction, 
    info_category, info_author, info_created, info_modified, 
    title_not_found, category_not_found, user_not_found, content_not_found, 
    wip, error_article_doesnt_exist, like_own_article, dislike_own_article 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faThumbsUp as faThumbsUpSolid, faThumbsDown as faThumbsDownSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { date_in_letters, time } from '../../assets/functions/time';
import { backend } from '../../../package.json';

const icon_heart = <FontAwesomeIcon icon={faHeart} />;
const icon_heart_broken = <FontAwesomeIcon icon={faHeartBroken} />;
const icon_empty_like = <FontAwesomeIcon icon={faThumbsUp} />;
const icon_empty_dislike = <FontAwesomeIcon icon={faThumbsDown} />;
const icon_filled_like = <FontAwesomeIcon icon={faThumbsUpSolid} />;
const icon_filled_dislike = <FontAwesomeIcon icon={faThumbsDownSolid} />;

const BlogArticle = (props) => 
{
    const ct = useContext(AppContext);
    const history = useHistory();

    const [article, set_article] = useState(null);
    const [likes, set_likes] = useState(0);
    const [id_user, set_id_user] = useState(null);
    const [user_vote, set_user_vote] = useState(0);

    const display_title = () => article?.title[ct.lang] === '' ? title_not_found(ct.lang) : article?.title[ct.lang];
    const display_author = () => article?.txt_author === undefined || !article?.txt_author || article?.txt_author === '' ? user_not_found(ct.lang) : article?.txt_author;
    const display_content = () => !article || article?.content[ct.lang] === '' ? content_not_found(ct.lang) : article?.content[ct.lang];
    const display_category = () => article?.txt_category === undefined || !article?.txt_category ? category_not_found(ct.lang) : article?.txt_category[ct.lang]; 

    useLayoutEffect(() => 
    {
        // Fetch the article from url
        const path_parts = window.location.pathname.split('/');     
        let last_part = path_parts[path_parts.length - 1];

        if (last_part === '' && path_parts.length - 2 >= 0)
            last_part = path_parts[path_parts.length - 2];
        last_part = last_part.replace('article', '');

        fetch(`${backend}/blog/${ct.lang}/article/${last_part}`)
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);

            if (json.is_success)
                set_article(json.data);
            else
                history.push('/nope');
        })
        .catch(err => console.log(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => 
    {
        if (article)
        {
            // Display the number of likes
            set_likes(article.users.likes.length - article.users.dislikes.length);

            // If logged in, interact as user
            if (props.admin_account_data)
            {
                set_id_user(props.admin_account_data._id);

                // Set the user's vote to know how to display the like/dislike buttons
                if (props.admin_account_data.articles.liked.includes(article._id))
                    set_user_vote(1);
                else if (props.admin_account_data.articles.disliked.includes(article._id))
                    set_user_vote(-1);
                else
                    set_user_vote(0);
            }
            else if (props.user_account_data)
            {
                set_id_user(props.user_account_data._id);

                // Set the user's vote to know how to display the like/dislike buttons
                if (props.user_account_data.articles.liked.includes(article._id))
                    set_user_vote(1);
                else if (props.user_account_data.articles.disliked.includes(article._id))
                    set_user_vote(-1);
                else
                    set_user_vote(0);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article]);

    const increment_likes = () => 
    {
        const articles = [...props.articles];
        const index_current_article = articles.findIndex(e => e._id === article?._id);

        // Block the feature
        alert(wip(ct.lang));
        return;

        // Should be impossible
        if (index_current_article === -1)
        {
            alert(error_article_doesnt_exist(ct.lang));
            history.push('/blog');
            return;
        }

        if (id_user === article?.author)
        {
            alert(like_own_article(ct.lang));
        }
        else
        {
            fetch(`${backend}/blog/${ct.lang}/vote/article`,
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_article: article?._id,
                    id_user: id_user,
                    user_vote: 1
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);

                if (json.is_success)
                {
                    set_user_vote(json.user_vote);
                    set_likes(json.article.users.likes.length - json.article.users.dislikes.length);

                    if (props.admin_account_data && props.admin_account_data._id === id_user)
                        props.set_admin_account_data(json.user);
                    else if (props.user_account_data && props.user_account_data._id === id_user)
                        props.set_user_account_data(json.user);

                    articles[index_current_article] = json.article;
                    props.set_articles(articles);
                }
                else
                    alert(json.message);
            })
            .catch(err => console.log(err));
        }
    };

    const decrement_likes = () => 
    {
        const articles = [...props.articles];
        const index_current_article = articles.findIndex(e => e._id === article?._id);

        // Block the feature
        alert(wip(ct.lang));
        return;

        // Should be impossible
        if (index_current_article === -1)
        {
            alert(error_article_doesnt_exist(ct.lang));
            history.push('/blog');
            return;
        }

        if (id_user === article?.author)
        {
            alert(dislike_own_article(ct.lang));
        }
        else
        {
            fetch(`${backend}/blog/${ct.lang}/vote/article`,
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_article: article?._id,
                    id_user: id_user,
                    user_vote: -1
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);

                if (json.is_success)
                {
                    set_user_vote(json.user_vote);
                    set_likes(json.article.users.likes.length - json.article.users.dislikes.length);

                    if (props.admin_account_data && props.admin_account_data._id === id_user)
                        props.set_admin_account_data(json.user);
                    else if (props.user_account_data && props.user_account_data._id === id_user)
                        props.set_user_account_data(json.user);

                    articles[index_current_article] = json.article;
                    props.set_articles(articles);
                }
                else
                    alert(json.message);
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <main>
            <h1 className="title">{blog(ct.lang)}</h1>
            <div className="btn_other_articles"><Link to="/blog" className="button">{other_articles(ct.lang)}</Link></div>

            <article>
                <h2 className="sub_title">{display_title()}</h2>
                <ul className="article_info">
                    <li>{info_category(ct.lang)}{display_category()}.</li>
                    <li>{info_author(ct.lang)}{display_author()}.</li>
                    <li>{info_created(ct.lang, date_in_letters(ct.lang, article?.time_creation), time(article?.time_creation, false))}</li>
                    {article?.is_modified && 
                        <li>{info_modified(ct.lang, date_in_letters(ct.lang, article?.time_modification), time(article?.time_modification, false))}</li>}
                </ul>

                <div>{Parser(display_content())}</div>
            </article>

            <div className="btn_other_articles"><Link to="/blog" className="button">{other_articles(ct.lang)}</Link></div>

            <div id="likes_dislikes">
                <span id="txt_likes">{likes < 0 ? icon_heart_broken : icon_heart} {likes}</span>
                {!props.admin_account_data && !props.user_account_data ? 
                    <button className="button" name="btn_login" onClick={() => history.push('/user')}>{vote_instruction(ct.lang)}</button>
                :
                    <>
                        <button className="button" name="btn_like" onClick={increment_likes}>
                            <span className="icon">{user_vote === 1 ? icon_filled_like : icon_empty_like}</span> {like(ct.lang)}</button>
                        <button className="button" name="btn_dislike" onClick={decrement_likes}>
                            <span className="icon">{user_vote === -1 ? icon_filled_dislike : icon_empty_dislike}</span> {dislike(ct.lang)}</button>
                    </>}
            </div>
        </main>
    );
};

export default BlogArticle;

