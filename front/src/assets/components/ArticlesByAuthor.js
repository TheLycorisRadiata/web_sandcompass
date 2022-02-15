import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    title_articles, refresh_list, articles_by_author_instruction, 
    nbr_articles, empty 
} from '../functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

const icon_fetch = <FontAwesomeIcon icon={faRedoAlt} />;

const ArticlesByAuthor = (props) => 
{
    const ct = useContext(AppContext);

    const [articles, set_articles] = useState(null);

    const handle_click = e => 
    {
        e.preventDefault();

        fetch(`${package_info.api}/blog/${ct.lang}/articles/${props.author}`)
        .then(res => res.json())
        .then(json => 
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);

            if (json.is_success)
                set_articles(json.data);
        });
        //.catch(err => console.log(err));
    };

    return (
        <section id="articles_by_author">
            <h2 className="sub_title">{title_articles(ct.lang)}</h2>
            <button className="button" title={refresh_list(ct.lang)} onClick={handle_click}><span className="icon">{icon_fetch}</span></button>

            <ul>
                {!articles ? 
                    <li className="txt_centered" id="txt_click">{articles_by_author_instruction(ct.lang)}</li>
                :
                    <>
                        <li className="txt_centered" id="nbr_articles">{nbr_articles(ct.lang, articles.length)}</li>

                        {props.categories.map((category, index) => 
                        <span key={'category_' + index}>
                            <li className="txt_bold txt_centered">{category.name[ct.lang]}</li>
                            <ol>
                                {articles.find(e => e.categories.includes(category._id)) === undefined ? <p>{empty(ct.lang)}</p>
                                : 
                                articles.filter(e => e.categories.includes(category._id)).map((e, i) => <li key={'category_' + index + '_' + i}><Link to={'/blog/article' + e.code}>{e.title[ct.lang]}</Link></li>)}
                            </ol>
                        </span>)}
                    </>}
            </ul>
        </section>
    );
};

export default ArticlesByAuthor;

