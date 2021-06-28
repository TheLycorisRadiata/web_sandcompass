import {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-regular-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import BlogArticle from './BlogArticle.js';
import '../styles/ControlPanel.css';

const icon_window_close = <FontAwesomeIcon icon={faWindowClose} />
const icon_plus = <FontAwesomeIcon icon={faPlus} />
const icon_eye = <FontAwesomeIcon icon={faEye} />
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />

const BlogEditor = (props) => 
{
	const [all_articles, set_all_articles] = useState([]);
	const [all_categories, set_all_categories] = useState([]);
	const [new_category, set_new_category] = useState('');
	const [is_preview_shown, set_is_preview_shown] = useState(false);

	const default_category = 'No category';
	const default_title = 'No title';
	const default_content = 'No content.';

	const [likes, set_likes] = useState(0);
	const [page_number, set_page_number] = useState(0);
	const [time, set_time] = useState(new Date());
	const [category, set_category] = useState(default_category);
	const [title, set_title] = useState(default_title);
	const [content, set_content] = useState(default_content);

	const [article, set_article] = useState({ likes: likes, page_number: page_number, time: time, category: category, title: title, content: content });

	const handle_select_title = e => set_title(e.target.value);
	const handle_select_category = e => set_category(e.target.value);

	const handle_create_category = e => 
	{
		if (new_category !== '')
		{
			fetch('http://localhost:3001/blog/categories',
			{
				method: 'post',
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ new_category: new_category })
			})
			.then(res => res.json())
			.then(json => json.status >= 400 ? console.warn('Error: The category can\'t be created.') : set_all_categories(json.message));
		}
	};

	const handle_create_article = () => 
	{
		if (article.category !== default_category && article.title !== default_title && article.content !== default_content 
			&& article.category !== '' && article.title !== '' && article.content !== '')
		{
			fetch('http://localhost:3001/blog/articles',
			{
				method: 'post',
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ new_article: article })
			})
			.then(res => res.json())
			.then(json => json.status >= 400 ? console.warn('Error: The article can\'t be posted.') : set_all_articles(json.message));

			set_category(default_category);
			set_title(default_title);
			set_content(default_content);
		}
	};

	const handle_logout = () => 
	{
		fetch('http://localhost:3001/connection/logout/admin',
		{
			method: 'get',
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(() => 
		{
			props.close_access(false);
		});
	};

	const handle_preview = () => 
	{
		is_preview_shown ? set_is_preview_shown(false) : set_is_preview_shown(true);
	};

	useEffect(() => 
	{
		fetch('http://localhost:3001/blog/articles',
		{
			method: 'get',
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(json => json.status >= 400 ? console.warn('Error: The article can\'t be posted.') : set_all_articles(json.message));

		fetch('http://localhost:3001/blog/categories',
		{
			method: 'get',
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(json => json.status >= 400 ? console.warn('Error: The category can\'t be created.') : set_all_categories(json.message));
	}, []);

	useEffect(() => 
	{
		set_time(new Date());
		set_article({ likes: likes, page_number: page_number, time: time, category: category, title: title, content: content });
	}, [all_articles, all_categories, category, title, content]);
	/* Don't add "time" here, it will cause an endless amount of errors, and we really don't need to check for its change, nor do we need to for "likes" and "page_number". */

	return (
		<main>
			{!props.is_access_granted && 
			<>
				<h1>Access Forbidden</h1>
				<p id="error_message">You must log in as "admin" to access this page.</p>
			</>}

			{props.is_access_granted && 
			<>
				<div id="btn_logout_admin"><span title="Log Out" onClick={handle_logout}>{icon_window_close}</span></div>
				<h1>Blog Editor</h1>

				<div id="control_panel_blog_buttons">
					<input type="button" name="btn_post_article" id="btn_post_article" value="Post a new article" onClick={handle_create_article} />
					{all_articles.length !== 0 && 
					<div id="control_panel_extended_buttons">
						<select name="select_article" id="select_article" autoComplete="off" onChange={handle_select_title}>
							<option disabled selected>Select an article</option>
								{all_categories.map(category => 
										<optgroup label={category.name}>
											{all_articles.filter(article => article.category === category.name)
											.length === 0 ? <option disabled>No article</option> : 

											all_articles.filter(article => article.category === category.name)
											.map(article => <option>{article.title}</option>)}
										</optgroup>
									)
								}
						</select>

						<div className="buttons">
							<input type="button" name="btn_modify_article" id="btn_modify_article" value="Modify an article" />
							<input type="button" name="btn_delete_article" id="btn_delete_article" value="Delete an article" />
						</div>
					</div>}
				</div>

				<div id="control_panel_blog_fields">
					<label htmlFor="field_article_title">Title:</label><br />
					<input type="text" name="field_article_title" id="field_article_title" onChange={e => set_title(e.target.value)} /><br />

					<label htmlFor="select_category">Category:</label><br />
					<div id="div_category">
						<select name="select_category" id="select_category" autoComplete="off" onChange={handle_select_category}>
							{all_categories.length === 0 && <option disabled selected>No category</option>}
							{all_categories.length > 0 && all_categories.map(category => <option>{category.name}</option>)}
						</select>
						<input type="text" name="field_article_new_category" id="field_article_new_category" placeholder="New category" 
							onChange={e => set_new_category(e.target.value)} />
						<button name="btn_add_category" id="btn_add_category" onClick={handle_create_category}>{icon_plus}</button>
					</div>

					<label htmlFor="field_article_content">Content:</label><br />
					<textarea name="field_article_content" id="field_article_content" rows="10" onChange={e => set_content(e.target.value)}></textarea><br />
					<div id="div_btn_preview_article">
						<button name="btn_preview_article" id="btn_preview_article" onClick={handle_preview}>{is_preview_shown ? icon_eye_slash : icon_eye} Preview</button>
					</div>

					{is_preview_shown && 
						<BlogArticle is_preview={true} article={article} />
					}
				</div>
			</>}
		</main>
	);
};

export default BlogEditor;

