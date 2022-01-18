import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import Flag_Eng from '../images/flags/usa.png';
import Flag_Fr from '../images/flags/france.png';
import Flag_Jp from '../images/flags/japan.png';
import { backend } from '../../../package.json';

const icon_fetch = <FontAwesomeIcon icon={faRedoAlt} />;

const ArticlesByAuthor = (props) => 
{
    const [articles, set_articles] = useState(null);

    const handle_click = e => 
    {
        e.preventDefault();

        fetch(backend + '/blog/articles/' + props.author)
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);

            if (json.is_success)
                set_articles(json.data);
        })
        .catch(err => console.log(err));
    };

    return (
        <section id="articles_by_author">
            <h2 className="sub_title">Articles</h2>
            <button className="button" title="Refresh list" onClick={handle_click}><span className="icon">{icon_fetch}</span></button>

            <ul>
                {!articles ? 
                    <li className="txt_centered" id="txt_click">Click for the list of articles you wrote</li>
                :
                    <>
                        <li className="txt_centered" id="nbr_articles">{articles.length} {articles.length < 2 ? 'article' : 'articles'}</li>

                        {props.categories.map(category => 
                        <span key={'span' + category._id}>
                            <li key={category.name[0]} className="txt_bold txt_centered">{category.name[0]}</li>
                            <ol key={category._id}>
                                {articles.find(e => e.category === category._id) === undefined ? <p key={category._id + '_empty'}>[Empty]</p>
                                : 
                                articles.filter(e => e.category === category._id).map(e => 
                                    <li key={e._id}>
                                        {e.language === 1 ? 
                                            <img src={Flag_Fr} alt="French" title="French" className="icon mini_flag" /> 
                                            : e.language === 2 ? 
                                            <img src={Flag_Jp} alt="Japanese" title="Japanese" className="icon mini_flag" /> 
                                            : 
                                            <img src={Flag_Eng} alt="English" title="English" className="icon mini_flag" /> 
                                        }
                                        <Link to={'/blog/article' + e._id}>{e.title}</Link>
                                    </li>)}
                            </ol>
                        </span>)}
                    </>}
            </ul>
        </section>
    );
};

export default ArticlesByAuthor;

