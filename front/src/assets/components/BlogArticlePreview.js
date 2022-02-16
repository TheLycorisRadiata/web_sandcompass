import {
    blog, other_articles, like, dislike, 
    info_categories, info_author, info_created, info_modified, 
    dot, comma_and_space, 
    title_not_found, category_not_found, user_not_found, content_not_found 
} from '../functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { date_in_letters, time } from '../functions/time';

// Markdown display
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const icon_heart = <FontAwesomeIcon icon={faHeart} />;
const icon_empty_like = <FontAwesomeIcon icon={faThumbsUp} />;
const icon_empty_dislike = <FontAwesomeIcon icon={faThumbsDown} />;

const BlogArticlePreview = (props) => 
{
    const current_time = Date.now();

    const display_title = () => props.article.title[props.preview_lang] === '' ? title_not_found(props.preview_lang) : props.article.title[props.preview_lang];
    const display_author = () => (props.txt_author === '' ? user_not_found(props.preview_lang) : props.txt_author) + dot(props.preview_lang);
    const display_content = () => props.article.content[props.preview_lang] === '' ? content_not_found(props.preview_lang) : props.article.content[props.preview_lang];

    const display_categories = () => 
    {
        let string = category_not_found(props.preview_lang) + dot(props.preview_lang);
        let i;

        if (props.categories?.length)
        {
            string = '';

            for (i = 0; i < props.categories.length; ++i)
            {
                if (i === props.categories.length - 1)
                {
                    string += props.categories[i][props.preview_.lang] + dot(props.preview_lang);
                    break;
                }

                string += props.categories[i][props.preview_lang] + comma_and_space(props.preview_lang);
            }
        }

        return string;
    };

    return (
        <div id="main" className="preview_article">
            <h3 className="title">{blog(props.preview_lang)}</h3>
            <div className="btn_other_articles"><span className="a button">{other_articles(props.preview_lang)}</span></div>

            <article>
                <h4 className="sub_title">{display_title()}</h4>
                <ul className="article_info">
                    <li>{info_categories(props.preview_lang)}{display_categories()}</li>
                    <li>{info_author(props.preview_lang)}{display_author()}</li>
                    <li>
                        {info_created(props.preview_lang, 
                            date_in_letters(props.preview_lang, props.id_selected_article !== 'default' ? props.article.time_creation : current_time), 
                            time(props.id_selected_article !== 'default' ? props.article.time_creation : current_time, false))}
                    </li>
                    {props.article.is_modified && 
                        <li>
                            {info_modified(props.preview_lang, 
                                date_in_letters(props.preview_lang, props.id_selected_article !== 'default' ? props.article.time_modification : current_time), 
                                time(props.id_selected_article !== 'default' ? props.article.time_modification : current_time, false))}
                        </li>}
                </ul>

                <ReactMarkdown children={display_content(props.preview_lang)} remarkPlugins={[remarkGfm]} />
            </article>

            <div className="btn_other_articles"><span className="a button">{other_articles(props.preview_lang)}</span></div>

            <div id="likes_dislikes">
                <span id="txt_likes">{icon_heart} 0</span>
                <button className="a button" name="btn_like"><span className="icon">{icon_empty_like}</span> {like(props.preview_lang)}</button>
                <button className="a button" name="btn_dislike"><span className="icon">{icon_empty_dislike}</span> {dislike(props.preview_lang)}</button>
            </div>
        </div>
    );
};

export default BlogArticlePreview;

