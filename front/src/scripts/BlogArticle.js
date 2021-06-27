import {useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeartBroken} from '@fortawesome/free-solid-svg-icons';
import {faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import {faThumbsDown} from '@fortawesome/free-regular-svg-icons';

const icon_heart = <FontAwesomeIcon icon={faHeart} />
const icon_heart_broken = <FontAwesomeIcon icon={faHeartBroken} />
const icon_thumbs_up = <FontAwesomeIcon icon={faThumbsUp} />
const icon_thumbs_down = <FontAwesomeIcon icon={faThumbsDown} />

const BlogArticle = (props) => 
{
	const [likes, set_likes] = useState(props.article.likes);
	const increment_likes = () => set_likes(likes + 1);
	const decrement_likes = () => set_likes(likes - 1);

	return (
		<>
			{props.is_preview && 
			<div id="main">
				<h1>Blog</h1>
				<div className="page_numbers page_numbers_top"><span className="a">Other articles</span></div>

				<article id="blog_article">
					<h2>{props.article.title}</h2>
					<p id="article_info">
						Category: {props.article.category}.<br />
						Created: {props.article.date}.
					</p>

					<div>{props.article.content}</div>
				</article>

				<div className="page_numbers page_numbers_bottom"><span className="a">Other articles</span></div>

				<div id="likes_dislikes">
					<span id="txt_likes">{likes < 0 ? icon_heart_broken : icon_heart} {likes}</span>
					<button id="btn_like" name="btn_like" onClick={increment_likes}>{icon_thumbs_up} Like</button>
					<button id="btn_like" name="btn_dislike" onClick={decrement_likes}>{icon_thumbs_down} Dislike</button>
				</div>
			</div>}

			{!props.is_preview && 
			<main>
				<h1>Blog</h1>
				<div className="page_numbers page_numbers_top"><Link to={`/blog/page${props.article.page_number}.html`}>Other articles</Link></div>

				<article id="blog_article">
					<h2>{props.article.title}</h2>
					<p id="article_info">
						Category: {props.article.category}.<br />
						Created: {props.article.date}.
					</p>

					<div>{props.article.content}</div>
				</article>

				<div className="page_numbers page_numbers_bottom"><Link to={`/blog/page${props.article.page_number}.html`}>Other articles</Link></div>

				<div id="likes_dislikes">
					<span id="txt_likes">{likes < 0 ? icon_heart_broken : icon_heart} {likes}</span>
					<button id="btn_like" name="btn_like" onClick={increment_likes}>{icon_thumbs_up} Like</button>
					<button id="btn_like" name="btn_dislike" onClick={decrement_likes}>{icon_thumbs_down} Dislike</button>
				</div>
			</main>}
		</>
	);
};

export default BlogArticle;

