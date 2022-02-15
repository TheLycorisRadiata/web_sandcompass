import { useContext } from 'react';
import { AppContext } from '../../App';
import {
    blog, other_articles, like, dislike, 
    info_categories, info_author, info_created, info_modified, 
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

    const display_title = () => props.article.title[props.preview_lang] === '' ? title_not_found(ct.lang) : props.article.title[props.preview_lang];
    const display_category = () => !props.category || props.category[ct.lang] === '' ? category_not_found(ct.lang) : props.category[ct.lang];
    const display_author = () => props.txt_author === '' ? user_not_found(ct.lang) : props.txt_author;
    const display_content = () => props.article.content[props.preview_lang] === '' ? content_not_found(ct.lang) : props.article.content[props.preview_lang];

    return (
        <div id="main" className="preview_article">
            <h3 className="title">{blog(ct.lang)}</h3>
            <div className="btn_other_articles"><span className="a button">{other_articles(ct.lang)}</span></div>

            <article>
                <h4 className="sub_title">{display_title()}</h4>
                <ul className="article_info">
                    <li>{info_categories(ct.lang)}{display_category()}.</li>
                    <li>{info_author(ct.lang)}{display_author()}.</li>
                    <li>
                        {info_created(ct.lang, 
                            date_in_letters(ct.lang, props.id_selected_article !== 'default' ? props.article.time_creation : current_time), 
                            time(props.id_selected_article !== 'default' ? props.article.time_creation : current_time, false))}
                    </li>
                    {props.article.is_modified && 
                        <li>
                            {info_modified(ct.lang, 
                                date_in_letters(ct.lang, props.id_selected_article !== 'default' ? props.article.time_modification : current_time), 
                                time(props.id_selected_article !== 'default' ? props.article.time_modification : current_time, false))}
                        </li>}
                </ul>

                <ReactMarkdown children={display_content(ct.lang)} remarkPlugins={[remarkGfm]} />
            </article>

            <div className="btn_other_articles"><span className="a button">{other_articles(ct.lang)}</span></div>

            <div id="likes_dislikes">
                <span id="txt_likes">{icon_heart} 0</span>
                <button className="a button" name="btn_like"><span className="icon">{icon_empty_like}</span> {like(ct.lang)}</button>
                <button className="a button" name="btn_dislike"><span className="icon">{icon_empty_dislike}</span> {dislike(ct.lang)}</button>
            </div>
        </div>
    );
};

export default BlogArticlePreview;

