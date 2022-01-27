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
    const current_time = Date.now();

    const [username, set_username] = useState(user_not_found(ct.lang));
    const [likes, set_likes] = useState(props.article.likes);
    const [id_user, set_id_user] = useState(null);
    const [user_vote, set_user_vote] = useState(0);

    const display_title = () => props.article.title === undefined || props.article.title === '' ? title_not_found(ct.lang) : props.article.title;
    const display_category = () => props.category === undefined || props.category === null ? category_not_found(ct.lang) : props.category[ct.lang];

    const increment_likes = () => 
    {
        const articles = [...props.articles];
        const index_current_article = articles.findIndex(e => e._id === props.article._id);

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

        if (id_user === props.article.author)
        {
            alert(like_own_article(ct.lang));
        }
        else
        {
            fetch(backend + '/blog/vote/article',
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_article: props.article._id,
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
        const index_current_article = articles.findIndex(e => e._id === props.article._id);

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

        if (id_user === props.article.author)
        {
            alert(dislike_own_article(ct.lang));
        }
        else
        {
            fetch(backend + '/blog/vote/article',
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_article: props.article._id,
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

    useLayoutEffect(() => 
    {
        // Display the author's username
        fetch(backend + `/user/username/${props.article.author}`)
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);

            if (json.is_success)
                set_username(json.data);
        })
        .catch(err => console.log(err));

        // Display the number of likes
        if (!props.is_preview)
            set_likes(props.article.users.likes.length - props.article.users.dislikes.length);

        // If logged in, interact as user
        if (props.admin_account_data)
        {
            set_id_user(props.admin_account_data._id);

            // Set the user's vote to know how to display the like/dislike buttons
            if (props.admin_account_data.articles.liked.includes(props.article._id))
                set_user_vote(1);
            else if (props.admin_account_data.articles.disliked.includes(props.article._id))
                set_user_vote(-1);
            else
                set_user_vote(0);
        }
        else if (props.user_account_data)
        {
            set_id_user(props.user_account_data._id);

            // Set the user's vote to know how to display the like/dislike buttons
            if (props.user_account_data.articles.liked.includes(props.article._id))
                set_user_vote(1);
            else if (props.user_account_data.articles.disliked.includes(props.article._id))
                set_user_vote(-1);
            else
                set_user_vote(0);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {props.is_preview ? 
            <div id="main" className="preview_article">
                <h3 className="title">{blog(ct.lang)}</h3>
                <div className="btn_other_articles"><span className="a button">{other_articles(ct.lang)}</span></div>

                <article>
                    <h4 className="sub_title">{display_title()}</h4>
                    <ul className="article_info">
                        <li>{info_category(ct.lang)}{display_category()}.</li>
                        <li>{info_author(ct.lang)}{username}.</li>
                        <li>
                            {info_created(ct.lang, 
                                date_in_letters(ct.lang, props.id_selected_article !== '' ? props.article.time_creation : current_time), 
                                time(props.id_selected_article !== '' ? props.article.time_creation : current_time, false))}
                        </li>
                        {props.article.is_modified && 
                            <li>
                                {info_modified(ct.lang, 
                                    date_in_letters(ct.lang, props.id_selected_article !== '' ? props.article.time_modification : current_time), 
                                    time(props.id_selected_article !== '' ? props.article.time_modification : current_time, false))}
                            </li>}
                    </ul>

                    <div>{Parser(props.article.content === undefined || props.article.content === '' ? content_not_found(ct.lang) : props.article.content)}</div>
                </article>

                <div className="btn_other_articles"><span className="a button">{other_articles(ct.lang)}</span></div>

                <div id="likes_dislikes">
                    <span id="txt_likes">{likes < 0 ? icon_heart_broken : icon_heart} {likes}</span>
                    <button className="a button" name="btn_like"><span className="icon">{icon_empty_like}</span> {like(ct.lang)}</button>
                    <button className="a button" name="btn_dislike"><span className="icon">{icon_empty_dislike}</span> {dislike(ct.lang)}</button>
                </div>
            </div>
            :
            <main>
                <h1 className="title">{blog(ct.lang)}</h1>
                <div className="btn_other_articles"><Link to="/blog" className="button">{other_articles(ct.lang)}</Link></div>

                <article>
                    <h2 className="sub_title">{display_title()}</h2>
                    <ul className="article_info">
                        <li>{info_category(ct.lang)}{display_category()}.</li>
                        <li>{info_author(ct.lang)}{username}.</li>
                        <li>{info_created(ct.lang, date_in_letters(ct.lang, props.article.time_creation), time(props.article.time_creation, false))}</li>
                        {props.article.is_modified && 
                            <li>{info_modified(ct.lang, date_in_letters(ct.lang, props.article.time_modification), time(props.article.time_modification, false))}</li>}
                    </ul>

                    <div>{Parser(props.article.content === undefined || props.article.content === '' ? content_not_found(ct.lang) : props.article.content)}</div>
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
            </main>}
        </>
    );
};

export default BlogArticle;

