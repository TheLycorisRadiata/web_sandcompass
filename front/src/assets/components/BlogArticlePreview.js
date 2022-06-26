import { useContext } from 'react';
import { AppContext } from '../../App';
import {
    select_language, english, french, japanese, 
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
    const ct = useContext(AppContext);

    const current_time = Date.now();
    const is_article_new = props.article._id === 'default';

    const display_title = () => props.article.title[props.lang] === '' ? title_not_found(props.lang) : props.article.title[props.lang];
    const display_author = () => (props.txt_author === '' ? user_not_found(props.lang) : props.txt_author) + dot(props.lang);
    const display_content = () => props.article.content[props.lang] === '' ? content_not_found(props.lang) : props.article.content[props.lang];

    const display_categories = () => 
    {
        let string = category_not_found(props.lang) + dot(props.lang);
        let i;

        if (props.selected_categories?.length)
        {
            string = '';

            for (i = 0; i < props.selected_categories.length; ++i)
            {
                if (i === props.selected_categories.length - 1)
                {
                    string += props.selected_categories[i].name[props.lang] + dot(props.lang);
                    break;
                }

                string += props.selected_categories[i].name[props.lang] + comma_and_space(props.lang);
            }
        }

        return string;
    };

    return (
        <div>
            <div id="preview_article_lang">
                <select name="select_language" value={props.lang} onChange={e => props.set_lang(parseInt(e.target.value, 10))}>
                    <option disabled value="default">{select_language(ct.lang)}</option>
                    <option value="0">{english(ct.lang)}</option>
                    <option value="1">{french(ct.lang)}</option>
                    <option value="2">{japanese(ct.lang)}</option>
                </select>
            </div>

            <div id="main" className="preview_article">
                <h3 className="title">{blog(props.lang)}</h3>
                <div className="btn_other_articles"><span className="a button">{other_articles(props.lang)}</span></div>

                <article>
                    <h4 className="sub_title">{display_title()}</h4>
                    <ul className="article_info">
                        <li>{info_categories(props.lang)}{display_categories()}</li>
                        <li>{info_author(props.lang)}{display_author()}</li>
                        <li>
                            {info_created(props.lang, 
                                date_in_letters(props.lang, is_article_new ? current_time : props.article.time_creation), 
                                time(is_article_new ? current_time : props.article.time_creation, false))}
                        </li>
                        {props.article.is_modified && 
                        <li>
                            {info_modified(props.lang, 
                                date_in_letters(props.lang, is_article_new ? current_time : props.article.time_modification), 
                                time(is_article_new ? current_time : props.article.time_modification, false))}
                        </li>}
                    </ul>

                    <ReactMarkdown children={display_content(props.lang)} remarkPlugins={[remarkGfm]} />
                </article>

                <div className="btn_other_articles"><span className="a button">{other_articles(props.lang)}</span></div>

                <div id="likes_dislikes">
                    <span id="txt_likes">{icon_heart} 0</span>
                    <button className="a button" name="btn_like"><span className="icon">{icon_empty_like}</span> {like(props.lang)}</button>
                    <button className="a button" name="btn_dislike"><span className="icon">{icon_empty_dislike}</span> {dislike(props.lang)}</button>
                </div>
            </div>
        </div>
    );
};

export default BlogArticlePreview;

