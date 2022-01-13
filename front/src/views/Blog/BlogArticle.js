import { useState, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { DateInLetters, Time } from '../../assets/components/Time';
import { backend } from '../../../package.json';

const icon_heart = <FontAwesomeIcon icon={faHeart} />
const icon_heart_broken = <FontAwesomeIcon icon={faHeartBroken} />
const icon_thumbs_up = <FontAwesomeIcon icon={faThumbsUp} />
const icon_thumbs_down = <FontAwesomeIcon icon={faThumbsDown} />

const BlogArticle = (props) => 
{
    const [author, set_author] = useState('[Author not found]');
    const [likes, set_likes] = useState(props.article.likes);
    const [id_user, set_id_user] = useState(null);
    const [arr_user_articles, set_arr_user_articles] = useState({});

    const history = useHistory();
    const current_time = Date.now();

    const increment_likes = () => 
    {
        const nbr_likes = likes + 1;

        if (id_user === props.article.author)
        {
            alert('You would really upvote your own article?');
        }
        else
        {
            set_likes(nbr_likes);
        }
    };

    const decrement_likes = () => 
    {
        const nbr_likes = likes - 1;

        if (id_user === props.article.author)
        {
            alert('Don\'t be too hard on yourself.');
        }
        else
        {
            set_likes(nbr_likes)
        }
    };

    useLayoutEffect(() => 
    {
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

        if (props.admin_account_data)
        {
            set_id_user(props.admin_account_data._id);
            set_arr_user_articles(props.admin_account_data.articles);
        }
        else if (props.user_account_data)
        {
            set_id_user(props.user_account_data._id);
            set_arr_user_articles(props.user_account_data.articles);
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
                        <li>Category: {props.article.category}.</li>
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
                    <button className="button" name="btn_like"><span className="icon">{icon_thumbs_up}</span> Like</button>
                    <button className="button" name="btn_dislike"><span className="icon">{icon_thumbs_down}</span> Dislike</button>
                </div>
            </div>
            :
            <main>
                <h1 className="title">Blog</h1>
                <div className="btn_other_articles"><Link to="/blog/page" className="button">Other articles</Link></div>

                <article>
                    <h2 className="sub_title">{props.article.title}</h2>
                    <ul className="article_info">
                        <li>Category: {props.article.category}.</li>
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
                            <button className="button" name="btn_like" onClick={increment_likes}><span className="icon">{icon_thumbs_up}</span> Like</button>
                            <button className="button" name="btn_dislike" onClick={decrement_likes}><span className="icon">{icon_thumbs_down}</span> Dislike</button>
                        </>}
                </div>
            </main>}
        </>
    );
};

export default BlogArticle;

