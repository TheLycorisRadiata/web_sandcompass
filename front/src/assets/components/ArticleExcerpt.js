import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { read_more } from '../functions/lang';

// Markdown display
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticleExcerpt = (props) => 
{
    const ct = useContext(AppContext);

    return (
        <div className="article_excerpt">
            <p></p>
            <ReactMarkdown children={props.content.substring(0, 400)} remarkPlugins={[remarkGfm]} />
            {' '}<Link to={'/blog/article/' + props.code}>{read_more(ct.lang)}</Link>
        </div>
    );
};

export default ArticleExcerpt;

