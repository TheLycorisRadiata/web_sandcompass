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
	const [nbr_articles, set_nbr_articles] = useState(0);
	const [nbr_categories, set_nbr_categories] = useState(0);
	const [article, set_article] = useState({ likes: 0, page_number: 0, date: 'MM/DD/YY', title: 'No title', content: 'No content.'});
	const [is_preview_shown, set_is_preview_shown] = useState(false);

	const [likes, set_likes] = useState(0);
	const [date, set_date] = useState('');
	const [title, set_title] = useState('');
	const [category, set_category] = useState('');
	const [content, set_content] = useState('');

	const handle_select_title = e => set_title(e.target.value);
	const handle_select_category = e => set_category(e.target.value);

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
		fetch('http://localhost:3001/blog/nbr/articles',
		{
			method: 'get',
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(json => set_nbr_articles(json.message));

		fetch('http://localhost:3001/blog/nbr/categories',
		{
			method: 'get',
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(json => set_nbr_categories(json.message));
	}, []);

	return (
		<main>
			<div id="btn_logout_admin"><span title="Log Out" onClick={handle_logout}>{icon_window_close}</span></div>
			<h1>Blog Editor</h1>

			<div id="control_panel_blog_buttons">
				<input type="button" name="btn_post_article" id="btn_post_article" value="Post a new article" />
				{nbr_articles !== 0 && 
				<div id="control_panel_extended_buttons">
					<select name="select_article" id="select_article" autoComplete="off" onChange={handle_select_title}>
						<option disabled selected>Select an article</option>
						<optgroup label="Category 1">
							<option value="category_1_article_1">Title article 1</option>
							<option value="category_1_article_3">Title article 3</option>
						</optgroup>
						<optgroup label="Category 2">
							<option value="category_2_article_2">Titre article 2</option>
							<option value="category_2_article_4">Titre article 4</option>
						</optgroup>
					</select>

					<div className="buttons">
						<input type="button" name="btn_modify_article" id="btn_modify_article" value="Modify an article" />
						<input type="button" name="btn_delete_article" id="btn_delete_article" value="Delete an article" />
					</div>
				</div>}
			</div>

			<div id="control_panel_blog_fields">
				<label htmlFor="field_article_title">Title:</label><br />
				<input type="text" name="field_article_title" id="field_article_title" /><br />

				<label htmlFor="select_category">Category:</label><br />
				<div id="div_category">
					<select name="select_category" id="select_category" autoComplete="off" onChange={handle_select_category}>
						{nbr_categories === 0 && <option disabled selected value="category_none">No category</option>}
						{nbr_categories > 0 && 
						<>
							<option value="category_1">Category 1</option>
							<option value="category_2">Category 2</option>
						</>}
					</select>
					<input type="text" name="field_article_new_category" id="field_article_new_category" placeholder="New category" />
					<button name="btn_add_category" id="btn_add_category">{icon_plus}</button>
				</div>

				<label htmlFor="field_article_content">Content:</label><br />
				<textarea name="field_article_content" id="field_article_content" rows="10"></textarea><br />
				<div id="div_btn_preview_article">
					<button name="btn_preview_article" id="btn_preview_article" onClick={handle_preview}>{is_preview_shown ? icon_eye_slash : icon_eye} Preview</button>
				</div>

				{is_preview_shown && 
					<BlogArticle is_preview={true} article={article} />
				}
			</div>
		</main>
	);
};

export default BlogEditor;

