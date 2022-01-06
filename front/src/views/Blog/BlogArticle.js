import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { DateInLetters, Time } from '../../assets/components/Time';

const icon_heart = <FontAwesomeIcon icon={faHeart} />
const icon_heart_broken = <FontAwesomeIcon icon={faHeartBroken} />
const icon_thumbs_up = <FontAwesomeIcon icon={faThumbsUp} />
const icon_thumbs_down = <FontAwesomeIcon icon={faThumbsDown} />

const BlogArticle = (props) => 
{
    const [likes, set_likes] = useState(props.article.likes);
    const current_time = Date.now();
    const increment_likes = () => set_likes(likes + 1);
    const decrement_likes = () => set_likes(likes - 1);

    return (
        <>
            {props.is_preview ? 
            <div id="main" className="preview_article">
                <h3 className="title">Blog</h3>
                <div><span className="a button">Other articles</span></div>

                <article id="blog_article">
                    <h4 className="sub_title">{props.article.title}</h4>
                    <p id="article_info" className="txt_bold">
                        Category: {props.article.category}.<br />
                        Created: On the <DateInLetters raw_time={props.id_selected_article !== '' ? props.article.time_creation : current_time} /> at <Time 
                        raw_time={props.id_selected_article !== '' ? props.article.time_creation : current_time} />.
                        {props.article.is_modified && 
                        <>
                            <br />
                            <span>Modified: On the <DateInLetters raw_time={props.id_selected_article !== '' ? props.article.time_modification : current_time} /> at <Time 
                            raw_time={props.id_selected_article !== '' ? props.article.time_modification : current_time} />.</span>
                        </>}
                    </p>

                    <div dangerouslySetInnerHTML={{__html: props.article.content}} />
                </article>

                <div><span className="a button">Other articles</span></div>

                <div id="likes_dislikes">
                    <span id="txt_likes">{likes < 0 ? icon_heart_broken : icon_heart} {likes}</span>
                    <button className="button" id="btn_like" name="btn_like" onClick={increment_likes}><span className="icon">{icon_thumbs_up}</span> Like</button>
                    <button className="button" id="btn_like" name="btn_dislike" onClick={decrement_likes}><span className="icon">{icon_thumbs_down}</span> Dislike</button>
                </div>
            </div>
            :
            <main>
                <h1 className="title">Blog</h1>
                <div><Link to="/blog/page.html" className="button">Other articles</Link></div>

                <article id="blog_article">
                    <h2 className="sub_title">{props.article.title}</h2>
                    <p id="article_info" className="txt_bold">
                        Category: {props.article.category}.<br />
                        Created: On the <DateInLetters raw_time={props.article.time_creation} /> at <Time raw_time={props.article.time_creation} seconds={false} />.
                        {props.article.is_modified && 
                        <>
                            <br />
                            <span>Modified: On the <DateInLetters raw_time={props.article.time_modification} /> at 
                            <Time raw_time={props.article.time_modification} />.</span>
                        </>}
                    </p>

                    <div dangerouslySetInnerHTML={{__html: props.article.content}} />
                </article>

                <div><Link to="/blog/page.html" className="button">Other articles</Link></div>

                <div id="likes_dislikes">
                    <span id="txt_likes">{likes < 0 ? icon_heart_broken : icon_heart} {likes}</span>
                    <button className="button" id="btn_like" name="btn_like" onClick={increment_likes}><span className="icon">{icon_thumbs_up}</span> Like</button>
                    <button className="button" id="btn_like" name="btn_dislike" onClick={decrement_likes}><span className="icon">{icon_thumbs_down}</span> Dislike</button>
                </div>
            </main>}
        </>
    );
};

export default BlogArticle;

