import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { AppContext } from '../../App';
import { read_more } from '../functions/lang';

const ArticleExcerpt = (props) => 
{
    const ct = useContext(AppContext);

    return (
        <div className="article_excerpt">
            <p></p>
            {Parser(props.content.substring(0, 400) + ' ')}
            <Link to={'/blog/article/' + props.id}>{read_more(ct.lang)}</Link>
        </div>
    );
};

export default ArticleExcerpt;

