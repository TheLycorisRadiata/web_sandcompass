import { useState, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faThumbsUp as faThumbsUpSolid, faThumbsDown as faThumbsDownSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { DateInLetters, Time } from '../../assets/components/Time';
import { backend } from '../../../package.json';

const icon_heart = <FontAwesomeIcon icon={faHeart} />;
const icon_heart_broken = <FontAwesomeIcon icon={faHeartBroken} />;
const icon_empty_like = <FontAwesomeIcon icon={faThumbsUp} />;
const icon_empty_dislike = <FontAwesomeIcon icon={faThumbsDown} />;
const icon_filled_like = <FontAwesomeIcon icon={faThumbsUpSolid} />;
const icon_filled_dislike = <FontAwesomeIcon icon={faThumbsDownSolid} />;

const BlogArticle = (props) => 
{
    const [author, set_author] = useState('[Author not found]');
    const [likes, set_likes] = useState(props.article.likes);
    const [id_user, set_id_user] = useState(null);
    const [user_vote, set_user_vote] = useState(0);

    const history = useHistory();
    const current_time = Date.now();

    const increment_likes = () => 
    {
        const articles = [...props.articles];
        const index_current_article = articles.findIndex(e => e._id === props.article._id);

        // Should be impossible
        if (index_current_article === -1)
        {
            alert('Error: It seems like the article doesn\'t exist anymore.');
            history.push('/blog');
            return;
        }

        if (id_user === props.article.author)
        {
            alert('You would really upvote your own article?');
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

        // Should be impossible
        if (index_current_article === -1)
        {
            alert('Error: It seems like the article doesn\'t exist anymore.');
            history.push('/blog');
            return;
        }

        if (id_user === props.article.author)
        {
            alert('Don\'t be too hard on yourself.');
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
                set_author(json.data);
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
                <h3 className="title">Blog</h3>
                <div className="btn_other_articles"><span className="a button">Other articles</span></div>

                <article>
                    <h4 className="sub_title">{props.article.title}</h4>
                    <ul className="article_info">
                        <li>Category: {props.category[0]}.</li>
                        <li>Author: {author}.</li>
                        <li>Created: On the <DateInLetters raw_time={props.id_selected_article !== '' ? props.article.time_creation : current_time} /> at <Time 
                            raw_time={props.id_selected_article !== '' ? props.article.time_creation : current_time} />.</li>
                        {props.article.is_modified && 
                            <li>Modified: On the <DateInLetters raw_time={props.id_selected_article !== '' ? props.article.time_modification : current_time} /> at <Time 
                                raw_time={props.id_selected_article !== '' ? props.article.time_modification : current_time} />.</li>}
                    </ul>

                    <div dangerouslySetInnerHTML={{__html: props.article.content}} />
                </article>

                <div className="btn_other_articles"><span className="a button">Other articles</span></div>

                <div id="likes_dislikes">
                    <span id="txt_likes">{likes < 0 ? icon_heart_broken : icon_heart} {likes}</span>
                    <button className="button" name="btn_like"><span className="icon">{icon_empty_like}</span> Like</button>
                    <button className="button" name="btn_dislike"><span className="icon">{icon_empty_dislike}</span> Dislike</button>
                </div>
            </div>
            :
            <main>
                <h1 className="title">Blog</h1>
                <div className="btn_other_articles"><Link to="/blog/page" className="button">Other articles</Link></div>

                <article>
                    <h2 className="sub_title">{props.article.title}</h2>
                    <ul className="article_info">
                        <li>Category: {props.category[0]}.</li>
                        <li>Author: {author}.</li>
                        <li>Created: On the <DateInLetters raw_time={props.article.time_creation} /> at <Time raw_time={props.article.time_creation} seconds={false} />.</li>
                        {props.article.is_modified && 
                            <li>Modified: On the <DateInLetters raw_time={props.article.time_modification} /> at <Time 
                                raw_time={props.article.time_modification} />.</li>}
                    </ul>

                    <div dangerouslySetInnerHTML={{__html: props.article.content}} />
                </article>

                <div className="btn_other_articles"><Link to="/blog/page" className="button">Other articles</Link></div>

                <div id="likes_dislikes">
                    <span id="txt_likes">{likes < 0 ? icon_heart_broken : icon_heart} {likes}</span>
                    {!props.admin_account_data && !props.user_account_data ? 
                        <button className="button" name="btn_login" onClick={() => history.push('/user')}>Log in to like or dislike</button>
                    :
                        <>
                            <button className="button" name="btn_like" onClick={increment_likes}>
                                <span className="icon">{user_vote === 1 ? icon_filled_like : icon_empty_like}</span> Like</button>
                            <button className="button" name="btn_dislike" onClick={decrement_likes}>
                                <span className="icon">{user_vote === -1 ? icon_filled_dislike : icon_empty_dislike}</span> Dislike</button>
                        </>}
                </div>
            </main>}
        </>
    );
};

export default BlogArticle;

